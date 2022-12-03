const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let total = 0;

lines.forEach(line => {
  const middleIndex = Math.floor(line.length / 2);
  const firstRucksack = {}, secondRucksack = {};

  for (let i = 0; i < middleIndex; i++) firstRucksack[line[i]] = true;
  for (let i = middleIndex; i < line.length; i++) {
    if (!firstRucksack[line[i]] || secondRucksack[line[i]]) continue;

    secondRucksack[line[i]] = true;
    
    if (line.charCodeAt(i) >= 'a'.charCodeAt(0)) {
      total += line.charCodeAt(i) - 'a'.charCodeAt(0) + 1
    } else {
      total += line.charCodeAt(i) - 'A'.charCodeAt(0) + 27;
    }
  }
});

console.log(total);