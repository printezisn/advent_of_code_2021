const fs = require('fs');

const findTotalAccepted = (instructions, part, instructionName = 'in') => {
  if (instructionName === 'R') return 0;
  if (instructionName === 'A') {
    return (
      (part.x[1] - part.x[0] + 1) *
      (part.m[1] - part.m[0] + 1) *
      (part.a[1] - part.a[0] + 1) *
      (part.s[1] - part.s[0] + 1)
    );
  }

  let total = 0;

  for (let i = 0; i < instructions[instructionName].length; i++) {
    const condition = instructions[instructionName][i];
    if (!condition.variable) {
      total += findTotalAccepted(instructions, part, condition.nextInstruction);
      break;
    }

    const newPart = { ...part };
    const range = newPart[condition.variable];

    if (condition.type === 'greater' && condition.value < range[1]) {
      newPart[condition.variable] = [condition.value + 1, range[1]];
      total += findTotalAccepted(instructions, newPart, condition.nextInstruction);

      if (condition.value < range[0]) break;
      part[condition.variable] = [range[0], condition.value];
    } else if (condition.type === 'lower' && condition.value > range[0]) {
      newPart[condition.variable] = [range[0], condition.value - 1];
      total += findTotalAccepted(instructions, newPart, condition.nextInstruction);

      if (condition.value > range[1]) break;
      part[condition.variable] = [condition.value, range[1]];
    }
  }

  return total;
};

const lines = fs
  .readFileSync('./input.txt')
  .toString()
  .split('\n')
  .map(line => line.trim().replace(/ /g, ''));
const instructions = {};

for (let i = 0; lines[i]; i++) {
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

const total = findTotalAccepted(instructions, {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000]
});

console.log(total);