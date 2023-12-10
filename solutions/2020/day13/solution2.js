const fs = require("fs");

const gcd = (a, b) => {
  if (b === BigInt(0)) return a;

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

const buses = lines[1]
  .split(",")
  .filter((b) => b)
  .map((b, i) => [b, i])
  .filter(([b, _]) => b !== "x")
  .map(([b, i]) => [BigInt(b), BigInt(i)]);

let start = BigInt(buses[0][1]);
let step = BigInt(buses[0][0]);
let result = start;

buses.slice(1).forEach(([bus, i]) => {
  for (let j = BigInt(0); ; j++) {
    const timestamp = start + step * j;
    if ((timestamp + i) % bus === BigInt(0)) {
      start = timestamp;
      step = lcm(step, bus);
      result = timestamp;
      break;
    }
  }
});

console.log(result);
