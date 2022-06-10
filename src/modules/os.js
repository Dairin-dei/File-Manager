import * as osFunctions from 'os';
import { printDirectory } from './printDirectory.js';

export const getOSData = async (parameters) => {
  if (parameters.toLowerCase() === '--eol') {
    console.log(`End-of-line marker is ${osFunctions.EOL}`);
    printDirectory();
  } else if (parameters.toLowerCase() === '--cpus') {
    console.log('CPUs info:');
    console.log(osFunctions.cpus());
    printDirectory();
  } else if (parameters.toLowerCase() === '--homedir') {
    console.log(`User homedir is ${osFunctions.homedir()}`);
    printDirectory();
  } else if (parameters.toLowerCase() === '--username') {
    try {
      console.log(`Username is ${osFunctions.userInfo().username}`);
      printDirectory();
    } catch (err) {
      console.log(`Operation failed. ${err.message}`);
    }
  } else if (parameters.toLowerCase() === '--architecture') {
    console.log(`Operating system CPU architecture is ${osFunctions.arch()}`);
    printDirectory();
  } else {
    console.log('Invalid input. Enter a valid command and parameters');
  }
};
