const fs = require("fs");

const splitIntoNumbers = (str) =>
  str
    .split(" ")
    .filter((num) => num)
    .map((num) => Number(num));

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let result = null;

const seeds = splitIntoNumbers(lines[0].split(":")[1]);
seeds.forEach((seed) => {
  let value = seed;
  let newValue = null;

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    if (lines[i].includes(" map")) {
      value = newValue != null ? newValue : value;
      newValue = null;
      continue;
    }

    const [destinationStart, sourceStart, range] = splitIntoNumbers(lines[i]);
    if (
      value >= sourceStart &&
      value < sourceStart + range &&
      newValue == null
    ) {
      newValue = destinationStart + (value - sourceStart);
    }
  }

  value = newValue != null ? newValue : value;
  result = result != null ? Math.min(value, result) : value;
});

console.log(result);
