const fs = require('fs');
const path = require('path');

const createArray = (totalRows, totalCols) => {
  const arr = [];

  for (let i = 0; i < totalRows; i++) {
    arr.push(Array(totalCols).fill(-1));
  }

  return arr;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

const maxInColumnsFromUp = createArray(lines.length, lines[0].length);
const maxInRowsFromLeft = createArray(lines.length, lines[0].length);
const maxInColumnsFromDown = createArray(lines.length, lines[0].length);
const maxInRowsFromRight = createArray(lines.length, lines[0].length);

let total = 0, i, j;

for (i = 0; i < lines.length; i++) {
  for (j = 0; j < lines[i].length - 1; j++) {
    const height = Number(lines[i][j]);
    maxInRowsFromLeft[i][j + 1] = Math.max(maxInRowsFromLeft[i][j], height);
  }
  for (j = lines[i].length - 1; j > 0; j--) {
    const height = Number(lines[i][j]);
    maxInRowsFromRight[i][j - 1] = Math.max(maxInRowsFromRight[i][j], height);
  }
}

for (j = 0; j < lines[0].length; j++) {
  for (i = 0; i < lines.length - 1; i++) {
    const height = Number(lines[i][j]);
    maxInColumnsFromUp[i + 1][j] = Math.max(maxInColumnsFromUp[i][j], height);
  }
  for (i = lines.length - 1; i > 0; i--) {
    const height = Number(lines[i][j]);
    maxInColumnsFromDown[i - 1][j] = Math.max(maxInColumnsFromDown[i][j], height);
  }
}

for (i = 0; i < lines.length; i++) {
  for (j = 0; j < lines[i].length; j++) {
    const height = Number(lines[i][j]);
    const visible =
      height > maxInRowsFromLeft[i][j] ||
      height > maxInRowsFromRight[i][j] ||
      height > maxInColumnsFromUp[i][j] ||
      height > maxInColumnsFromDown[i][j];

    if (visible) total++;
   }
}

console.log(total);