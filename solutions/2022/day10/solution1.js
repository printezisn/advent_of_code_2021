const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

const importantCycles = [20, 60, 100, 140, 180, 220];

let x = 1;
let currentCycle = 1, currentImportantCycle = 0, currentLine = 0, total = 0;

while (currentImportantCycle < importantCycles.length) {
  const [cmd, value] = lines[currentLine].trim().split(' ');
  const nextCycle = currentCycle + (cmd === 'noop' ? 1 : 2);
  const nextX = x + (cmd === 'noop' ? 0 : Number(value));

  if (nextCycle > importantCycles[currentImportantCycle]) {
    total += importantCycles[currentImportantCycle] * x;
    currentImportantCycle++;
  } else if (nextCycle === importantCycles[currentImportantCycle]) {
    total += importantCycles[currentImportantCycle] * nextX;
    currentImportantCycle++;
  }

  x = nextX;
  currentCycle = nextCycle;
  currentLine++;
}

console.log(total);