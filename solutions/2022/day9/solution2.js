const fs = require('fs');
const path = require('path');

const isAdjacent = (head, tail) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
}

const moveTail = (head, tail) => {
  if (isAdjacent(head, tail)) return;

  if (tail[0] === head[0]) {
    tail[1] = (head[1] < tail[1]) ? (head[1] + 1) : (head[1] - 1);
  } else if (tail[1] === head[1]) {
    tail[0] = (head[0] < tail[0]) ? (head[0] + 1) : (head[0] - 1);
  } else if (head[1] < tail[1] && head[0] > tail[0]) {
    tail[0]++;
    tail[1]--;
  } else if (head[1] < tail[1] && head[0] < tail[0]) {
    tail[0]--;
    tail[1]--;
  } else if (head[1] > tail[1] && head[0] > tail[0]) {
    tail[0]++;
    tail[1]++;
  } else if (head[1] > tail[1] && head[0] < tail[0]) {
    tail[0]--;
    tail[1]++;
  }
}

const moveAllTails = (tails, visited) => {
  for (let i = 1; i < tails.length; i++) {
    moveTail(tails[i - 1], tails[i], visited);
  }

  visited[tails[tails.length - 1]] = true;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');

const tails = [...Array(10)].map(() => [0, 0]);
const visited = { [[0, 0].toString()]: true };

lines.forEach(line => {
  const [move, numStr] = line.trim().split(' ');
  const num = Number(numStr);

  for (let i = 0; i < num; i++) {
    if (move === 'R') tails[0][0]++;
    else if (move === 'U') tails[0][1]--;
    else if (move === 'L') tails[0][0]--;
    else if (move === 'D') tails[0][1]++;

    moveAllTails(tails, visited);
  }
});

console.log(Object.keys(visited).length);
