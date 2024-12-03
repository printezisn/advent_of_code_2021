import fs from "fs";

const line = fs.readFileSync("./input.txt").toString();
const regex = /mul\(\d+,\d+\)/g;

const result = line.match(regex).reduce((sum, m) => {
  return (
    sum +
    m
      .match(/\d+/g)
      .map(Number)
      .reduce((mul, n) => mul * n, 1)
  );
}, 0);

console.log(result);
