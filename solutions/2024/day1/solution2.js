const fs = require("fs");

const leftArr = [];
const frequency = new Map();

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const [num1, num2] = line.trim().split(" ").filter(Boolean).map(Number);

    leftArr.push(num1);
    frequency.set(num2, (frequency.get(num2) ?? 0) + 1);
  });

let result = 0;

leftArr.forEach((num) => {
  result += num * (frequency.get(num) ?? 0);
});

console.log(result);
