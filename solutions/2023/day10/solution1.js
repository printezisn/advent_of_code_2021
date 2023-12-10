const fs = require("fs");

const getNeighbours = (map, row, col) => {
  let neighbours = [];

  if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
    return neighbours;
  }

  switch (map[row][col]) {
    case "|":
      neighbours = [
        [row - 1, col],
        [row + 1, col],
      ];
      break;
    case "-":
      neighbours = [
        [row, col - 1],
        [row, col + 1],
      ];
      break;
    case "L":
      neighbours = [
        [row - 1, col],
        [row, col + 1],
      ];
      break;
    case "J":
      neighbours = [
        [row - 1, col],
        [row, col - 1],
      ];
      break;
    case "7":
      neighbours = [
        [row + 1, col],
        [row, col - 1],
      ];
      break;
    case "F":
      neighbours = [
        [row + 1, col],
        [row, col + 1],
      ];
      break;
    case "S":
      const possibleNeighbours = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];

      possibleNeighbours.forEach(([i, j]) => {
        const isNeighbour = getNeighbours(map, i, j).some(
          (n) => n[0] === row && n[1] === col
        );
        if (isNeighbour) {
          neighbours.push([i, j]);
        }
      });

      break;
  }

  return neighbours.filter(
    (n) =>
      n[0] >= 0 && n[0] < map.length && n[1] >= 0 && n[1] < map[n[0]].length
  );
};

const map = [];
let start = [];

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const trimmedLine = line.trim();

    map.push([]);
    for (let i = 0; i < trimmedLine.length; i++) {
      map[map.length - 1].push(trimmedLine[i]);
      if (trimmedLine[i] === "S") {
        start = [map.length - 1, i];
      }
    }
  });

const nodesToVisit = [[start, 0]];
const visitedNodes = {};
let maxStep = 0;

while (nodesToVisit.length > 0) {
  const [node, step] = nodesToVisit.shift();
  if (visitedNodes[node]) continue;

  maxStep = Math.max(maxStep, step);
  visitedNodes[node] = true;

  getNeighbours(map, node[0], node[1]).forEach((n) => {
    nodesToVisit.push([n, step + 1]);
  });
}

console.log(maxStep);
