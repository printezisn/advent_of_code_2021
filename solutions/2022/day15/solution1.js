const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const monitoredY = 2000000, beaconsInMonitoredRow = {}, blockedXInMonitoredRow = {};

lines.forEach(line => {
  const match = line.match(/Sensor at x=([\+\-0-9]+), y=([\+\-0-9]+): closest beacon is at x=([\+\-0-9]+), y=([\+\-0-9]+)/);
  const sensorX = Number(match[1]), sensorY = Number(match[2]), beaconX = Number(match[3]), beaconY = Number(match[4]);

  if (beaconY === monitoredY) {
    beaconsInMonitoredRow[beaconX] = true;
    delete blockedXInMonitoredRow[beaconX];
  }

  const distanceToBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
  const distanceYFromRow = Math.abs(sensorY - monitoredY);
  const distanceToCover = distanceToBeacon - distanceYFromRow;

  if (distanceToCover <= 0) return;

  for (let i = sensorX - distanceToCover; i <= sensorX + distanceToCover; i++) {
    if (!beaconsInMonitoredRow[i]) {
      blockedXInMonitoredRow[i] = true;
    }
  }
});

console.log(Object.keys(blockedXInMonitoredRow).length);