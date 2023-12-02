const fs = require("fs");

const colors = Object.freeze(["red", "green", "blue"]);

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  const parsedLine = line.split(":")[1];
  const subsets = parsedLine.split(";");
  const maxPerColor = {};

  for (const subset of subsets) {
    for (const color of colors) {
      const number = Number(
        subset.match(new RegExp(`(\\d+) ${color}`))?.[1] || "0"
      );

      maxPerColor[color] = Math.max(maxPerColor[color] || 0, number);
    }
  }

  total += Object.values(maxPerColor).reduce(
    (result, value) => result * value,
    1
  );
});

console.log(total);
