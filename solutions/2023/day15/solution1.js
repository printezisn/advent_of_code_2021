const fs = require("fs");

const computeHash = (str) => {
  let total = 0;

  [...str].forEach((ch) => {
    total += ch.charCodeAt(0);
    total *= 17;
    total %= 256;
  });

  return total;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  line
    .split(",")
    .filter(Boolean)
    .forEach((sequence) => {
      total += computeHash(sequence);
    });
});

console.log(total);
