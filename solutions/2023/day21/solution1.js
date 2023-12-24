const fs = require("fs");

let startPos;

const map = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n")
  .map((line, i) => {
    const row = [];
    const trimmedLine = line.trim();

    for (let j = 0; j < trimmedLine.length; j++) {
      if (trimmedLine[j] === "S") {
        startPos = [i, j];
        row.push(".");
      } else {
        row.push(trimmedLine[j]);
      }
    }

    return row;
  });

let nodesToVisit = [startPos];

for (let i = 0; i < 64; i++) {
  const newNodes = {};

  while (nodesToVisit.length > 0) {
    const node = nodesToVisit.shift();
    const [row, col] = node;

    [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ].forEach(([newRow, newCol]) => {
      if (
        newRow < 0 ||
        newRow >= map.length ||
        newCol < 0 ||
        newCol >= map[newRow].length
      ) {
        return;
      }
      if (map[newRow][newCol] === "#") return;

      newNodes[[newRow, newCol]] = [newRow, newCol];
    });
  }

  nodesToVisit = Object.values(newNodes);
}

console.log(nodesToVisit.length);
