const fs = require("fs");

const gcd = (a, b) => {
  if (b == 0) return a;

  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

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

const startingNodes = Object.keys(map).filter((n) => n.endsWith("A"));
let lcms = [BigInt(1)];

for (let i = 0; i < startingNodes.length; i++) {
  let instructionIndex = 0;
  let step = 0;
  let currentNode = startingNodes[i];
  const found = {};
  const findings = [];

  while (!found[`${instructionIndex} ${currentNode}`]) {
    found[`${instructionIndex} ${currentNode}`] = true;

    if (currentNode.endsWith("Z")) {
      findings.push(BigInt(step));
      break;
    }

    currentNode =
      instructions[instructionIndex] === "L"
        ? map[currentNode][0]
        : map[currentNode][1];

    step++;
    instructionIndex = (instructionIndex + 1) % instructions.length;
  }

  const newLcms = [];
  findings.forEach((f) => {
    lcms.forEach((l) => {
      newLcms.push(lcm(f, l));
    });
  });

  lcms = newLcms;
}

const result = lcms.reduce(
  (min, l) => (min == null ? l : Math.min(min, l)),
  null
);

console.log(result);
