const fs = require("fs");

const findIntersectionPoint = (
  [px1, py1, pz1, vx1, vy1, vz1],
  [px2, py2, pz2, vx2, vy2, vz2]
) => {
  if (vx1 / vx2 === vy1 / vy2) return null;

  const t2 =
    (vx1 * py2 - vx1 * py1 - vy1 * px2 + vy1 * px1) / (vx2 * vy1 - vy2 * vx1);
  const t1 = (px2 - px1 + vx2 * t2) / vx1;

  if (t1 < 0 || t2 < 0) return null;

  return [px1 + vx1 * t1, py1 + vy1 * t1];
};

const testArea = [200000000000000, 400000000000000];
const hailstones = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => {
    const [position, velocity] = line.replace(/ /g, "").split("@");
    const [px, py, pz] = position.split(",").map(Number);
    const [vx, vy, vz] = velocity.split(",").map(Number);

    return [px, py, pz, vx, vy, vz];
  });

let total = 0;

for (let i = 0; i < hailstones.length; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const intersectionPoint = findIntersectionPoint(
      hailstones[i],
      hailstones[j]
    );
    if (!intersectionPoint) continue;

    if (
      intersectionPoint[0] >= testArea[0] &&
      intersectionPoint[0] <= testArea[1] &&
      intersectionPoint[1] >= testArea[0] &&
      intersectionPoint[1] <= testArea[1]
    ) {
      total++;
    }
  }
}

console.log(total);
