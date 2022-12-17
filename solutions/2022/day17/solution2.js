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

const setTopPerColumn = (rock, topPerColumn) => {
  for (let i = 0; i < rock.length; i++) {
    const row = rock[i][1];
    topPerColumn[row] = Math.max(topPerColumn[row], rock[i][0]);
  }
};

const getMaxTop = topPerColumn => {
  return topPerColumn.reduce((max, top) => Math.max(max, top), 0);
};

const calculateDepthPerColumn = topPerColumn => {
  const maxTop = getMaxTop(topPerColumn);

  return topPerColumn.map(top => maxTop - top);
};

const airPattern = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
let occupiedCoords = new Map(), topPerColumn = Array(7).fill(0), repeatedPatterns = new Map();
let maxRocksToFall = 1000000000000, currentAirFlow = 0, currentRockPattern = 0;

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

for (let i = 0; i < maxRocksToFall; i++) {
  const rockPattern = rockPatterns[currentRockPattern];
  const newRock = newRockCoords(i === 0 ? 0 : (getMaxTop(topPerColumn) + 1), rockPattern);

  while (true) {
    const horizontalDirection = airPattern[currentAirFlow] === '<' ? [0, -1] : [0, 1];
    currentAirFlow = (currentAirFlow + 1) % airPattern.length;

    if (validateMovement(occupiedCoords, newRock, horizontalDirection)) {
      move(newRock, horizontalDirection);
    }
    if (!validateMovement(occupiedCoords, newRock, [-1, 0])) break;

    move(newRock, [-1, 0]);
  }

  currentRockPattern = (currentRockPattern + 1) % rockPatterns.length;

  occupyCoords(occupiedCoords, newRock);
  setTopPerColumn(newRock, topPerColumn);

  const depthPerColumn = calculateDepthPerColumn(topPerColumn);
  const patternKey = `${depthPerColumn.join(',')}|${currentRockPattern}|${currentAirFlow}`;
  const repeatedPattern = repeatedPatterns.get(patternKey);

  if (repeatedPattern) {
    const [previousIndex, previousTopPerColumn] = repeatedPattern;

    const indexDiff = i - previousIndex;
    const topDiff = topPerColumn[0] - previousTopPerColumn[0]
    const totalRepeats = Math.floor((maxRocksToFall - 1 - i) / indexDiff);
    const nextIndex = i + totalRepeats * indexDiff;

    repeatedPatterns = new Map();
    occupiedCoords = new Map();

    for (let j = 0; j < topPerColumn.length; j++) {
      topPerColumn[j] = topPerColumn[j] + totalRepeats * topDiff;

      if (!occupiedCoords.get(topPerColumn[j])) occupiedCoords.set(topPerColumn[j], new Map());
      occupiedCoords.get(topPerColumn[j]).set(j, true);
    }

    i = nextIndex;
  } else {
    repeatedPatterns.set(patternKey, [i, [...topPerColumn]]);
  }
}

console.log(getMaxTop(topPerColumn) + 1);