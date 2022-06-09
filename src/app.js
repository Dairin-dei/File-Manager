import { createInterface } from 'readline';
import { printDirectory } from './modules/printDirectory.js';
import { cd, up, ls } from './modules/navigation.js';
import { setBasicParameters } from './modules/parameters.js';
import { add, cat, rn, cp, rm, mv } from './modules/basicFilesOperations.js';
import { access } from 'fs';
import { basename, join } from 'path';

async function app() {
  // try {
  const name = process.argv[2].split('=')[1]; //добавить валидацию имени переменной
  //проверить относительность путей
  console.log('User is', name);
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
          break;
        case 'hash':
          break;
        case 'compress':
          break;
        case 'decompress':
          break;
        case '':
          console.log(`Invalid input. Please, enter a command!`);
          break;
        default:
          console.log(`Invalid input. Oops, I don't know command "${command}"`);
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
