import { access, readFile } from 'fs';
import { createHash } from 'crypto';
import { printDirectory } from './printDirectory.js';

export const getHash = async (parameters) => {
  if (parameters.trim() === '') {
    console.log('Invalid input. Please, enter a valid path!');
  } else {
    access(parameters, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${parameters} doesn't exist`);
      } else if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        readFile(parameters, { encoding: 'utf-8' }, function (err, data) {
          if (err) {
            console.log(`Operation failed. ${err.message}`);
          } else {
            console.log(createHash('sha256').update(data).digest('hex'));
            printDirectory();
          }
        });
      }
    });
  }
};
