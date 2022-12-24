const fs = require('fs');
const path = require('path');

const getInitialPosition = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '.') return [i, j, 0];
    }
  }
}

const turn = ([i, j, facing], instruction) => {
  if (instruction === 'R') return [i, j, (facing + 1) % 4];
  if (facing === 0) return [i, j, 3];

  return [i, j, facing - 1];
}

const getNextPosition = ([i, j, facing]) => {
  if (facing === 0) return [i, j + 1, facing];
  if (facing === 1) return [i + 1, j, facing];
  if (facing === 2) return [i, j - 1, facing];

  return [i - 1, j, facing];
};

const getNextPositionWithRules = (board, pos) => {
  let nextPos = getNextPosition(pos);
  if (board[nextPos[0]]?.[nextPos[1]] === '.') return nextPos;
  if (board[nextPos[0]]?.[nextPos[1]] === '#') return null;

  let turnPos = turn(turn(pos, 'R'), 'R');
  while (board[turnPos[0]]?.[turnPos[1]] === '#' || board[turnPos[0]]?.[turnPos[1]] === '.') {
    turnPos = getNextPosition(turnPos);
  }

  nextPos = turn(turn(turnPos, 'R'), 'R');
  nextPos = getNextPosition(nextPos);
  if (board[nextPos[0]]?.[nextPos[1]] === '#') return null;

  return nextPos;
};

const prepareInstructions = instructionsLine => {
  const instructions = [];
  let currentNum = [];

  for (let i = 0; i < instructionsLine.length; i++) {
    if (instructionsLine[i] === 'R' || instructionsLine[i] === 'L') {
      if (currentNum.length > 0) instructions.push(Number(currentNum.join('')));

      instructions.push(instructionsLine[i]);
      currentNum = [];
    } else {
      currentNum.push(instructionsLine[i]);
    }
  }

  if (currentNum.length > 0) {
    instructions.push(Number(currentNum.join('')));
  }

  return instructions;
};

const visualize = (board, [y, x, facing]) => {
  const facingSymbols = ['>', 'v', '<', '^'];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      process.stdout.write((i === y && j === x) ? facingSymbols[facing] : board[i][j]);
    }

    console.log();
  }
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const board = lines.slice(0, lines.length - 2);
const instructions = prepareInstructions(lines[lines.length - 1]);

let pos = getInitialPosition(board);
instructions.forEach(instruction => {
  if (instruction === 'L' || instruction === 'R') {
    pos = turn(pos, instruction);
    return;
  }

  for (let i = 0; i < instruction; i++) {
    const nextPos = getNextPositionWithRules(board, pos);
    if (!nextPos) return;

    pos = nextPos;
  }
});

visualize(board, pos);

console.log(1000 * (pos[0] + 1) + 4 * (pos[1] + 1) + pos[2]);
