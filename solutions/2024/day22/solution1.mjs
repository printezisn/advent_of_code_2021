import fs from "fs";
import path from "path";

const TOTAL_TIMES = 2000;
const MODULO = (1 << 24) - 1;

const nums = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Number(line.trim()));

let result = 0;

nums.forEach((num) => {
  let current = num;

  for (let time = 0; time < TOTAL_TIMES; time++) {
    current = ((current ^ (current << 6)) & MODULO) >>> 0;
    current = ((current ^ (current >> 5)) & MODULO) >>> 0;
    current = ((current ^ (current << 11)) & MODULO) >>> 0;
  }

  result += current;
});

console.log(result);
