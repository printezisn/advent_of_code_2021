import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
const maxRow = lines.length;
const maxCol = lines[0].length;
const frequencies = new Map();
const antinodes = new Set();

lines.forEach((line, row) => {
  for (let col = 0; col < maxCol; col++) {
    if (line[col] === ".") continue;

    if (!frequencies.get(line[col])) {
      frequencies.set(line[col], []);
    }
    frequencies.get(line[col]).push([row, col]);
  }
});

frequencies.forEach((list) => {
  for (let i = 0; i < list.length; i++) {
    const [row1, col1] = list[i];

    for (let j = 0; j < list.length; j++) {
      if (i === j) continue;

      const [row2, col2] = list[j];
      const antinode = [2 * row1 - row2, 2 * col1 - col2];
      if (
        antinode[0] >= 0 &&
        antinode[0] < maxRow &&
        antinode[1] >= 0 &&
        antinode[1] < maxCol
      ) {
        antinodes.add(antinode[0] * maxCol + antinode[1]);
      }
    }
  }
});

console.log(antinodes.size);
