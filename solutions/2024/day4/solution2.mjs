import fs from "fs";

const hasWordDownRight = (word, arr, row, col, backwards) => {
  if (row + word.length - 1 >= arr.length) return false;
  if (col + word.length - 1 >= arr[row].length) return false;

  for (let i = 0; i < word.length; i++) {
    const ch = backwards ? word[word.length - 1 - i] : word[i];
    if (ch !== arr[row + i][col + i]) return false;
  }

  return true;
};

const hasWordUpRight = (word, arr, row, col, backwards) => {
  if (row - word.length + 1 < 0) return false;
  if (col + word.length - 1 >= arr[row].length) return false;

  for (let i = 0; i < word.length; i++) {
    const ch = backwards ? word[word.length - 1 - i] : word[i];
    if (ch !== arr[row - i][col + i]) return false;
  }

  return true;
};

const hasShape = (word, arr, row, col) => {
  if (row + word.length - 1 >= arr.length) return false;
  if (col + word.length - 1 >= arr[row].length) return false;

  let backwards = arr[row][col] === word[word.length - 1];
  if (!hasWordDownRight(word, arr, row, col, backwards)) return false;

  backwards = arr[row + word.length - 1][col] === word[word.length - 1];
  return hasWordUpRight(word, arr, row + word.length - 1, col, backwards);
};

const word = "MAS";
const arr = fs.readFileSync("./input.txt").toString().split("\n");
let result = 0;

for (let row = 0; row < arr.length; row++) {
  for (let col = 0; col < arr.length; col++) {
    if (arr[row][col] === word[0] || arr[row][col] === word[word.length - 1]) {
      if (hasShape(word, arr, row, col)) result++;
    }
  }
}

console.log(result);
