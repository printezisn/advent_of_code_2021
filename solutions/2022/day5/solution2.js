const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

let i, j;
const stacks = [];

for (i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line[1] === '1') break;

  for (j = 0, stackIndex = 0; j < line.length; j += 4, stackIndex++) {
    stacks[stackIndex] = stacks[stackIndex] || [];

    if (line[j + 1] !== ' ') {
      stacks[stackIndex].push(line[j + 1])
    }
  }
}

for (i = i + 2; i < lines.length; i++) {
  const match = lines[i].match(/move (\d+) from (\d+) to (\d+)/)
  const total = Number(match[1]);
  const from = Number(match[2]);
  const to = Number(match[3]);

  const moving = stacks[from - 1].splice(0, total);
  stacks[to - 1].splice(0, 0, ...moving);
}

console.log(stacks.map(stack => stack[0]).join(''));