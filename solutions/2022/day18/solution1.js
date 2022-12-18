const fs = require('fs');
const path = require('path');

const positionToKey = ([x, y, z]) => `${x} ${y} ${z}`;

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const cubes = new Map();
let totalSurfaceArea = 0;

// Load cubes
lines.forEach(line => {
  const cube = line.split(',').map(part => Number(part.trim()));
  cubes.set(positionToKey(cube), cube);
});

// Calculate total surface area
cubes.forEach(([x, y, z]) => {
  const sides = [
    [x + 1, y, z], [x - 1, y, z], [x, y - 1, z], [x, y + 1, z],
    [x, y, z - 1], [x, y, z + 1]
  ];

  totalSurfaceArea += sides.reduce((total, side) => {
    if (cubes.has(positionToKey(side))) return total;
    return total + 1;
  }, 0);
});

console.log(totalSurfaceArea);