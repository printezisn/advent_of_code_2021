const fs = require('fs');

const checkIfAccepted = (instructions, part) => {
  let instructionName = 'in';

  while (instructionName !== 'A' && instructionName !== 'R') {
    for (let i = 0; i < instructions[instructionName].length; i++) {
      const condition = instructions[instructionName][i];

      if (!condition.variable) {
        instructionName = condition.nextInstruction;
        break;
      }

      const value = part[condition.variable];
      const isTrue = condition.type === 'greater'
        ? (value > condition.value)
        : (value < condition.value);

      if (isTrue) {
        instructionName = condition.nextInstruction;
        break;
      }
    }
  }

  return instructionName === 'A';
};

const lines = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(line => line.trim().replace(/ /g, ''));
const instructions = {};
const parts = [];
let i;

for (i = 0; lines[i]; i++) {
  let match = lines[i].match(/^(\w+)\{(.*)\}$/);
  const name = match[1];
  const conditions = [];

  match[2].split(',').forEach(p => {
    if (!p.includes(':')) {
      conditions.push({ nextInstruction: p });
      return;
    }

    const [condition, nextInstruction] = p.split(':');
    const type = condition.includes('>') ? 'greater' : 'lower';
    const variable = condition[0];
    const value = Number(condition.substring(2));

    conditions.push({ type, variable, value, nextInstruction });
  });

  instructions[name] = conditions;
}

for (i++; i < lines.length; i++) {
  const match = lines[i].match(/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}$/);
  parts.push({
    x: Number(match[1]),
    m: Number(match[2]),
    a: Number(match[3]),
    s: Number(match[4])
  });
}

let total = 0;

parts.forEach(part => {
  if (checkIfAccepted(instructions, part)) {
    total += part.x + part.m + part.a + part.s;
  }
});

console.log(total);