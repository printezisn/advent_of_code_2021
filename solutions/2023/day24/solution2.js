const fs = require("fs");

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

hailstones.sort((a, b) => {
  for (let i = 2; i >= 0; i--) {
    const diff = a[i] - b[i];
    if (diff !== 0) return diff;
  }

  for (let i = 5; i >= 3; i--) {
    const diff = a[i] - b[i];
    if (diff !== 0) return diff;
  }

  return 0;
});

// Feed the output to Z3. It's cheating but it does the job.
console.log(`const px = Z3.Int.const("px");`);
console.log(`const py = Z3.Int.const("py");`);
console.log(`const pz = Z3.Int.const("pz");`);
console.log(`const vx = Z3.Int.const("vx");`);
console.log(`const vy = Z3.Int.const("vy");`);
console.log(`const vz = Z3.Int.const("vz");`);
console.log();
console.log(`const solver = new Z3.Solver();`);
for (let i = 0; i < 3; i++) {
  console.log(`const t${i + 1} = Z3.Int.const('t${i + 1}');`);
  console.log(`solver.add(t${i + 1}.ge(1));`);
  console.log(
    `solver.add(px.add(t${i + 1}.mul(vx)).eq(t${i + 1}.mul(${
      hailstones[i][3]
    }).add(${hailstones[i][0]})));`
  );
  console.log(
    `solver.add(py.add(t${i + 1}.mul(vy)).eq(t${i + 1}.mul(${
      hailstones[i][4]
    }).add(${hailstones[i][1]})));`
  );
  console.log(
    `solver.add(pz.add(t${i + 1}.mul(vz)).eq(t${i + 1}.mul(${
      hailstones[i][5]
    }).add(${hailstones[i][2]})));`
  );
}
console.log(`await solver.check();`);
console.log(`solver.model();`);
