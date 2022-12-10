const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const screen = Array(240).fill('.');
let x = 1, currentLine = 0, cycle = 0;

while (cycle < screen.length) {
  const [cmd, value] = lines[currentLine].trim().split(' ');
  let totalCycles = cmd === 'noop' ? 1 : 2;
  const nextX = cmd === 'noop' ? x : (x + Number(value));

  while (totalCycles > 0 && cycle < screen.length) {
    const showSprite =
      ((x - 1) % 40) === (cycle % 40) ||
      (x % 40) === (cycle % 40) || 
      ((x + 1) % 40) === (cycle % 40);
    if (showSprite) screen[cycle] = '#';

    totalCycles--;
    cycle++;

    if (totalCycles === 0 && cycle < screen.length) x = nextX;
  }

  currentLine++;
}

for (let i = 0; i < screen.length; i++) {
  if (i > 0 && i % 40 === 0) process.stdout.write('\n');
  process.stdout.write(screen[i]);
}

process.stdout.write('\n');
