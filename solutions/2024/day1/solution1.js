const fs = require("fs");

const leftArr = [];
const rightArr = [];

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const [num1, num2] = line.trim().split(" ").filter(Boolean).map(Number);

    leftArr.push(num1);
    rightArr.push(num2);
  });

leftArr.sort((a, b) => Number(a) - Number(b));
rightArr.sort((a, b) => Number(a) - Number(b));

let result = 0;

for (let i = 0; i < leftArr.length; i++) {
  result += Math.abs(leftArr[i] - rightArr[i]);
}

console.log(result);
