const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let total = 0;

lines.forEach(line => {
  const [range1, range2] = line.split(',');
  const [range1Start, range1End] = range1.split('-').map(Number);
  const [range2Start, range2End] = range2.split('-').map(Number);

  if (range1Start >= range2Start && range1End <= range2End) {
    total++;
  } else if (range2Start >= range1Start && range2End <= range1End) {
    total++;
  }
})

console.log(total);