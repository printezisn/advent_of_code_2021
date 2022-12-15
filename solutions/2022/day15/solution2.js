const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const sensors = [], maxCoord = 4000000;
let i, j, missingBeacon = null;

lines.forEach(line => {
  const match = line.match(/Sensor at x=([\+\-0-9]+), y=([\+\-0-9]+): closest beacon is at x=([\+\-0-9]+), y=([\+\-0-9]+)/);
  const sensorX = Number(match[1]), sensorY = Number(match[2]), beaconX = Number(match[3]), beaconY = Number(match[4]);
  const distanceToBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

  sensors.push([sensorX, sensorY, distanceToBeacon]);
});

sensors.sort((a, b) => a[0] - b[0]);

for (i = 0; i <= maxCoord; i++) {
  const ranges = [];

  for (j = 0; j < sensors.length; j++) {
    const [x, y, beaconDistance] = sensors[j];
    const rowDistance = Math.abs(y - i);
    const distance = beaconDistance - Math.abs(y - i);

    if (distance < 0) continue;

    const range = [Math.max(0, x - distance), Math.min(maxCoord, x + distance)];
    ranges.push(range);
  }

  ranges.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] < b[0] ? -1 : 1;
    }
    if (a[1] === b[1]) return 0;

    return a[1] < b[1] ? -1 : 1;
  });

  let rangeIndex = 0;
  const newRanges = [ranges[0]];

  for (j = 1; j < ranges.length; j++) {
    if (newRanges[rangeIndex][1] >= ranges[j][0]) {
      newRanges[rangeIndex][1] = Math.max(newRanges[rangeIndex][1], ranges[j][1]);
    } else {
      rangeIndex++;
      newRanges.push(ranges[j]);
    }
  }

  if (newRanges.length > 1) {
    missingBeacon = [newRanges[0][1] + 1, i];
    break;
  } else if (newRanges[0][0] > 0) {
    missingBeacon = [newRanges[0][0] - 1, i];
    break;
  } else if (newRanges[0][1] < maxCoord) {
    missingBeacon = [newRanges[0][1] + 1, i];
    break;
  }
}

console.log(missingBeacon[0] * 4000000 + missingBeacon[1]);