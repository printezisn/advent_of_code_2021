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

  for (let col = 0; col < map[0].length; col++) {
    for (let row = 0; row < map.length; row++) {
      if (map[row][col] !== "O") continue;

      let i;

      for (i = col - 1; i >= 0 && map[row][i] === "."; i--);
      map[row][col] = ".";
      map[row][i + 1] = "O";
    }
  }

  for (let row = map.length - 1; row >= 0; row--) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] !== "O") continue;

      let i;

      for (i = row + 1; i < map.length && map[i][col] === "."; i++);
      map[row][col] = ".";
      map[i - 1][col] = "O";
    }
  }

  for (let col = map[0].length - 1; col >= 0; col--) {
    for (let row = 0; row < map.length; row++) {
      if (map[row][col] !== "O") continue;

      let i;

      for (i = col + 1; i < map[row].length && map[row][i] === "."; i++);
      map[row][col] = ".";
      map[row][i - 1] = "O";
    }
  }
};

const getStateKey = (map) => {
  const key = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== "O") continue;

      key.push(i);
      key.push(j);
    }
  }

  return key.join(",");
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

let cache = {
  [getStateKey(map)]: 0,
};

for (let cycle = 0; cycle < 1000000000; cycle++) {
  runCycle(map);

  const key = getStateKey(map);
  if (cache[key] != null) {
    const diff = cycle - cache[key];
    cycle = 1000000000 - ((1000000000 - cycle) % diff);
    cache = {};
  } else {
    cache[key] = cycle;
  }
}

console.log(calculateWeight(map));
