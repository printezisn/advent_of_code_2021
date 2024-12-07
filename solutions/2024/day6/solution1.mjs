import fs from "fs";

let guard = [0, 0];
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let dirIndex = 0;
const obstacles = new Set();
const lines = fs.readFileSync("./input.txt").toString().split("\n");
const maxRow = lines.length - 1;
const maxCol = lines[0].length - 1;
const uniquePositions = new Set();

lines.forEach((line, row) => {
  for (let col = 0; col <= line.length; col++) {
    if (line[col] === "^") guard = [row, col];
    else if (line[col] === "#") obstacles.add(row * maxCol + col);
  }
});

while (true) {
  uniquePositions.add(guard[0] * maxCol + guard[1]);

  const dir = dirs[dirIndex];
  const newPos = [guard[0] + dir[0], guard[1] + dir[1]];
  if (
    newPos[0] < 0 ||
    newPos[0] > maxRow ||
    newPos[1] < 0 ||
    newPos[1] > maxCol
  ) {
    break;
  }

  if (!obstacles.has(newPos[0] * maxCol + newPos[1])) {
    guard = newPos;
  } else {
    dirIndex = (dirIndex + 1) % dirs.length;
  }
}

console.log(uniquePositions.size);
