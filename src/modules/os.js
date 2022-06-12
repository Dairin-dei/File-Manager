import * as osFunctions from 'os';
import { printDirectory } from './printDirectory.js';

export const getOSData = async (parameters) => {
  if (parameters.toLowerCase() === '--eol') {
    console.log(`End-of-line marker is ${JSON.stringify(osFunctions.EOL)}`);
    printDirectory();
  } else if (parameters.toLowerCase() === '--cpus') {
    const cpus = osFunctions.cpus();
    console.log('CPUs info:');
    console.log(`Overall amount of CPUS id: ${cpus.length}`);
    console.log('[');
    cpus.forEach((cpu, index) => {
      console.log(' {');
      console.log(`    model: ${cpu.model.trim()}`);
      console.log(`    speed: ${cpu.speed / 1000} GHz`);
      console.log('  }');
    });
    console.log(']');

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
