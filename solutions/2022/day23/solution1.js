const fs = require('fs');
const path = require('path');

const calculateRectangle = (elves) => {
  const rectangle = Array(4).fill(null);

  for (const elf in elves) {
    const [i, j] = elves[elf];

    rectangle[0] = rectangle[0] != null ? Math.min(rectangle[0], j) : j;
    rectangle[2] = rectangle[2] != null ? Math.max(rectangle[2], j) : j;
    rectangle[1] = rectangle[1] != null ? Math.min(rectangle[1], i) : i;
    rectangle[3] = rectangle[3] != null ? Math.max(rectangle[3], i) : i;
  }

  return rectangle;
};

const canMove = (elves, allPositions, i, j) => {
  return allPositions.some(([x, y]) => elves[[i + x, j + y].toString()]);
}
const isValidMove = (elves, move, i, j) => {
  for (let k = 1; k < move.length; k++) {
    if (elves[[i + move[k][0], j + move[k][1]].toString()]) return false;
  }

  return true;
}

const visualize = (elves, rectangle) => {
  for (let i = rectangle[1]; i <= rectangle[3]; i++) {
    for (let j = rectangle[0]; j <= rectangle[2]; j++) {
      process.stdout.write(elves[[i, j].toString()] ? '#' : '.');
    }

    process.stdout.write('\n');
  }
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let elves = {};

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '.') continue;

    elves[[i, j].toString()] = [i, j];
  }
}

const allPositions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]
const moves = [
  [[-1, 0], [-1, -1], [-1, 0], [-1, 1]],
  [[1, 0], [1, -1], [1, 0], [1, 1]],
  [[0, -1], [-1, -1], [0, -1], [1, -1]],
  [[0, 1], [-1, 1], [0, 1], [1, 1]]
];

for (let i = 0; i < 10; i++) {
  const newElfPositions = {};
  const newPositionElves = {};

  for (const elfPos in elves) {
    const elf = elves[elfPos];

    if (!canMove(elves, allPositions, elf[0], elf[1])) continue;

    const move = moves.find(m => isValidMove(elves, m, elf[0], elf[1]));
    if (!move) continue;

    const newPosition = [elf[0] + move[0][0], elf[1] + move[0][1]];

    newElfPositions[elf.toString()] = newPosition;
    newPositionElves[newPosition.toString()] = newPositionElves[newPosition.toString()] || [];
    newPositionElves[newPosition.toString()].push(elf);
  }

  for (const elfPos in newPositionElves) {
    if (newPositionElves[elfPos].length === 1) continue;

    newPositionElves[elfPos].forEach(elf => {
      delete newElfPositions[elf.toString()];
    });
  }

  const newElves = {};

  for (const elfPos in elves) {
    if (newElfPositions[elfPos]) {
      newElves[newElfPositions[elfPos].toString()] = newElfPositions[elfPos];
    } else {
      newElves[elfPos] = elves[elfPos];
    }
  }

  elves = newElves;

  moves.push(moves[0]);
  moves.shift();
}

const rectangle = calculateRectangle(elves);

visualize(elves, rectangle);

let totalEmptyTiles = 0;

for (let i = rectangle[1]; i <= rectangle[3]; i++) {
  for (let j = rectangle[0]; j <= rectangle[2]; j++) {
    if (!elves[[i, j].toString()]) totalEmptyTiles++;
  }
}

console.log(totalEmptyTiles);
