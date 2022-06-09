import { readdir } from 'fs';
import { printDirectory } from './printDirectory.js';
export const up = async () => {
  process.chdir('..');
  process.env.RSS_CURRENT_DIRECTORY = process.cwd();
  printDirectory();
};

export const cd = async (path) => {
  try {
    console.log('cd', path);
    process.chdir(path.trim());
    process.env.RSS_CURRENT_DIRECTORY = process.cwd();
    printDirectory();
  } catch {
    console.log('Invalid input. Please, enter a valid path!');
  }
};

export const ls = async () => {
  readdir(
    process.env.RSS_CURRENT_DIRECTORY,
    { withFileTypes: true },
    (err, files) => {
      if (err) {
        console.log(`Operation failed. ${err.message}`);
      }
      files.forEach((file) => {
        console.log(file.name);
      });
      printDirectory();
    }
  );
};
