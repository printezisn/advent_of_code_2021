import fs from "fs";
import path from "path";

const findStartAndCycle = (a, b, s) => {
  let start = -1;
  let cycle = -1;
  const mods = new Set();

  for (let i = 0; ; i++) {
    const n = s - a * i;
    const mod = n % b;

    if (mods.has(mod) && start === -1) {
      break;
    }

    mods.add(mod);
    if (mod !== 0) continue;

    if (start === -1) {
      start = i;
    } else {
      cycle = i - start;
      break;
    }
  }

  return [start, cycle];
};

const calculateMinTokens = (machine) => {
  const [start, cycle] = findStartAndCycle(
    machine.button1[0],
    machine.button2[0],
    machine.prize[0]
  );
  if (start === -1) return 0;

  for (let i = start; ; i += cycle) {
    const times =
      (machine.prize[0] - i * machine.button1[0]) / machine.button2[0];
    if (times < 0) return 0;

    const n = i * machine.button1[1] + times * machine.button2[1];

    if (n === machine.prize[1]) {
      return i * 3 + times;
    }
  }
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
const machines = [];
let total = 0;

for (let i = 0; i < lines.length; i += 4) {
  machines.push({
    button1: lines[i].match(/(\d+)/g).map(Number),
    button2: lines[i + 1].match(/(\d+)/g).map(Number),
    prize: lines[i + 2].match(/(\d+)/g).map(Number),
  });
}

machines.forEach((machine) => {
  const tokens = calculateMinTokens(machine);
  total += tokens;
});

console.log(total);
