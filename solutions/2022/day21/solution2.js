const fs = require('fs');
const path = require('path');

const getOperandValues = (operations, expectedValue, monkey, cache) => {
  let leftValue = findRootNumber(operations, null, monkey.operands[0], cache);
  let rightValue = findRootNumber(operations, null, monkey.operands[1], cache);

  if (leftValue != null && rightValue != null) return [leftValue, rightValue];
  if (expectedValue == null && (leftValue == null || rightValue == null)) return null;

  if (leftValue == null) {
    if (monkey.kind === '+') {
      leftValue = findRootNumber(operations, expectedValue - rightValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue - rightValue, monkey.operands[1], cache);
    } else if (monkey.kind === '-') {
      leftValue = findRootNumber(operations, expectedValue + rightValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue + rightValue, monkey.operands[1], cache);
    } else if (monkey.kind === '*') {
      leftValue = findRootNumber(operations, expectedValue / rightValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue / rightValue, monkey.operands[1], cache);
    } else if (monkey.kind === '/') {
      leftValue = findRootNumber(operations, expectedValue * rightValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue * rightValue, monkey.operands[1], cache);
    }
  } else {
    if (monkey.kind === '+') {
      leftValue = findRootNumber(operations, expectedValue - leftValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue - leftValue, monkey.operands[1], cache);
    } else if (monkey.kind === '-') {
      leftValue = findRootNumber(operations, leftValue - expectedValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, leftValue - expectedValue, monkey.operands[1], cache);
    } else if (monkey.kind === '*') {
      leftValue = findRootNumber(operations, expectedValue / leftValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, expectedValue / leftValue, monkey.operands[1], cache);
    } else if (monkey.kind === '/') {
      leftValue = findRootNumber(operations, leftValue / expectedValue, monkey.operands[0], cache);
      rightValue = findRootNumber(operations, leftValue / expectedValue, monkey.operands[1], cache);
    }
  }

  return [leftValue, rightValue];
};

const findRootNumber = (operations, expectedValue = null, name = 'root', cache = {}) => {
  const monkey = operations[name];

  if (name === 'humn') {
    if (expectedValue != null) console.log(expectedValue);
    return expectedValue;
  }
  if (monkey.kind === 'n') return monkey.value;

  if (cache[name] != null) return cache[name];

  const values = getOperandValues(operations, expectedValue, monkey, cache);
  if (values == null) return null;

  const [leftValue, rightValue] = values;

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

const rightValue = findRootNumber(operations, null, operations['root'].operands[1]);
findRootNumber(operations, rightValue, operations['root'].operands[0]);