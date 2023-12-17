const fs = require("fs");

const findMoveHeatLoss = (
  map,
  fromRow,
  fromCol,
  toRow,
  toCol,
  horizontalDirection,
  verticalDirection
) => {
  let total = 0;

  while (fromRow !== toRow || fromCol !== toCol) {
    fromRow = fromRow + verticalDirection;
    fromCol = fromCol + horizontalDirection;
    if (
      fromRow < 0 ||
      fromRow >= map.length ||
      fromCol < 0 ||
      fromCol >= map[fromRow].length
    ) {
      return null;
    }

    total += map[fromRow][fromCol];
  }

  return total;
};

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
  },
  {
    row: 0,
    col: 0,
    verticalDirection: 1,
    horizontalDirection: 0,
    move: 0,
    heatLoss: 0,
  },
];
const visitedNodes = new Map();
let minHeatLoss = Number.MAX_VALUE;

while (nodesToVisit.length > 0) {
  const { row, col, move, horizontalDirection, verticalDirection, heatLoss } =
    nodesToVisit.pop();

  const nodeKey = [row, col, verticalDirection, horizontalDirection, move].join(
    ","
  );
  const existingHeatLoss = visitedNodes.get(nodeKey);

  if (heatLoss >= minHeatLoss) {
    continue;
  }
  if (existingHeatLoss != null && existingHeatLoss <= heatLoss) {
    continue;
  }

  visitedNodes.set(nodeKey, heatLoss);
  if (row === map.length - 1 && col === map[row].length - 1) {
    minHeatLoss = Math.min(minHeatLoss, heatLoss);
    continue;
  }

  const newMoves = [];

  newMoves.push({
    move: 4,
    offset: 4,
    verticalDirection: verticalDirection !== 0 ? 0 : -horizontalDirection,
    horizontalDirection: horizontalDirection !== 0 ? 0 : -verticalDirection,
  });
  newMoves.push({
    move: 4,
    offset: 4,
    verticalDirection: verticalDirection !== 0 ? 0 : horizontalDirection,
    horizontalDirection: horizontalDirection !== 0 ? 0 : verticalDirection,
  });
  if (move < 10) {
    newMoves.push({
      move: move >= 4 ? move + 1 : 4,
      offset: move >= 4 ? 1 : 4 - move,
      verticalDirection,
      horizontalDirection,
    });
  }

  newMoves.forEach(
    ({ move, offset, verticalDirection, horizontalDirection }) => {
      const newRow = row + offset * verticalDirection;
      const newCol = col + offset * horizontalDirection;
      const extraHeatLoss = findMoveHeatLoss(
        map,
        row,
        col,
        newRow,
        newCol,
        horizontalDirection,
        verticalDirection
      );

      if (extraHeatLoss == null) return;

      nodesToVisit.push({
        row: newRow,
        col: newCol,
        horizontalDirection,
        verticalDirection,
        move,
        heatLoss: heatLoss + extraHeatLoss,
      });
    }
  );
}

console.log(minHeatLoss);
