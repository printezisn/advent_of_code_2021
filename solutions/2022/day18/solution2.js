const fs = require('fs');
const path = require('path');

const positionToKey = ([x, y, z]) => `${x} ${y} ${z}`;

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const cubes = new Map();
let minX, maxX, minY, maxY, minZ, maxZ, i, j, k;
let totalSurfaceArea = 0, hasRemovableAirCubes = true;

// Load cubes
lines.forEach(line => {
  const cube = line.split(',').map(part => Number(part.trim()));
  const [x, y, z] = cube;
  cubes.set(positionToKey(cube), [...cube, true]);

  minX = minX == null ? x : Math.min(minX, x);
  maxX = maxX == null ? x : Math.max(maxX, x);
  minY = minY == null ? y : Math.min(minY, y);
  maxY = maxY == null ? y : Math.max(maxY, y);
  minZ = minZ == null ? z : Math.min(minZ, z);
  maxZ = maxZ == null ? z : Math.max(maxZ, z);
});

// Add potential air cubes
for (i = minX; i <= maxX; i++) {
  for (j = minY; j <= maxY; j++) {
    for (k = minZ; k <= maxZ; k++) {
      const key = positionToKey([i, j, k]);
      if (cubes.has(key)) continue;

      cubes.set(key, [i, j, k, false]);
    }
  }
}

// Remove non-covered air cubes
while (hasRemovableAirCubes) {
  hasRemovableAirCubes = false;

  cubes.forEach(([x, y, z, isLava]) => {
    if (isLava) return;

    const sides = [
      [x + 1, y, z], [x - 1, y, z], [x, y - 1, z], [x, y + 1, z],
      [x, y, z - 1], [x, y, z + 1]
    ];
    if (sides.some(side => !cubes.has(positionToKey(side)))) {
      hasRemovableAirCubes = true;
      cubes.delete(positionToKey([x, y, z]));
    }
  });
}

// Calculate total surface area
cubes.forEach(([x, y, z, isLava]) => {
  if (!isLava) return;

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