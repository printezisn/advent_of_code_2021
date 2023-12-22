const fs = require("fs");

const canBeRemoved = (supporting, supportedBy, name) => {
  if (!supporting[name]) return true;

  return Object.keys(supporting[name]).every((c) => {
    return Object.values(supportedBy[c]).length > 1;
  });
};

const cubes = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line, i) => {
    const [from, to] = line.trim().split("~");
    const [x1, y1, z1] = from.split(",").map(Number);
    const [x2, y2, z2] = to.split(",").map(Number);

    return {
      name: i,
      x: [Math.min(x1, x2), Math.max(x1, x2)],
      y: [Math.min(y1, y2), Math.max(y1, y2)],
      z: [Math.min(z1, z2), Math.max(z1, z2)],
    };
  });

cubes.sort((a, b) => {
  const diff = a.z[0] - b.z[0];
  if (diff !== 0) return diff;

  return a.z[1] - b.z[1];
});

const supporting = {};
const supportedBy = {};

cubes.forEach(({ name, x, y, z }) => {
  const connectedCubes = cubes.filter(
    ({ name: name2, x: x2, y: y2, z: z2 }) => {
      if (name === name2) return false;
      if (x[0] > x2[1] || x[1] < x2[0]) return false;
      if (y[0] > y2[1] || y[1] < y2[0]) return false;
      if (z[1] < z2[0]) return false;

      return true;
    }
  );

  const maxz = connectedCubes.reduce(
    (max, { z: z2 }) => Math.max(max, z2[1]),
    0
  );

  const diff = z[1] - z[0];
  z[0] = maxz + 1;
  z[1] = z[0] + diff;

  connectedCubes.forEach(({ name: connectionName, z: z2 }) => {
    if (z2[1] !== maxz) return;

    supporting[connectionName] = supporting[connectionName] || {};
    supporting[connectionName][name] = true;

    supportedBy[name] = supportedBy[name] || {};
    supportedBy[name][connectionName] = true;
  });
});

const result = cubes.filter((c) =>
  canBeRemoved(supporting, supportedBy, c.name)
).length;
console.log(result);
