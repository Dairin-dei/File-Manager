import { createReadStream, access, stat } from 'fs';
import { createInterface } from 'readline';
import { extname } from 'path';
import { printDirectory } from './modules/printDirectory.js';
import { cd, up, ls } from './modules/navigation.js';
import { setBasicParameters } from './modules/parameters.js';

async function app() {
  // try {
  const name = process.argv[2].split('=')[1];
  if (name.trim() === '') {
    process.stdout.write('Please, enter valid user name');
    return;
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  setBasicParameters(name);

  rl.on('line', (data) => {
    if (data === '.exit') {
      console.log('close');
      rl.close();
    } else {
      const argv = data.split(' ');
      const command = argv[0].trim();
      const parameters = argv.length > 1 ? argv.slice(1).join(' ') : '';
      console.log('current command is ', command);
      switch (command) {
        case 'up':
          up();
          break;
        case 'cd':
          cd(parameters);
          break;
        case 'ls':
          ls();
          break;
        case 'cat':
          cat(parameters);
          break;
        case 'add':
          break;
        case 'rn':
          break;
        case 'cp':
          break;
        case 'mv':
          break;
        case 'rm':
          break;
        case 'os':
          break;
        case 'hash':
          break;
        case 'compress':
          break;
        case 'decompress':
          break;
        case '':
          console.log(`Operation failed. Please, enter a command!`);
          break;
        default:
          console.log(
            `Operation failed. Oops, I don't know command "${command}"`
          );
          break;
      }
    }
  });

  rl.on('close', () => {
    console.log(
      `Thank you for using File Manager, ${process.env.RSS_USER_NAME}`
    );
  });
  /*  } catch {
    process.stdout.write('Please, enter valid user name');
  }*/
}

app();
