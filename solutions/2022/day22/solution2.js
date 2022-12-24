const fs = require('fs');
const path = require('path');

const getInitialPosition = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '.') return [i, j, 0];
    }
  }
};

const isInCube = (cube, [y, x]) => {
  return (
    cube.cols[0] <= x && x <= cube.cols[1] &&
    cube.rows[0] <= y && y <= cube.rows[1]
  );
};

const findCubeNumber = (cubes, pos) => {
  for (let i = 0; i < cubes.length; i++) {
    if (isInCube(cubes[i], pos)) return i;
  }
};

const turn = ([i, j, facing], instruction) => {
  if (instruction === 'R') return [i, j, (facing + 1) % 4];
  if (facing === 0) return [i, j, 3];

  return [i, j, facing - 1];
};

const getNextPosition = ([i, j, facing]) => {
  if (facing === 0) return [i, j + 1, facing];
  if (facing === 1) return [i + 1, j, facing];
  if (facing === 2) return [i, j - 1, facing];

  return [i - 1, j, facing];
};

const getNextPositionWithRules = (board, cubes, pos) => {
  let nextPos = getNextPosition(pos);
  if (board[nextPos[0]]?.[nextPos[1]] === '.') return nextPos;
  if (board[nextPos[0]]?.[nextPos[1]] === '#') return null;

  const cubeNum = findCubeNumber(cubes, pos);
  const cube = cubes[cubeNum];
  
  nextPos = cube.warp(pos);

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

const visualizeCubes = (board, cubes) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      process.stdout.write(board[i][j] === ' ' ? ' ' : (findCubeNumber(cubes, [i, j]) + 1).toString());   
    }
  
    console.log();
  }
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const board = lines.slice(0, lines.length - 2);
const instructions = prepareInstructions(lines[lines.length - 1]);

const cubes = [
  {
    rows: [0, 49],
    cols: [50, 99],
    warp: ([y, x, facing]) => ([
      null,
      null,
      [100 + (49 - y), 0, 0], // 3
      [150 + (x - 50), 0, 0] // 2
    ][facing]) 
  },
  {
    rows: [150, 199],
    cols: [0, 49],
    warp: ([y, x, facing]) => ([
      [149, 50 + (y - 150), 3], // 5
      [0, 100 + x, 1], // 6
      [0, 50 + (y - 150), 1], // 1
      null
    ][facing]) 
  },
  {
    rows: [100, 149],
    cols: [0, 49],
    warp: ([y, x, facing]) => ([
      null,
      null,
      [149 - y, 50, 0], // 1
      [50 + x, 50, 0], // 4
    ][facing]) 
  },
  {
    rows: [50, 99],
    cols: [50, 99],
    warp: ([y, _, facing]) => ([
      [49, 100 + (y - 50), 3], // 6
      null,
      [100, y - 50, 1], // 3
      null
    ][facing]) 
  },
  {
    rows: [100, 149],
    cols: [50, 99],
    warp: ([y, x, facing]) => ([
      [149 - y, 149, 2], // 6
      [150 + (x - 50), 49, 2], // 2
      null,
      null
    ][facing]) 
  },
  {
    rows: [0, 49],
    cols: [100, 149],
    warp: ([y, x, facing]) => ([
      [100 + (49 - y), 99, 2], // 5
      [50 + (x - 100), 99, 2], // 4
      null,
      [199, x - 100, 3], // 2
    ][facing]) 
  }
];

let pos = getInitialPosition(board);
instructions.forEach((instruction, i) => {
  if (instruction === 'L' || instruction === 'R') {
    pos = turn(pos, instruction);
    return;
  }

  for (let i = 0; i < instruction; i++) {
    const nextPos = getNextPositionWithRules(board, cubes, pos);
    if (!nextPos) return;

    pos = nextPos;
  }
});

console.log(1000 * (pos[0] + 1) + 4 * (pos[1] + 1) + pos[2]);