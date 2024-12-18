import fs from "fs";
import path from "path";

const TOTAL_ROWS = 71;
const TOTAL_COLS = 71;

const getPositionKey = (row, col) => row * TOTAL_COLS + col;

const target = getPositionKey(TOTAL_ROWS - 1, TOTAL_COLS - 1);

const findShortestPath = (corruptedCoords) => {
  const nodesToVisit = [[0, 0]];
  const visitedNodes = new Set([0]);

  while (nodesToVisit.length > 0) {
    const [node, steps] = nodesToVisit.shift();
    if (node === target) {
      return steps;
    }

    const next = [];
    if (node % TOTAL_COLS > 0) {
      next.push(node - 1);
    }
    if (node % TOTAL_COLS < TOTAL_COLS - 1) {
      next.push(node + 1);
    }
    if (node > TOTAL_COLS) {
      next.push(node - TOTAL_COLS);
    }
    if (node + TOTAL_COLS <= target) {
      next.push(node + TOTAL_COLS);
    }

    next.forEach((newNode) => {
      if (visitedNodes.has(newNode) || corruptedCoords.has(newNode)) return;

      visitedNodes.add(newNode);
      nodesToVisit.push([newNode, steps + 1]);
    });
  }

  return null;
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
const corruptedCoords = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const coords = line.match(/(\d+)/g).map(Number);
  corruptedCoords.add(getPositionKey(coords[1], coords[0]));

  if (findShortestPath(corruptedCoords) == null) {
    console.log(coords);
    break;
  }
}
