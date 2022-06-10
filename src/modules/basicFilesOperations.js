import {
  access,
  stat,
  createReadStream,
  open,
  writeFile,
  close,
  rename,
  copyFile,
  rm as remove,
} from 'fs';
import { dirname, extname, isAbsolute, join, basename } from 'path';
import { printDirectory } from './printDirectory.js';

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
      writeFile(parameters, '', (err) => {
        if (err) {
          console.log(`Operation failed. ${err.message}`);
        } else {
          close(file, (err) => {
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
};

export const rn = async (parameters) => {
  const paths = parameters.split(' ');
  if (paths.length < 2) {
    console.log('Invalid input. Enter valid old a new file names');
  } else {
    const oldFilePath = paths[0];
    let newFileName = paths[1];
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
  const paths = parameters.split(' ');
  if (paths.length < 2) {
    console.log('Invalid input. Enter valid old a new file names');
  } else {
    const oldFileName = paths[0];
    const destinationPath = paths[1];
    access(oldFileName, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldFileName} doesn't exist`);
      } else if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        access(destinationPath, (err) => {
          if (err && err.code === 'ENOENT') {
            console.log(
              `Operation failed. Directory ${newFilePath} doesn't exist`
            );
          } else {
            const newFilePath = join(destinationPath, basename(oldFileName));
            copyFile(oldFileName, newFilePath, (err) => {
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
  const paths = parameters.split(' ');
  if (paths.length < 2) {
    console.log('Invalid input. Enter valid old and new file names');
  } else {
    const oldFileName = paths[0];
    const destinationPath = paths[1];
    access(oldFileName, (err) => {
      if (err && err.code === 'ENOENT') {
        console.log(`Operation failed. File ${oldFileName} doesn't exist`);
      } else if (err) {
        console.log(`Operation failed. ${err.message}`);
      } else {
        access(destinationPath, (err) => {
          if (err && err.code === 'ENOENT') {
            console.log(
              `Operation failed. Directory ${newFilePath} doesn't exist`
            );
          } else {
            const newFilePath = join(destinationPath, basename(oldFileName));
            copyFile(oldFileName, newFilePath, (err) => {
              if (err) {
                console.log(`Operation failed. ${err.message}`);
              } else {
                access(oldFileName, (err) => {
                  if (err && err.code === 'ENOENT') {
                    console.log(
                      `Operation failed. File ${oldFileName} doesn't exist`
                    );
                  } else if (err) {
                    console.log(`Operation failed. ${err.message}`);
                  } else {
                    remove(oldFileName, (err) => {
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
    });
  }
};
