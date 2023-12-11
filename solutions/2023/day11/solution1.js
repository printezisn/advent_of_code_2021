const fs = require("fs");

const galaxies = [];
const filledRows = new Set();
const filledColumns = new Set();

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line, row) => {
    [...line.trim()].forEach((ch, col) => {
      if (ch !== "#") return;

      galaxies.push([row, col]);

      filledRows.add(row);
      filledColumns.add(col);
    });
  });

let result = 0;

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const [fromRow, fromCol] = galaxies[i];
    const [toRow, toCol] = galaxies[j];
    const maxRow = Math.max(fromRow, toRow);
    const maxCol = Math.max(fromCol, toCol);
    const minRow = Math.min(fromRow, toRow);
    const minCol = Math.min(fromCol, toCol);

    result += maxRow - minRow + maxCol - minCol;

    for (let k = minRow; k <= maxRow; k++) {
      if (!filledRows.has(k)) result++;
    }
    for (let k = minCol; k <= maxCol; k++) {
      if (!filledColumns.has(k)) result++;
    }
  }
}

console.log(result);
