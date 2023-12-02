const fs = require("fs");

const validCubes = Object.freeze({
  red: 12,
  green: 13,
  blue: 14,
});

const colors = Object.freeze(["red", "green", "blue"]);

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line, i) => {
  const parsedLine = line.split(":")[1];
  const subsets = parsedLine.split(";");
  let possible = true;

  for (const subset of subsets) {
    for (const color of colors) {
      const number = Number(
        subset.match(new RegExp(`(\\d+) ${color}`))?.[1] || "0"
      );
      if (number > validCubes[color]) {
        possible = false;
        break;
      }
    }

    if (!possible) break;
  }

  if (possible) total += i + 1;
});

console.log(total);
