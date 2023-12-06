const fs = require("fs");

const splitIntoNumbers = (num) =>
  num
    .split(" ")
    .map((num) => num.trim())
    .filter((num) => num)
    .map((num) => Number(num));

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const times = splitIntoNumbers(lines[0].split(":")[1]);
const distances = splitIntoNumbers(lines[1].split(":")[1]);

let result = 1;

times.forEach((time, i) => {
  let totalWays = 0;

  for (let speed = 0; speed <= time; speed++) {
    const distance = speed * (time - speed);
    if (distance > distances[i]) {
      totalWays++;
    } else if (totalWays > 0) {
      break;
    }
  }

  result *= totalWays;
});

console.log(result);
