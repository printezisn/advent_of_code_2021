const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let caloriesPerElf = [], current = 0;

lines.forEach(line => {
  const calories = line.trim();

  if (calories) {
    current += Number(calories);
  } else {
    caloriesPerElf.push(current);
    current = 0;
  }
});

caloriesPerElf.push(current);
caloriesPerElf.sort((a, b) => b - a);

console.log(caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]);