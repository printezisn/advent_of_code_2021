const fs = require('fs');
const path = require('path');
const { listenerCount } = require('process');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

let currentDir = [''];
const fileInfo = {
  '': { size: 0, parent: null }
};
const directories = [''];

lines.forEach((line, i) => {
  const cmd = line.trim();

  if (cmd === '$ cd /') {
    currentDir = [''];
  } else if (cmd === '$ cd ..') {
    currentDir.pop();
  } else if (cmd.indexOf('$ cd ') === 0) {
    currentDir.push(cmd.split(' ')[2]);
  } else if (cmd === '$ ls') {
  } else if (cmd.indexOf('dir ') === 0) {
    const dir = cmd.split(' ')[1];
    const path = [...currentDir, dir].join('/');

    if (fileInfo[path]) return;

    fileInfo[path] = { size: 0, parent: [...currentDir] };
    directories.push(path);
  } else {
    const [size, file] = cmd.split(' ');
    const path = [...currentDir, file].join('/');

    if (fileInfo[path]) return;

    fileInfo[path] = { size: Number(size), parent: [...currentDir] };
    let parent = fileInfo[path].parent;

    while (parent) {
      const parentPath = parent.join('/');
      fileInfo[parentPath].size += fileInfo[path].size;
      parent = fileInfo[parentPath].parent;
    }
  }
});

const availableSize = 70000000 - fileInfo[''].size;
const sizeToFreeUp = 30000000 - availableSize;
const deletedSize = directories
  .filter(d => fileInfo[d].size >= sizeToFreeUp)
  .reduce((min, d) => Math.min(min, fileInfo[d].size), fileInfo[''].size);

console.log(deletedSize);
