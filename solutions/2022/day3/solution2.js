const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let total = 0, i, j;

for (i = 0; i < lines.length; i += 3) {
  const firstRucksack = {}, secondRucksack = {}, thirdRucksack = {};

  for (j = 0; j < lines[i].length; j++) {
    const itemType = lines[i][j];

    firstRucksack[itemType] = true;
  }
  for (j = 0; j < lines[i + 1].length; j++) {
    const itemType = lines[i + 1][j];

    if (firstRucksack[itemType]) secondRucksack[itemType] = true;
  }
  for (j = 0; j < lines[i + 2].length; j++) {
    const itemType = lines[i + 2][j];

    if (!secondRucksack[itemType]) continue;

    if (itemType.charCodeAt(0) >= 'a'.charCodeAt(0)) {
      total += itemType.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    } else {
      total += itemType.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }

    break;
  }
}

console.log(total);