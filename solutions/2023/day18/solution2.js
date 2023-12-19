const fs = require("fs");

let currentPos = [0, 0];
const points = [currentPos];

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const match = line.trim().match(/^\w+\s+\d+\s+\(#(.+)(.)\)$/);
    const num = parseInt(match[1], 16);
    let newPos;

    switch (match[2]) {
      case "0":
        newPos = [currentPos[0], currentPos[1] + num];
        break;
      case "1":
        newPos = [currentPos[0] + num, currentPos[1]];
        break;
      case "2":
        newPos = [currentPos[0], currentPos[1] - num];
        break;
      case "3":
        newPos = [currentPos[0] - num, currentPos[1]];
        break;
    }

    currentPos = newPos;
    points.push(currentPos);
  });

let area = 0;
let totalBoundaryPoints = 0;

for (let i = 0; i < points.length - 1; i++) {
  const [y0, x0] = points[i];
  const [y1, x1] = points[i + 1];

  area += x0 * y1 - x1 * y0;
  totalBoundaryPoints += Math.abs(x0 - x1) + Math.abs(y0 - y1);
}

area = Math.abs(area) / 2;
let totalInteriorPoints = area - totalBoundaryPoints / 2 + 1;
const totalPoints = totalBoundaryPoints + totalInteriorPoints;

console.log(totalPoints);
