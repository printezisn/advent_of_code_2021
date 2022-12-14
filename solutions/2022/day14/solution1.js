const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const rocks = {}, sands = {};
let i, j, finish = false, leftLimit = null, rightLimit = null, downLimit = null;

lines.forEach(line => {
  const paths = line.split('->').map(path => path.trim());
  for (i = 1; i < paths.length; i++) {
    const [x1, y1] = paths[i - 1].split(',').map(part => part.trim());
    const [x2, y2] = paths[i].split(',').map(part => part.trim());

    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    if (x1 === x2) {
      for (j = minY; j <= maxY; j++) rocks[[x1, j].toString()] = true;

      downLimit = downLimit == null ? maxY : Math.max(downLimit, maxY);
    } else {
      for (j = minX; j <= maxX; j++) rocks[[j, y1].toString()] = true;

      rightLimit = rightLimit == null ? maxX : Math.max(rightLimit, maxX);
      leftLimit = leftLimit == null ? minX : Math.min(minX, leftLimit);
    }
  }
});

while (!finish) {
  let sand = [500, 0];

  while (true) {
    if (sand[0] < leftLimit || sand[0] > rightLimit || sand[1] > downLimit) {
      finish = true;
      break;
    }

    let nextMoves = [
      [sand[0], sand[1] + 1],
      [sand[0] - 1, sand[1] + 1],
      [sand[0] + 1, sand[1] + 1]
    ];

    for (i = 0; i < nextMoves.length; i++) {
      if (!rocks[nextMoves[i].toString()] && !sands[nextMoves[i].toString()]) break;
    }

    if (i < nextMoves.length) {
      sand = nextMoves[i];
    } else {
      break;
    }
  }

  if (!finish) sands[sand.toString()] = true;
}

console.log(Object.keys(sands).length);