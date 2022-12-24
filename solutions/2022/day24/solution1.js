const fs = require('fs');
const path = require('path');

const getNewPosition = (board, i, j, symbol) => {
  switch (symbol) {
    case '^':
      return i === 0 ? [board.length - 1, j] : [i - 1, j];
    case '>':
      return [i, (j + 1) % board[i].length];
    case '<':
      return j === 0 ? [i, board[i].length - 1] : [i, j - 1];
    default:
      return [(i + 1) % board.length, j];
  }
};

const moveBlizzards = board => {
  const newBoard = Array.from({ length: board.length }, (_, i) =>
    Array.from({ length: board[i].length }, () => []))

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      for (let k = 0; k < board[i][j].length; k++) {
        const newPos = getNewPosition(board, i, j, board[i][j][k]);
        newBoard[newPos[0]][newPos[1]] = newBoard[newPos[0]][newPos[1]] || [];
        newBoard[newPos[0]][newPos[1]].push(board[i][j][k]);
      }
    }
  }

  return newBoard;
};

const getEmptySpots = board => {
  const emptySpots = [[-1, 0], [board.length, board[0].length - 1]];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].length === 0) emptySpots.push([i, j]);
    }
  }

  return emptySpots;
};

const calculateDifferentStates = board => {
  let states = [getEmptySpots(board)];
  let initialState = JSON.stringify(states[0]);
  let currentBoard = board;
  let currentState = null;

  while (currentState !== initialState) {
    currentBoard = moveBlizzards(currentBoard);
    const emptySpots = getEmptySpots(currentBoard);
    currentState = JSON.stringify(emptySpots);

    if (currentState !== initialState) {
      states.push(emptySpots);
    }
  }

  return states;
};

const isValidMove = (pos, spot) => {
  return (Math.abs(pos[0] - spot[0]) + Math.abs(pos[1] - spot[1])) <= 1;
};

const calculateMinSteps = (states, currentSteps, pos, destination) => {
  const spotsToVisit = [[currentSteps, pos]], visitedSpots = {};

  while (spotsToVisit.length) {
    const spot = spotsToVisit.shift();
    const [totalSteps, pos] = spot;
  
    if (pos[0] === destination[0] && pos[1] === destination[1]) return totalSteps;
  
    const stateNum = (totalSteps + 1) % states.length;
    const state = states[stateNum];
    const spots = [...state];
    
    spots.forEach(spot => {
      if (!isValidMove(pos, spot)) return;
  
      const newStateNum = (totalSteps + 2) % states.length;
      const key = [newStateNum, spot].toString();
      if (visitedSpots[key]) return;
  
      visitedSpots[key] = true;
      spotsToVisit.push([totalSteps + 1, spot]);
    });
  }
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const board = [];

for (let i = 1; i < lines.length - 1; i++) {
  board.push([]);

  for (let j = 1; j < lines[i].length - 1; j++) {
    board[i - 1].push(lines[i][j] === '.' ? [] : [lines[i][j]]);
  }
}

const states = calculateDifferentStates(board);
const totalSteps = calculateMinSteps(states, 0, [-1, 0], [board.length, board[0].length - 1]);

console.log(totalSteps);