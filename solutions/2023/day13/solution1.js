const fs = require("fs");

const checkReflection = (arr, i) => {
  if (arr[i] !== arr[i + 1]) return false;

  for (let j = 1; i - j >= 0 && i + 1 + j < arr.length; j++) {
    if (arr[i - j] !== arr[i + 1 + j]) {
      return false;
    }
  }

  return true;
};

const findReflectionPoint = (rows, columns) => {
  for (let i = 0; i < rows.length - 1; i++) {
    if (checkReflection(rows, i)) {
      return { type: "row", index: i, score: 100 * (i + 1) };
    }
  }

  for (let i = 0; i < columns.length - 1; i++) {
    if (checkReflection(columns, i)) {
      return { type: "column", index: i, score: i + 1 };
    }
  }

  return null;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

for (let row = 0; row < lines.length; row++) {
  let limit;

  for (limit = row; limit < lines.length && lines[limit]; limit++);

  const rows = lines.slice(row, limit);
  const columns = [...Array(rows[0].length)].map((_, i) => {
    return rows.map((row) => row[i]).join("");
  });

  total += findReflectionPoint(rows, columns).score;

  row = limit;
}

console.log(total);
