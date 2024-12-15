import fs from "fs";
import path from "path";

const SYMBOL_TO_DIR = {
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
  v: [1, 0],
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
const walls = new Set();
const boxes = new Set();
let robot = [];
let totalRows = 0;
let totalCols = 0;
let moves = [];
let readingMoves = false;

const move = (pos, symbol) => {
  const dir = SYMBOL_TO_DIR[symbol];
  const newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  const newPosKey = newPos[0] * totalCols + newPos[1];

  if (walls.has(newPosKey)) {
    return null;
  }
  if (boxes.has(newPosKey)) {
    const newBoxPos = move(newPos, symbol);
    if (!newBoxPos) return null;

    boxes.delete(newPosKey);
    boxes.add(newBoxPos[0] * totalCols + newBoxPos[1]);
  }

  return newPos;
};

const printMap = () => {
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalCols; j++) {
      const posKey = i * totalCols + j;

      if (walls.has(posKey)) {
        process.stdout.write("#");
      } else if (boxes.has(posKey)) {
        process.stdout.write("O");
      } else if (i === robot[0] && j === robot[1]) {
        process.stdout.write("@");
      } else {
        process.stdout.write(".");
      }
    }

    console.log();
  }
};

lines.forEach((line, row) => {
  const trimmedLine = line.trim();
  if (!trimmedLine) {
    readingMoves = true;
    return;
  }
  if (readingMoves) {
    moves.push(...Array.from(trimmedLine));
    return;
  }

  totalRows++;
  totalCols = trimmedLine.length;

  for (let col = 0; col < trimmedLine.length; col++) {
    if (trimmedLine[col] === "#") {
      walls.add(row * totalCols + col);
    } else if (trimmedLine[col] === "O") {
      boxes.add(row * totalCols + col);
    } else if (trimmedLine[col] === "@") {
      robot = [row, col];
    }
  }
});

moves.forEach((m) => {
  const newPos = move(robot, m);
  if (newPos) {
    robot = newPos;
  }
});

let result = 0;
boxes.forEach((posKey) => {
  const x = posKey % totalCols;
  const y = Math.floor(posKey / totalCols);

  result += x + y * 100;
});

console.log(result);
