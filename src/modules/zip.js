import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { access, createReadStream, createWriteStream, open } from 'fs';
import { printDirectory } from './printDirectory.js';
import { pipeline } from 'stream';

export const compress = async (parameters) => {
  const paths = parameters.split(' ');
  if (paths.length < 2) {
    console.log(
      'Invalid input. Enter valid path to file and archive destination'
    );
  } else {
    const oldFilePath = paths[0];
    let newFileName = paths[1];
    const brotli = createBrotliCompress();
    const readStream = createReadStream(oldFilePath, 'utf-8');
    const writeStream = createWriteStream(newFileName);
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
  const paths = parameters.split(' ');
  if (paths.length < 2) {
    console.log(
      'Invalid input. Enter valid path to file and archive destination'
    );
  } else {
    const oldFilePath = paths[0];
    let newFileName = paths[1];
    access(oldFilePath, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldFilePath} doesn't exist`);
      } else {
        open(newFileName, (err) => {
          if (err === null) {
            console.log('Operation failed. File already exists');
          } else {
            const unBrotli = createBrotliDecompress();
            const readStream = createReadStream(oldFilePath);
            const writeStream = createWriteStream(newFileName);
            readStream.pipe(unBrotli).pipe(writeStream);
            printDirectory();
          }
        });
      }
    });
  }
};
