import fs from "fs";
import path from "path";

const TOTAL_TO_SAVE = 100;
const MAX_CHEAT_TIME = 2;

let start, end;
const walls = new Set();

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()));
const totalRows = lines.length;
const totalCols = lines[0].length;

lines.forEach((line, row) => {
  line.forEach((ch, col) => {
    switch (ch) {
      case "S":
        start = row * totalCols + col;
        break;
      case "E":
        end = row * totalCols + col;
        break;
      case "#":
        walls.add(row * totalCols + col);
        break;
    }
  });
});

const getNextNodes = (node) => {
  const next = [];

  if (node % totalCols > 0) next.push(node - 1);
  if (node % totalCols < totalCols - 1) next.push(node + 1);
  if (node - totalCols >= 0) next.push(node - totalCols);
  if (node + totalCols < (totalRows + 1) * totalCols) {
    next.push(node + totalCols);
  }

  return next;
};

const findShortestPaths = () => {
  const nodesToVisit = [[start, 0, [start]]];
  const visitedNodes = new Map([[start, 0]]);
  let minSteps = Infinity;
  let shortestPaths = [];

  while (nodesToVisit.length > 0) {
    const [node, steps, path] = nodesToVisit.shift();

    if (node === end) {
      if (steps < minSteps) {
        minSteps = steps;
        shortestPaths = [path];
      } else if (steps === minSteps) {
        shortestPaths.push(path);
      }

      continue;
    }

    getNextNodes(node).forEach((newNode) => {
      if (walls.has(newNode)) return;
      if (visitedNodes.has(newNode) && visitedNodes.get(newNode) < steps + 1) {
        return;
      }

      visitedNodes.set(newNode, steps + 1);
      nodesToVisit.push([newNode, steps + 1, [...path, newNode]]);
    });
  }

  return shortestPaths;
};

const shortestPaths = findShortestPaths();
const cheats = new Set();

shortestPaths.forEach((path) => {
  for (let i = 0; i < path.length; i++) {
    for (let j = i + 1; j < path.length; j++) {
      const [x1, y1] = [Math.floor(path[i] / totalCols), path[i] % totalCols];
      const [x2, y2] = [Math.floor(path[j] / totalCols), path[j] % totalCols];
      const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
      if (dist > MAX_CHEAT_TIME) continue;

      const total = i + dist + path.length - 1 - j;
      if (total <= shortestPaths[0].length - 1 - TOTAL_TO_SAVE) {
        cheats.add([path[i], path[j]].toString());
      }
    }
  }
});

console.log(cheats.size);
