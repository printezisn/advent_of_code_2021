const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const totalCards = {};

lines.forEach((line, card) => {
  const [winningNumbers, myNumbers] = line.split(":")[1].split("|");
  const hash = {};
  let total = 0;

  winningNumbers.split(" ").forEach((num) => {
    if (num) hash[num] = true;
  });
  myNumbers.split(" ").forEach((num) => {
    if (hash[num]) total++;
  });

  totalCards[card] = (totalCards[card] || 0) + 1;
  for (let i = card + 1; i <= card + total && i < lines.length; i++) {
    totalCards[i] = (totalCards[i] || 0) + totalCards[card];
  }
});

const result = Object.values(totalCards).reduce((sum, total) => sum + total, 0);

console.log(result);
