import { printDirectory } from './printDirectory.js';

export const setBasicParameters = async (name) => {
  process.env.RSS_USER_NAME = name;
  process.env.RSS_CURRENT_DIRECTORY =
    process.env.HOME || process.env.USERPROFILE;
  process.chdir(process.env.RSS_CURRENT_DIRECTORY);
  console.log(
    `\x1b[1;31mWelcome to the File Manager, ${process.env.RSS_USER_NAME}!\n \x1b[0m`
  );
  printDirectory();
};
