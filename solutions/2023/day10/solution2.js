const fs = require("fs");

const getNeighbours = (map, row, col) => {
  let neighbours = [];

  if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
    return neighbours;
  }

  switch (map[row][col]) {
    case "|":
      neighbours = [
        [row - 2, col],
        [row + 2, col],
      ];
      break;
    case "-":
      neighbours = [
        [row, col - 2],
        [row, col + 2],
      ];
      break;
    case "L":
      neighbours = [
        [row - 2, col],
        [row, col + 2],
      ];
      break;
    case "J":
      neighbours = [
        [row - 2, col],
        [row, col - 2],
      ];
      break;
    case "7":
      neighbours = [
        [row + 2, col],
        [row, col - 2],
      ];
      break;
    case "F":
      neighbours = [
        [row + 2, col],
        [row, col + 2],
      ];
      break;
    case "S":
      const possibleNeighbours = [
        [row - 2, col],
        [row + 2, col],
        [row, col - 2],
        [row, col + 2],
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
  .forEach((line, i) => {
    const trimmedLine = line.trim();

    if (i === 0) {
      map.push([...Array(trimmedLine.length * 2 + 1)].map(() => "X"));
    }
    map.push(["X"]);

    for (let j = 0; j < trimmedLine.length; j++) {
      map[map.length - 1].push(trimmedLine[j]);
      if (trimmedLine[j] === "S") {
        start = [map.length - 1, map[map.length - 1].length - 1];
      }

      map[map.length - 1].push("X");
    }

    map.push([...Array(trimmedLine.length * 2 + 1)].map(() => "X"));
  });

const nodesToVisit = [start];

while (nodesToVisit.length > 0) {
  const node = nodesToVisit.shift();
  if (map[node[0]][node[1]] === "B") continue;

  getNeighbours(map, node[0], node[1]).forEach((n) => {
    if (n[0] > node[0]) {
      map[n[0] - 1][n[1]] = "B";
    } else if (n[0] < node[0]) {
      map[n[0] + 2][n[1]] = "B";
    }

    if (n[1] > node[1]) {
      map[n[0]][n[1] - 1] = "B";
    } else if (n[1] < node[1]) {
      map[n[0]][n[1] + 1] = "B";
    }

    nodesToVisit.push(n);
  });

  map[node[0]][node[1]] = "B";
}

let hasChanges = true;

while (hasChanges) {
  hasChanges = false;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "B" || map[i][j] === "O") continue;

      const neighbours = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      const isOutside = neighbours.some(
        (n) =>
          n[0] < 0 ||
          n[0] >= map.length ||
          n[1] < 0 ||
          n[1] >= map[n[0]].length ||
          map[n[0]][n[1]] === "O"
      );

      if (isOutside) {
        map[i][j] = "O";
        hasChanges = true;
      }
    }
  }
}

let total = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] !== "X" && map[i][j] !== "B" && map[i][j] !== "O") total++;
  }
}

console.log(total);
