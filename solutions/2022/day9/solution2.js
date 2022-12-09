const fs = require('fs');
const path = require('path');

const isAdjacent = (head, tail) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
}

const moveTail = (head, tail, visited) => {
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
}

const moveAllTails = (head, tails, visited) => {
  for (let i = 0; i < tails.length; i++) {
    moveTail(i === 0 ? head : tails[i - 1], tails[i], visited);
  }
  console.log(head, tails);

}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

let head = [0, 0], tails = [...Array(10)].map(() => [0, 0]);
const visited = { [[0, 0].toString()]: true };

lines.slice(0, 2).forEach(line => {
  const [move, numStr] = line.trim().split(' ');
  const num = Number(numStr);

  if (move === 'R') {
    for (let i = 0; i < num; i++) {
      head[0]++;
      moveAllTails(head, tails, visited);
    }
  } else if (move === 'U') {
    for (let i = 0; i < num; i++) {
      head[1]--;
      moveAllTails(head, tails, visited);
    }
  } else if (move === 'L') {
    for (let i = 0; i < num; i++) {
      head[0]--;
      moveAllTails(head, tails, visited);
    }
  } else if (move === 'D') {
    for (let i = 0; i < num; i++) {
      head[1]++;
      moveAllTails(head, tails, visited);
    }
  }
});
