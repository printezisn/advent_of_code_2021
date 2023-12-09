const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let result = 0;

lines.forEach((line) => {
  let sequence = line
    .split(" ")
    .filter((num) => num)
    .map((num) => Number(num));

  while (true) {
    const newSequence = [];
    let hasNonZeroes = false;

    result += sequence[sequence.length - 1];

    for (let i = 1; i < sequence.length; i++) {
      const num = sequence[i] - sequence[i - 1];
      newSequence.push(num);
      if (num !== 0) {
        hasNonZeroes = true;
      }
    }

    sequence = newSequence;
    if (!hasNonZeroes) break;
  }
});

console.log(result);
