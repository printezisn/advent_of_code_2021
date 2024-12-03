import fs from "fs";

const line = fs.readFileSync("./input.txt").toString();
const regex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;
let enabled = true;

const result = line.match(regex).reduce((sum, m) => {
  if (m === "do()") {
    enabled = true;
    return sum;
  }
  if (m === "don't()") {
    enabled = false;
    return sum;
  }

  if (!enabled) return sum;

  return (
    sum +
    m
      .match(/\d+/g)
      .map(Number)
      .reduce((mul, n) => mul * n, 1)
  );
}, 0);

console.log(result);
