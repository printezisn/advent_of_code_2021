const fs = require("fs");

const findMaxStepsToEnd = (map, [row, col], visitedNodes = {}, cache = {}) => {
  if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
    return 0;
  }
  if (map[row][col] === "#") return 0;
  if (visitedNodes[[row, col]]) return 0;
  if (row === map.length - 1) return 1;

  if (cache[[row, col]] != null) return cache[[row, col]];

  visitedNodes[[row, col]] = true;

  const validMoves = [];

  switch (map[row][col]) {
    case ">":
      validMoves.push([row, col + 1]);
      break;
    case "<":
      validMoves.push([row, col - 1]);
      break;
    case "^":
      validMoves.push([row - 1, col]);
      break;
    case "v":
      validMoves.push([row + 1, col]);
      break;
    default:
      validMoves.push([row, col + 1]);
      validMoves.push([row, col - 1]);
      validMoves.push([row - 1, col]);
      validMoves.push([row + 1, col]);
  }

  const result = validMoves.reduce(
    (max, p) => Math.max(max, findMaxStepsToEnd(map, p, visitedNodes, cache)),
    0
  );

  visitedNodes[[row, col]] = false;
  if (result === 0) return 0;

  cache[[row, col]] = result + 1;

  return result + 1;
};

const map = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => [...line.trim()]);
const startPos = [0, map[0].indexOf(".")];

console.log(findMaxStepsToEnd(map, startPos) - 1);
