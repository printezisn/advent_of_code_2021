import fs from "fs";
import path from "path";

const calculateRating = (map, index, maxRow, maxCol, dp) => {
  if (map[index] === 9) return 1;
  if (dp[index] != null) return dp[index];

  const neighbours = [
    index - maxCol >= 0 ? index - maxCol : null,
    index % maxCol !== 0 ? index - 1 : null,
    (index + 1) % maxCol !== 0 ? index + 1 : null,
    index + maxCol < maxRow * maxCol ? index + maxCol : null,
  ].filter((n) => n !== null && map[n] === map[index] + 1);

  let score = 0;

  neighbours.forEach((n) => {
    score += calculateRating(map, n, maxRow, maxCol, dp);
  });

  dp[index] = score;
  return dp[index];
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
const maxRow = lines.length;
const maxCol = lines[0].length;
const map = [];
const dp = new Set();
let result = 0;

lines.forEach((line) => {
  for (let col = 0; col < line.length; col++) {
    map.push(line[col] === "." ? 500 : Number(line[col]));
  }
});

map.forEach((num, index) => {
  if (num === 0) {
    result += calculateRating(map, index, maxRow, maxCol, dp);
  }
});

console.log(result);
