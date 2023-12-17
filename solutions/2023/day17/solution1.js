const fs = require("fs");

const map = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => [...line.trim()].map(Number));

const nodesToVisit = [
  {
    row: 0,
    col: 0,
    verticalDirection: 0,
    horizontalDirection: 1,
    move: 0,
    heatLoss: 0,
    skipHeatLoss: true,
  },
];
const visitedNodes = new Map();
let minHeatLoss = Number.MAX_VALUE;

while (nodesToVisit.length > 0) {
  const {
    row,
    col,
    move,
    horizontalDirection,
    verticalDirection,
    heatLoss,
    skipHeatLoss,
  } = nodesToVisit.pop();
  if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
    continue;
  }

  const nodeKey = [row, col, verticalDirection, horizontalDirection, move].join(
    ","
  );
  const currentHeatLoss = skipHeatLoss ? heatLoss : heatLoss + map[row][col];
  const existingHeatLoss = visitedNodes.get(nodeKey);

  if (currentHeatLoss >= minHeatLoss) {
    continue;
  }
  if (existingHeatLoss != null && existingHeatLoss <= currentHeatLoss) {
    continue;
  }

  visitedNodes.set(nodeKey, currentHeatLoss);
  if (row === map.length - 1 && col === map[row].length - 1) {
    minHeatLoss = Math.min(minHeatLoss, currentHeatLoss);
    continue;
  }

  const newMoves = [
    {
      verticalDirection: verticalDirection !== 0 ? 0 : -horizontalDirection,
      horizontalDirection: horizontalDirection !== 0 ? 0 : -verticalDirection,
      move: 0,
    },
    {
      verticalDirection: verticalDirection !== 0 ? 0 : horizontalDirection,
      horizontalDirection: horizontalDirection !== 0 ? 0 : verticalDirection,
      move: 0,
    },
  ];
  if (move < 2) {
    newMoves.push({
      verticalDirection,
      horizontalDirection,
      move: move + 1,
    });
  }

  newMoves.forEach(({ verticalDirection, horizontalDirection, move }) => {
    nodesToVisit.push({
      row: row + verticalDirection,
      col: col + horizontalDirection,
      move,
      verticalDirection,
      horizontalDirection,
      heatLoss: currentHeatLoss,
    });
  });
}

console.log(minHeatLoss);
