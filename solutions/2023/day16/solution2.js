const fs = require("fs");

const map = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => [...line.trim()]);

const runBeams = (
  startRow,
  startCol,
  startHorizontalDirection,
  startVerticalDirection,
  map
) => {
  const nodesToVisit = [
    {
      row: startRow,
      col: startCol,
      horizontalDirection: startHorizontalDirection,
      verticalDirection: startVerticalDirection,
    },
  ];
  let energized = new Set();
  const visitedNodes = new Set();

  while (nodesToVisit.length > 0) {
    const { row, col, horizontalDirection, verticalDirection } =
      nodesToVisit.pop();
    if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
      continue;
    }

    const visitKey = `${row},${col},${horizontalDirection},${verticalDirection}`;
    if (visitedNodes.has(visitKey)) continue;

    energized.add(`${row},${col}`);
    visitedNodes.add(visitKey);

    const continueStraight =
      map[row][col] === "." ||
      (map[row][col] === "-" && horizontalDirection !== 0) ||
      (map[row][col] === "|" && verticalDirection !== 0);

    if (continueStraight) {
      nodesToVisit.push({
        row: row + verticalDirection,
        col: col + horizontalDirection,
        horizontalDirection,
        verticalDirection,
      });
    } else if (map[row][col] === "-") {
      nodesToVisit.push({
        row,
        col: col - 1,
        horizontalDirection: -1,
        verticalDirection: 0,
      });

      nodesToVisit.push({
        row,
        col: col + 1,
        horizontalDirection: 1,
        verticalDirection: 0,
      });
    } else if (map[row][col] === "|") {
      nodesToVisit.push({
        row: row - 1,
        col,
        horizontalDirection: 0,
        verticalDirection: -1,
      });

      nodesToVisit.push({
        row: row + 1,
        col,
        horizontalDirection: 0,
        verticalDirection: 1,
      });
    } else if (map[row][col] === "/") {
      if (verticalDirection !== 0) {
        nodesToVisit.push({
          row,
          col: col - verticalDirection,
          horizontalDirection: -verticalDirection,
          verticalDirection: 0,
        });
      } else {
        nodesToVisit.push({
          row: row - horizontalDirection,
          col,
          horizontalDirection: 0,
          verticalDirection: -horizontalDirection,
        });
      }
    } else if (map[row][col] === "\\") {
      if (verticalDirection !== 0) {
        nodesToVisit.push({
          row,
          col: col + verticalDirection,
          horizontalDirection: verticalDirection,
          verticalDirection: 0,
        });
      } else {
        nodesToVisit.push({
          row: row + horizontalDirection,
          col,
          horizontalDirection: 0,
          verticalDirection: horizontalDirection,
        });
      }
    }
  }

  return energized.size;
};

let max = 0;

for (let i = 0; i < map[0].length; i++) {
  max = Math.max(max, runBeams(0, i, 0, 1, map));
  max = Math.max(max, runBeams(map.length - 1, i, 0, -1, map));
}

for (let i = 0; i < map.length; i++) {
  max = Math.max(max, runBeams(i, 0, 1, 0, map));
  max = Math.max(max, runBeams(map[i].length - 1, i, -1, 0, map));
}

console.log(max);
