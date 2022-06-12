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

export const findPaths = (parameters) => {
  parameters = parameters.trim();
  if (parameters === '') {
    console.log('Invalid input. Enter valid old and new paths');
    return { oldPath: '', newPath: '' };
  }
  const findQuotIndex = parameters.indexOf('"');
  let oldPath = '';
  let newPath = '';
  if (findQuotIndex >= 0) {
    const checkingStr = parameters.replace(/\"/gi, '');
    if ((parameters.length - checkingStr.length) % 2 != 0) {
      console.log(
        'Invalid input. Use " to begin and finish paths with whitespaces'
      );
      return { oldPath: '', newPath: '' };
    }
    const findQuotIndex2 = parameters.indexOf('"', findQuotIndex + 1);
    if (parameters.length > findQuotIndex2 + 1) {
      oldPath = parameters
        .slice(findQuotIndex + 1, findQuotIndex2)
        .replace(/\"/gi, '')
        .trim();
      newPath = parameters.slice(findQuotIndex2).replace(/\"/gi, '').trim();
    } else {
      oldPath =
        findQuotIndex === 0
          ? ''
          : parameters
              .slice(0, findQuotIndex - 1)
              .replace(/\"/gi, '')
              .trim();
      newPath = parameters
        .slice(findQuotIndex + 1)
        .replace(/\"/gi, '')
        .trim();
    }
  } else {
    if (parameters.split(' ').length < 2) {
      console.log('Invalid input. Enter valid old and new paths');
      return { oldPath: '', newPath: '' };
    } else if (parameters.split(' ').length > 2) {
      console.log(
        'Invalid input. Use " to begin and finish path with whitespaces'
      );
      return { oldPath: '', newPath: '' };
    }
    oldPath = parameters.split(' ')[0];
    newPath = parameters.split(' ')[1];
  }
  if (
    oldPath === '' ||
    newPath === '' ||
    oldPath === undefined ||
    newPath === undefined
  ) {
    console.log('Invalid input. Enter valid old and new paths');
    return { oldPath: '', newPath: '' };
  }
  return { oldPath, newPath };
};
