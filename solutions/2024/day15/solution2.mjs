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
const boxLefts = new Set();
const boxRights = new Set();
let robot = [];
let totalRows = 0;
let totalCols = 0;
let moves = [];
let readingMoves = false;

const positionToKey = (p) => p[0] * totalCols + p[1];
const positionFromKey = (p) => [Math.floor(p / totalCols), p % totalCols];
const nextPosition = (p, symbol) => [
  p[0] + SYMBOL_TO_DIR[symbol][0],
  p[1] + SYMBOL_TO_DIR[symbol][1],
];
const nextPositionKey = (p, symbol) => positionToKey(nextPosition(p, symbol));

const getBoxPositions = (p) => {
  const key = positionToKey(p);
  if (boxRights.has(key)) {
    return [positionFromKey(key - 1), p];
  } else if (boxLefts.has(key)) {
    return [p, positionFromKey(key + 1)];
  }

  return null;
};

const nextBoxPositions = (positions, symbol) => {
  if (symbol === ">") {
    return [positions[1]];
  }
  if (symbol === "<") {
    return [positions[0]];
  }

  return positions;
};

const move = (pos, symbol, apply = true) => {
  const newPos = nextPosition(pos, symbol);

  if (walls.has(positionToKey(newPos))) {
    return false;
  }

  const boxPositions = getBoxPositions(newPos);
  if (boxPositions) {
    const nextPositions = nextBoxPositions(boxPositions, symbol);
    const valid = nextPositions.every((p) => move(p, symbol, false));
    if (!valid) return false;
    if (!apply) return true;

    nextPositions.forEach((p) => move(p, symbol));

    boxLefts.delete(positionToKey(boxPositions[0]));
    boxRights.delete(positionToKey(boxPositions[1]));
    boxLefts.add(nextPositionKey(boxPositions[0], symbol));
    boxRights.add(nextPositionKey(boxPositions[1], symbol));
  }

  return true;
};

const printMap = () => {
  for (let i = 0; i < totalRows; i++) {
    for (let j = 0; j < totalCols; j++) {
      const posKey = positionToKey([i, j]);

      if (walls.has(posKey)) {
        process.stdout.write("#");
      } else if (boxLefts.has(posKey)) {
        process.stdout.write("[");
      } else if (boxRights.has(posKey)) {
        process.stdout.write("]");
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
  totalCols = trimmedLine.length * 2;

  for (let col = 0; col < trimmedLine.length; col++) {
    if (trimmedLine[col] === "#") {
      walls.add(positionToKey([row, col * 2]));
      walls.add(positionToKey([row, col * 2 + 1]));
    } else if (trimmedLine[col] === "O") {
      boxLefts.add(positionToKey([row, col * 2]));
      boxRights.add(positionToKey([row, col * 2 + 1]));
    } else if (trimmedLine[col] === "@") {
      robot = [row, col * 2];
    }
  }
});

moves.forEach((m) => {
  if (move(robot, m)) {
    robot = nextPosition(robot, m);
  }
});

let result = 0;
boxLefts.forEach((posKey) => {
  const x = posKey % totalCols;
  const y = Math.floor(posKey / totalCols);

  result += x + y * 100;
});

console.log(result);
