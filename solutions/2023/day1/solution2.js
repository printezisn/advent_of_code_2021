const fs = require("fs");

const validNumbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  let firstDigit = null;
  let lastDigit = null;
  let firstDigitIndex = null;
  let lastDigitIndex = null;

  Object.keys(validNumbers).forEach((number) => {
    const firstIndex = line.indexOf(number);
    const lastIndex = line.lastIndexOf(number);

    if (
      firstIndex >= 0 &&
      (firstDigitIndex == null || firstIndex < firstDigitIndex)
    ) {
      firstDigitIndex = firstIndex;
      firstDigit = validNumbers[number];
    }
    if (
      lastIndex >= 0 &&
      (lastDigitIndex == null || lastIndex > lastDigitIndex)
    ) {
      lastDigitIndex = lastIndex;
      lastDigit = validNumbers[number];
    }
  });

  total += firstDigit * 10 + lastDigit;
});

console.log(total);
