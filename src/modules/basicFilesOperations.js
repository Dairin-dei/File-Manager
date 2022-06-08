export const cat = async (path) => {
  if (path === '') {
    console.log('Operation failed. Please, enter a valid path!');
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
