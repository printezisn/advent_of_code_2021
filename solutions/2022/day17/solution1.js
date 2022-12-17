const fs = require('fs');
const path = require('path');

const newRockCoords = (top, rockPattern) => {
  const newRock = [];

  rockPattern.forEach(([y, x]) => {
    newRock.push([top + 3 + y, x + 2]);
  });

  return newRock;
};

const validateMovement = (occupiedCoords, rock, direction) => {
  for (let i = 0; i < rock.length; i++) {
    const y = rock[i][0] + direction[0], x = rock[i][1] + direction[1];

    if (x < 0 || x >= 7 || y < 0) return false;
    if (occupiedCoords.get(y) && occupiedCoords.get(y).get(x)) return false;
  }

  return true;
};

const move = (rock, direction) => {
  for (let i = 0; i < rock.length; i++) {
    rock[i][0] += direction[0];
    rock[i][1] += direction[1];
  }
};

const occupyCoords = (occupiedCoords, rock) => {
  for (let i = 0; i < rock.length; i++) {
    if (occupiedCoords.get(rock[i][0]) == null) {
      occupiedCoords.set(rock[i][0], new Map());
    }
    
    occupiedCoords.get(rock[i][0]).set(rock[i][1], true);
  }
};

const airPattern = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const occupiedCoords = new Map();
let maxRocksToFall = 2022, currentAirFlow = 0, currentRockPattern = 0;
const rockPatterns = [
  [
    [0, 0], [0, 1], [0, 2], [0, 3]
  ],
  [
    [0, 1], [1, 0], [1, 1], [1, 2], [2, 1]
  ],
  [
    [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]
  ],
  [
    [0, 0], [1, 0], [2, 0], [3, 0]
  ],
  [
    [0, 0], [0, 1], [1, 0], [1, 1]
  ]
];

while (maxRocksToFall > 0) {
  const rockPattern = rockPatterns[currentRockPattern];
  const newRock = newRockCoords(occupiedCoords.size, rockPattern);

  while (true) {
    const horizontalDirection = airPattern[currentAirFlow] === '<' ? [0, -1] : [0, 1];
    currentAirFlow = (currentAirFlow + 1) % airPattern.length;

    if (validateMovement(occupiedCoords, newRock, horizontalDirection)) {
      move(newRock, horizontalDirection);
    }
    if (!validateMovement(occupiedCoords, newRock, [-1, 0])) break;

    move(newRock, [-1, 0]);
  }

  occupyCoords(occupiedCoords, newRock);

  currentRockPattern = (currentRockPattern + 1) % rockPatterns.length;
  maxRocksToFall--;
}

console.log(occupiedCoords.size);