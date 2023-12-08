const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const instructions = lines[0];
const map = {};
for (let i = 2; i < lines.length; i++) {
  const match = lines[i].match(/(\w+)\s*\=\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/);
  map[match[1]] = [match[2], match[3]];
}

let currentNode = "AAA";
let totalSteps = 0;
let instructionIndex = 0;

while (currentNode !== "ZZZ") {
  currentNode =
    instructions[instructionIndex] === "L"
      ? map[currentNode][0]
      : map[currentNode][1];
  instructionIndex = (instructionIndex + 1) % instructions.length;
  totalSteps++;
}

console.log(totalSteps);
