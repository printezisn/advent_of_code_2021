const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let max = 0, current = 0;

lines.forEach(line => {
  const calories = line.trim();

  if (calories) {
    current += Number(calories);
    if (current > max) {
      max = current;
    }
  } else {
    current = 0;
  }
});

console.log(max);