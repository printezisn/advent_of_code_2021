import fs from "fs";

const safe = (numbers) => {
  const asc = numbers[1] > numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    const diff = Math.abs(numbers[i] - numbers[i - 1]);
    const valid = numbers[i] > numbers[i - 1] === asc && diff >= 1 && diff <= 3;
    if (!valid) return false;
  }

  return true;
};

const safeWithRemoval = (numbers) => {
  if (safe(numbers)) return true;

  for (let i = 0; i < numbers.length; i++) {
    const [num] = numbers.splice(i, 1);
    if (safe(numbers)) return true;

    numbers.splice(i, 0, num);
  }

  return false;
};

let result = 0;

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const numbers = line.trim().split(" ").filter(Boolean).map(Number);
    if (safeWithRemoval(numbers)) result++;
  });

console.log(result);
