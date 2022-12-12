const fs = require('fs');
const path = require('path');

const getElevation = (ch) => {
  if (ch === 'S') return 0;
  if (ch === 'E') return 'z'.charCodeAt(0) - 'a'.charCodeAt(0);

  return ch.charCodeAt(0) - 'a'.charCodeAt(0);
}

const calculateMinSteps = (grid, startPosition, endPosition) => {
  const nodesToVisit = [startPosition], visitedNodes = { [startPosition.toString()]: 0 };

  while (nodesToVisit.length > 0) {
    const node = nodesToVisit.shift();
    const totalSteps = visitedNodes[node.toString()];
    const [row, col] = node;
    const elevation = getElevation(grid[row][col]);
    const neighbours = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];

    neighbours.forEach(nextNode => {
      const [nextRow, nextCol] = nextNode;
      if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[nextRow].length) return;
      
      const nextElevation = getElevation(grid[nextRow][nextCol]);
      if (nextElevation - elevation > 1) return;

      if (visitedNodes[nextNode.toString()] == null || visitedNodes[nextNode.toString()] > totalSteps + 1) {
        nodesToVisit.push([nextRow, nextCol]);
        visitedNodes[nextNode.toString()] = totalSteps + 1;
      }
    });
  }

  return visitedNodes[endPosition.toString()];
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const grid = fileContent.split('\n');
let startPosition = [0, 0], endPosition = [0, 0], i, j;

for (i  = 0; i < grid.length; i++) {
  for (j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === 'S') startPosition = [i, j];
    else if (grid[i][j] === 'E') endPosition = [i, j];
  }
}

console.log(calculateMinSteps(grid, startPosition, endPosition));