import fs from "fs";

let result = 0;

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const numbers = line.trim().split(" ").filter(Boolean).map(Number);
    const asc = numbers[1] > numbers[0];
    let i;

    for (i = 1; i < numbers.length; i++) {
      const diff = Math.abs(numbers[i] - numbers[i - 1]);
      const valid =
        numbers[i] > numbers[i - 1] === asc && diff >= 1 && diff <= 3;
      if (!valid) break;
    }

    if (i === numbers.length) {
      result++;
    }
  });

console.log(result);
