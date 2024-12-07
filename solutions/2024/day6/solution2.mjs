import fs from "fs";

const simulateGuard = (guard, obstacles, maxRow, maxCol) => {
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let dirIndex = 0;
  const uniquePositions = new Set();
  const uniquePositionsPerDir = new Map();

  for (let i = 0; i < dirs.length; i++) {
    uniquePositionsPerDir.set(i, new Set());
  }

  while (true) {
    const positionKey = guard[0] * maxCol + guard[1];
    if (uniquePositionsPerDir.get(dirIndex).has(positionKey)) {
      return new Set();
    }

    uniquePositions.add(positionKey);
    uniquePositionsPerDir.get(dirIndex).add(positionKey);
    const dir = dirs[dirIndex];
    const newPos = [guard[0] + dir[0], guard[1] + dir[1]];
    if (
      newPos[0] < 0 ||
      newPos[0] >= maxRow ||
      newPos[1] < 0 ||
      newPos[1] >= maxCol
    ) {
      break;
    }

    if (obstacles.has(newPos[0] * maxCol + newPos[1])) {
      dirIndex = (dirIndex + 1) % dirs.length;
    } else {
      guard = newPos;
    }
  }

  return uniquePositions;
};

let guard = [0, 0];
const obstacles = new Set();
const lines = fs.readFileSync("./input.txt").toString().split("\n");
const maxRow = lines.length;
const maxCol = lines[0].length;
let result = 0;

lines.forEach((line, row) => {
  for (let col = 0; col <= line.length; col++) {
    if (line[col] === "^") guard = [row, col];
    else if (line[col] === "#") obstacles.add(row * maxCol + col);
  }
});

const guardPositions = simulateGuard(guard, obstacles, maxRow, maxCol);

guardPositions.forEach((pos) => {
  const row = Math.floor(pos / maxCol);
  const col = pos % maxCol;
  if (row === guard[0] && col === guard[1]) return;

  obstacles.add(pos);
  if (simulateGuard(guard, obstacles, maxRow, maxCol).size === 0) {
    result++;
  }
  obstacles.delete(pos);
});

console.log(result);
