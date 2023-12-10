const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const earliestStart = Number(lines[0]);
const buses = lines[1]
  .split(",")
  .filter((b) => b && b !== "x")
  .map((b) => Number(b));

let minMinutes = null;
let winningBus = null;

buses.forEach((bus) => {
  let earliestTime = bus;
  for (let i = 2; earliestTime < earliestStart; i++) {
    earliestTime = bus * i;
  }

  const diff = earliestTime - earliestStart;

  if (minMinutes == null || diff < minMinutes) {
    minMinutes = diff;
    winningBus = bus;
  }
});

console.log(minMinutes * winningBus);
