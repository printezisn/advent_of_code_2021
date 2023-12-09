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
  let index = 0;

  while (true) {
    const newSequence = [];
    let hasNonZeroes = false;

    if (index % 2 === 0) {
      result += sequence[0];
    } else {
      result -= sequence[0];
    }

    for (let i = 1; i < sequence.length; i++) {
      const num = sequence[i] - sequence[i - 1];
      newSequence.push(num);
      if (num !== 0) {
        hasNonZeroes = true;
      }
    }

    sequence = newSequence;
    if (!hasNonZeroes) break;

    index++;
  }
});

console.log(result);
