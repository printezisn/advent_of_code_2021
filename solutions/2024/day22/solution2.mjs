import fs from "fs";
import path from "path";

const TOTAL_TIMES = 2000;
const MODULO = (1 << 24) - 1;

const createPriceSequence = (current) => {
  const numSequence = [current % 10];
  const priceSequence = new Map();

  for (let time = 1; time < TOTAL_TIMES; time++) {
    current = ((current ^ (current << 6)) & MODULO) >>> 0;
    current = ((current ^ (current >> 5)) & MODULO) >>> 0;
    current = ((current ^ (current << 11)) & MODULO) >>> 0;
    numSequence.push(current % 10);

    if (time < 4) continue;

    const value1 = numSequence[time - 3] - numSequence[time - 4];
    const value2 = numSequence[time - 2] - numSequence[time - 3];
    const value3 = numSequence[time - 1] - numSequence[time - 2];
    const value4 = numSequence[time] - numSequence[time - 1];
    const key = [value1, value2, value3, value4].toString();
    if (!priceSequence.has(key)) {
      priceSequence.set(key, numSequence[time]);
    }
  }

  return priceSequence;
};

const nums = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Number(line.trim()));

const priceSequences = nums.map(createPriceSequence);
let result = -Infinity;

for (let s1 = -9; s1 <= 9; s1++) {
  for (let s2 = -9; s2 <= 9; s2++) {
    for (let s3 = -9; s3 <= 9; s3++) {
      for (let s4 = -9; s4 <= 9; s4++) {
        const key = [s1, s2, s3, s4].toString();
        let total = 0;

        priceSequences.forEach((sequence) => {
          total += sequence.get(key) ?? 0;
        });

        result = Math.max(result, total);
      }
    }
  }
}

console.log(result);
