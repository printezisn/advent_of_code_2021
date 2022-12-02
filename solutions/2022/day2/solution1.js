const fs = require('fs');
const path = require('path');

const selectionScore = {
  X: 1,
  Y: 2,
  Z: 3
};

const roundScore = {
  A: {
    X: 3,
    Y: 6,
    Z: 0
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3
  }
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let totalScore = 0;

lines.forEach(line => {
  const [opponentChoice, myChoice] = line.split(' ');

  totalScore += roundScore[opponentChoice][myChoice] + selectionScore[myChoice];
});

console.log(totalScore);