const fs = require('fs');
const path = require('path');

const roundScore = {
  A: {
    X: 3,
    Y: 4,
    Z: 8
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7
  }
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let totalScore = 0;

lines.forEach(line => {
  const [opponentChoice, myChoice] = line.split(' ');

  totalScore += roundScore[opponentChoice][myChoice];
});

console.log(totalScore);