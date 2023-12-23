const fs = require("fs");

let cache = {};

const getMoves = (map, [row, col], [forbiddenRow, forbiddenCol]) => {
  const possibleMoves = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  const validMoves = possibleMoves.filter(([r, c]) => {
    if (r < 0 || r >= map.length || c < 0 || c >= map[r].length) {
      return false;
    }
    if (map[r][c] === "#") return false;
    if (r === forbiddenRow && c === forbiddenCol) return false;

    return true;
  });

  return validMoves;
};

const getPath = (map, pos, previousPos) => {
  let step = 0;
  let validMoves;
  const initialPos = pos;
  const initialPreviousPos = previousPos;

  if (cache[[initialPos, initialPreviousPos]]) {
    return cache[[initialPos, initialPreviousPos]];
  }

  do {
    validMoves = getMoves(map, pos, previousPos);
    step++;

    if (validMoves.length === 0) return null;
    if (validMoves.length === 1) {
      previousPos = pos;
      pos = validMoves[0];

      if (pos[0] === map.length - 1) break;
    }
  } while (validMoves.length === 1);

  cache[[initialPos, initialPreviousPos]] = {
    to: pos,
    steps: step,
    validMoves,
  };

  return cache[[initialPos, initialPreviousPos]];
};

const findMaxStepsToEnd = (
  map,
  pos,
  previousPos,
  visitedNodes = {},
  step = 0
) => {
  if (pos[0] === map.length - 1) return step;
  if (visitedNodes[pos]) return 0;

  const { to, steps, validMoves } = getPath(map, pos, previousPos);

  if (visitedNodes[to]) return 0;

  visitedNodes[pos] = true;
  visitedNodes[to] = true;

  const result = validMoves.reduce(
    (max, p) =>
      Math.max(max, findMaxStepsToEnd(map, p, to, visitedNodes, step + steps)),
    0
  );

  delete visitedNodes[pos];
  delete visitedNodes[to];

  return result;
};

const map = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => [...line.trim()]);
const startPos = [0, map[0].indexOf(".")];

console.log(findMaxStepsToEnd(map, startPos, startPos));
