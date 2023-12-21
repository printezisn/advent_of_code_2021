const fs = require('fs');

let startPos;

const map = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line, i) => {
    const row = [];
    const trimmedLine = line.trim();

    for (let j = 0; j < trimmedLine.length; j++) {
      if (trimmedLine[j] === 'S') {
        startPos = [64, i, j];
        row.push('.');
      } else {
        row.push(trimmedLine[j]);
      }
    }

    return row;
  });

const nodesToVisit = [startPos];
const visitedNodes = {};
const endingNodes = {};

while (nodesToVisit.length > 0) {
  const node = nodesToVisit.shift();
  const [step, row, col] = node;

  if (visitedNodes[[row, col]] != null && visitedNodes[[row, col]] <= step) {
    continue;
  }

  visitedNodes[[row, col]] = step;
  if (step === 0) {
    endingNodes[[row, col]] = true;
    continue;
  }

  [[row - 1 , col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([newRow, newCol]) => {
    if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[newRow].length) {
      return;
    }
    if (map[newRow][newCol] === '#') return;

    nodesToVisit.push([step - 1, newRow, newCol]);
  });
}

console.log(Object.keys(endingNodes).length);
