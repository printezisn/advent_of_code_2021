const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  let firstDigit = null;
  let lastDigit = null;

  for (ch of line) {
    if (ch >= "0" && ch <= "9") {
      if (firstDigit == null) firstDigit = Number(ch);
      lastDigit = Number(ch);
    }
  }

  total += firstDigit * 10 + lastDigit;
});

console.log(total);
