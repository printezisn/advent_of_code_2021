const fs = require('fs');
const path = require('path');

const isAdjacent = (head, tail) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

let head = [0, 0], tail = [0, 0];
const visited = { [[0, 0].toString()]: true };

lines.forEach(line => {
  const [move, numStr] = line.trim().split(' ');
  const num = Number(numStr);

  if (move === 'R') {
    head[0] += num;
  } else if (move === 'U') {
    head[1] -= num;
  } else if (move === 'L') {
    head[0] -= num;
  } else if (move === 'D') {
    head[1] += num;
  }

  if (isAdjacent(head, tail)) return;

  while (head[1] < tail[1] - 1) {
    if (head[0] !== tail[0]) {
      tail[0] = head[0];
    }

    tail[1]--;
    visited[tail.toString()] = true;
  }
  while (head[1] > tail[1] + 1) {
    if (head[0] !== tail[0]) {
      tail[0] = head[0];
    }

    tail[1]++;
    visited[tail.toString()] = true;
  }
  while (head[0] > tail[0] + 1) {
    if (head[1] !== tail[1]) {
      tail[1] = head[1];
    }

    tail[0]++;
    visited[tail.toString()] = true;
  }
  while (head[0] < tail[0] - 1) {
    if (head[1] !== tail[1]) {
      tail[1] = head[1];
    }

    tail[0]--;
    visited[tail.toString()] = true;
  }
});

console.log(Object.keys(visited).length);