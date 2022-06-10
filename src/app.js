import { createInterface } from 'readline';
import { cd, up, ls } from './modules/navigation.js';
import { getOSData } from './modules/os.js';
import { setBasicParameters } from './modules/parameters.js';
import { add, cat, rn, cp, rm, mv } from './modules/basicFilesOperations.js';
import { getHash } from './modules/hash.js';
import { compress, decompress } from './modules/zip.js';

async function app() {
  try {
    const variable = process.argv[2].split('=')[0];
    if (variable !== '--username') {
      console.log(
        '\x1b[1;31mPlease enter parameters using format "--username=Masha"\n \x1b[0m'
      );
    } else {
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
          rl.close();
        } else {
          const argv = data.split(' ');
          const command = argv[0].trim();
          const parameters = argv.length > 1 ? argv.slice(1).join(' ') : '';
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
              add(parameters);
              break;
            case 'rn':
              rn(parameters);
              break;
            case 'cp':
              cp(parameters);
              break;
            case 'mv':
              mv(parameters);
              break;
            case 'rm':
              rm(parameters);
              break;
            case 'os':
              getOSData(parameters);
              break;
            case 'hash':
              getHash(parameters);
              break;
            case 'compress':
              compress(parameters);
              break;
            case 'decompress':
              decompress(parameters);
              break;
            case '':
              console.log(`Invalid input. Please, enter a command!`);
              break;
            default:
              console.log(
                `Invalid input. Oops, I don't know command "${command}"`
              );
              break;
          }
        }
      });

      rl.on('close', () => {
        console.log(
          `\x1b[1;31m\nThank you for using File Manager, ${process.env.RSS_USER_NAME}!\n \x1b[0m`
        );
      });
    }
  } catch {
    process.stdout.write('Please, enter valid user name');
  }
}

app();
