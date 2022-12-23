const fs = require('fs');
const path = require('path');

const findRootNumber = (operations, name = 'root', cache = {}) => {
  const monkey = operations[name];

  if (monkey.kind === 'n') return monkey.value;
  if (cache[name] != null) return cache[name];

  const leftValue = findRootNumber(operations, monkey.operands[0], cache);
  const rightValue = findRootNumber(operations, monkey.operands[1], cache);

  let value = null;

  if (monkey.kind === '+') value = leftValue + rightValue;
  else if (monkey.kind === '-') value = leftValue - rightValue;
  else if (monkey.kind === '*') value = leftValue * rightValue;
  else if (monkey.kind === '/') value = leftValue / rightValue;
  else throw new Error('Invalid operation');

  cache[name] = value;

  return value;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n').map(line => line.trim());
const operations = {};

lines.forEach(line => {
  let match = line.match(/^(\w+):\s*(\d+)$/);
  if (match) {
    operations[match[1]] = { kind: 'n', value: Number(match[2]) };
    return;
  }

  match = line.match(/^(\w+):\s+(\w+)\s*([\+\-\*\/])\s*(\w+)$/);
  if (match) {
    operations[match[1]] = { kind: match[3], operands: [match[2], match[4]] }
  } else {
    throw new Error('Invalid line')
  }
});

console.log(findRootNumber(operations));