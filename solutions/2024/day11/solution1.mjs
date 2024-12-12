import fs from "fs";
import path from "path";

const findDigits = (num) => {
  let total = 0;

  while (num > 0) {
    total++;
    num = Math.floor(num / 10);
  }

  return total;
};

const findTotalStones = (stone, totalBlinks, dp) => {
  if (totalBlinks === 0) return 1;

  const key = [stone, totalBlinks].toString();
  if (dp[key] != null) return dp[key];

  if (stone === 0) {
    return (dp[key] = findTotalStones(1, totalBlinks - 1, dp));
  }

  const totalDigits = findDigits(stone);
  if (totalDigits % 2 === 1) {
    return (dp[key] = findTotalStones(stone * 2024, totalBlinks - 1, dp));
  }

  const pointer = 10 ** (totalDigits / 2);

  return (dp[key] =
    findTotalStones(Math.floor(stone / pointer), totalBlinks - 1, dp) +
    findTotalStones(stone % pointer, totalBlinks - 1, dp));
};

const line = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim();
const stones = line.split(" ").map(Number);

const totalBlinks = 25;
const dp = {};

let total = 0;
stones.forEach((stone) => {
  total += findTotalStones(stone, totalBlinks, dp);
});

console.log(total);
