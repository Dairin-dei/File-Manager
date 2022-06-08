import { printDirectory } from './printDirectory.js';

export const setBasicParameters = async (name) => {
  process.env.RSS_USER_NAME = name;
  process.env.RSS_CURRENT_DIRECTORY = process.env.HOME;
  process.chdir(process.env.RSS_CURRENT_DIRECTORY);
  console.log(`Welcome to the File Manager, ${process.env.RSS_USER_NAME}!`);
  printDirectory();
};
