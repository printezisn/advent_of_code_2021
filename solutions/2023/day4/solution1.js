const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let result = 0;

lines.forEach((line) => {
  const [winningNumbers, myNumbers] = line.split(":")[1].split("|");
  const hash = {};
  let total = 0;

  winningNumbers.split(" ").forEach((num) => {
    if (num) hash[num] = true;
  });
  myNumbers.split(" ").forEach((num) => {
    if (hash[num]) total++;
  });

  if (total > 0) result += Math.pow(2, total - 1);
});

console.log(result);
