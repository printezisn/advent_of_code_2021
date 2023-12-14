const fs = require("fs");

const runCycle = (map) => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] !== "O") continue;

      let i;

      for (i = row - 1; i >= 0 && map[i][col] === "."; i--);
      map[row][col] = ".";
      map[i + 1][col] = "O";
    }
  }
};

const calculateWeight = (map) => {
  let total = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        total += map.length - i;
      }
    }
  }

  return total;
};

const map = [];

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line, i) => {
    map.push([]);

    [...line].forEach((ch, j) => {
      map[i].push(ch);
    });
  });

runCycle(map);

console.log(calculateWeight(map));
