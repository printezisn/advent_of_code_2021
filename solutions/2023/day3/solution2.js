const fs = require("fs");

const isDigit = (spot) => spot >= "0" && spot <= "9";

const map = [];
const validSymbols = [];
let currentEntity = {};
let currentKey = 0;

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line, row) => {
    map.push([]);

    [...line.trim()].forEach((spot, col) => {
      if (isDigit(spot)) {
        if (currentEntity.type !== "number") {
          currentEntity = { key: currentKey++, type: "number", value: 0 };
        }

        currentEntity.value = currentEntity.value * 10 + Number(spot);
        map[row][col] = currentEntity;
      } else {
        currentEntity = { type: "symbol", value: spot };

        if (spot === "*") validSymbols.push([row, col]);
        map[row][col] = currentEntity;
      }
    });
  });

let total = 0;

validSymbols.forEach(([row, col]) => {
  const validNumbers = {};

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) continue;
      if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) continue;
      if (map[i][j].type !== "number") continue;

      validNumbers[map[i][j].key] = map[i][j];
    }
  }

  const values = Object.values(validNumbers);
  if (values.length !== 2) return;

  total += values[0].value * values[1].value;
});

console.log(total);
