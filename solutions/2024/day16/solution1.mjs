import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()));
let start;
let end;
const totalCols = lines[0].length;
const walls = new Set();

const positionToKey = (p) => p[0] * totalCols + p[1];

lines.forEach((line, row) => {
  line.forEach((ch, col) => {
    switch (ch) {
      case "#":
        walls.add(positionToKey([row, col]));
        break;
      case "S":
        start = positionToKey([row, col]);
        break;
      case "E":
        end = positionToKey([row, col]);
        break;
    }
  });
});

const findOptimalScore = () => {
  const nodesToVisit = [[start, 0, 1]];
  const visitedNodes = new Map([[start, 0]]);
  let result = Infinity;

  while (nodesToVisit.length > 0) {
    const [node, score, dir] = nodesToVisit.shift();
    if (node === end) {
      result = Math.min(result, score);
      continue;
    }

    const next = [
      [
        [node - totalCols, 0],
        [node + 1, 1],
        [node - 1, 3],
      ],
      [
        [node + 1, 1],
        [node - totalCols, 0],
        [node + totalCols, 2],
      ],
      [
        [node + totalCols, 2],
        [node + 1, 1],
        [node - 1, 3],
      ],
      [
        [node - 1, 3],
        [node - totalCols, 0],
        [node + totalCols, 2],
      ],
    ][dir];

    next.forEach(([newNode, newDir]) => {
      if (walls.has(newNode)) return;

      const newScore = score + (dir === newDir ? 1 : 1001);
      if (visitedNodes.has(newNode) && visitedNodes.get(newNode) < newScore) {
        return;
      }

      visitedNodes.set(newNode, newScore);
      nodesToVisit.push([newNode, newScore, newDir]);
    });
  }

  return result;
};

console.log(findOptimalScore());
