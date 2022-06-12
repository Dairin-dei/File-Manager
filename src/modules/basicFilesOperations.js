import {
  access,
  stat,
  createReadStream,
  open,
  rename,
  rm as remove,
  createWriteStream,
} from 'fs';
import { dirname, extname, isAbsolute, join, basename } from 'path';
import { printDirectory } from './printDirectory.js';
import { findPaths } from './tools.js';

export const cat = async (path) => {
  if (path === '') {
    console.log('Invalid input. Please, enter a valid path!');
  } else {
    access(path, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${path} doesn't exist`);
      } else {
        stat(path, (err, stats) => {
          if (stats.isDirectory()) {
            console.log('Operation failed. To open a directory use cd');
          } else {
            let ext = extname(path);
            let readOn;
            if (ext === '.txt') {
              readOn = createReadStream(path, 'utf-8');
            } else {
              readOn = createReadStream(path);
            }

            readOn.on('data', (data) => {
              console.log(data);
              printDirectory();
            });
          }
        });
      }
    });
  }
};

export const add = async (parameters) => {
  open(parameters, 'wx', (err, file) => {
    if (err && err.code === 'EEXIST') {
      console.log('Operation failed. This file exists already');
    } else if (err) {
      console.log(`Operation failed. ${err.message}`);
    } else {
      createWriteStream(parameters);
      printDirectory();
    }
  });
};

export const rn = async (parameters) => {
  const { oldPath, newPath } = findPaths(parameters);
  if (oldPath !== '' && newPath !== '') {
    const oldFilePath = oldPath;
    let newFileName = newPath;
    access(oldFilePath, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldFilePath} doesn't exist`);
      } else {
        if (!isAbsolute(newFileName)) {
          newFileName = join(dirname(oldFilePath), newFileName);
        }
        access(newFileName, (err) => {
          if (!err) {
            console.log(`Operation failed. File ${newFileName} already exists`);
          } else {
            rename(oldFilePath, newFileName, (err) => {
              if (err) {
                console.log(`Operation failed. ${err.message}`);
              } else {
                printDirectory();
              }
            });
          }
        });
      }
    });
  }
};

export const cp = async (parameters) => {
  const { oldPath, newPath } = findPaths(parameters);
  if (oldPath !== '' && newPath !== '') {
    access(oldPath, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldPath} doesn't exist`);
      } else if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        access(newPath, (err) => {
          if (err && err.code === 'ENOENT') {
            console.log(`Operation failed. Directory ${newPath} doesn't exist`);
          } else {
            const newFilePath = join(newPath, basename(oldPath));
            access(newFilePath, (err) => {
              if (err === null) {
                console.log(
                  `Operation failed. File ${newFilePath} already exists`
                );
              } else {
                const fileWriteTo = createWriteStream(newFilePath, {
                  flags: 'w',
                });
                createReadStream(oldPath).pipe(fileWriteTo);
                printDirectory();
              }
            });
          }
        });
      }
    });
  }
};

export const rm = async (parameters) => {
  access(parameters, (err) => {
    if (err && err.code === 'ENOENT') {
      console.log(`Operation failed. File ${parameters} doesn't exist`);
    } else if (err) {
      console.log(`Operation failed. ${err.message}`);
    } else {
      remove(parameters, (err) => {
        if (err) {
          console.log(`Operation failed. ${err.message}`);
        } else {
          printDirectory();
        }
      });
    }
  });
};

export const mv = async (parameters) => {
  const { oldPath, newPath } = findPaths(parameters);
  if (oldPath !== '' && newPath !== '') {
    access(oldPath, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldPath} doesn't exist`);
      } else if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        access(newPath, (err) => {
          if (err && err.code === 'ENOENT') {
            console.log(
              `Operation failed. Directory ${newFilePath} doesn't exist`
            );
          } else {
            const newFilePath = join(newPath, basename(oldPath));
            access(newFilePath, (err) => {
              if (err === null) {
                console.log(
                  `Operation failed. File ${newFilePath} already exists`
                );
              } else {
                const fileWriteTo = createWriteStream(newFilePath, {
                  flags: 'w',
                });
                createReadStream(oldPath).pipe(fileWriteTo);
                remove(oldPath, (err) => {
                  if (err) {
                    console.log(`Operation failed. ${err.message}`);
                  } else {
                    printDirectory();
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};
