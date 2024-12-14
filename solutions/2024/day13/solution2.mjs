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

const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
};

const findCommonTermAndCycle = (seq1, seq2) => {
  let term1 = seq1[0];
  let term2 = seq2[0];
  let start = -1;
  let cycle = -1;

  while (true) {
    if (term1 === term2) {
      if (start === -1) {
        start = term1;
      } else {
        cycle = term1 - start;
        break;
      }
    }
    if (term1 < term2) {
      term1 += seq1[1];
    } else {
      term2 += seq2[1];
    }
  }

  return [start, cycle];
};

const calculateMinTokens = (machine) => {
  const [start1, cycle1] = findStartAndCycle(
    machine.button1[0],
    machine.button2[0],
    machine.prize[0]
  );
  if (start1 === -1) return 0;

  const [start2, cycle2] = findStartAndCycle(
    machine.button1[1],
    machine.button2[1],
    machine.prize[1]
  );
  if (start2 === -1) return 0;

  if (Math.abs(start1 - start2) % gcd(cycle1, cycle2) !== 0) {
    return 0;
  }

  const [start, cycle] = findCommonTermAndCycle(
    [start1, cycle1],
    [start2, cycle2]
  );

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
let total = 0n;

for (let i = 0; i < lines.length; i += 4) {
  machines.push({
    button1: lines[i].match(/(\d+)/g).map(Number),
    button2: lines[i + 1].match(/(\d+)/g).map(Number),
    prize: lines[i + 2].match(/(\d+)/g).map(Number),
  });
}

machines.forEach((machine, i) => {
  machine.prize[0] += 10000000000000;
  machine.prize[1] += 10000000000000;

  const tokens = calculateMinTokens(machine);
  total += BigInt(tokens);
  console.log(`${i + 1}/${machines.length}: ${tokens}, ${total}`);
});

console.log(total);
