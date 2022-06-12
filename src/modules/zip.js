import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { access, createReadStream, createWriteStream, open } from 'fs';
import { pipeline } from 'stream';
import { printDirectory } from './printDirectory.js';
import { findPaths } from './tools.js';

export const compress = async (parameters) => {
  const { oldPath, newPath } = findPaths(parameters);
  if (oldPath !== '' && newPath !== '') {
    const brotli = createBrotliCompress();
    const readStream = createReadStream(oldPath, 'utf-8');
    const writeStream = createWriteStream(newPath);
    pipeline(readStream, brotli, writeStream, (err) => {
      if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        console.log(`Your compressed file is in ${process.cwd()}`);
        printDirectory();
      }
    });
  }
};

export const decompress = async (parameters) => {
  const { oldPath, newPath } = findPaths(parameters);
  if (oldPath !== '' && newPath !== '') {
    access(oldPath, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldPath} doesn't exist`);
      } else {
        open(newPath, (err) => {
          if (err === null) {
            console.log('Operation failed. File already exists');
          } else {
            const unBrotli = createBrotliDecompress();
            const readStream = createReadStream(oldPath);
            const writeStream = createWriteStream(newPath);
            readStream.pipe(unBrotli).pipe(writeStream);
            printDirectory();
          }
        });
      }
    });
  }
};
