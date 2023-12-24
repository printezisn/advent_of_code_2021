const steps = 26501365;
const times = (steps - 65) / 131;
let totalState1 = 1;
let totalState2 = 0;

for (let i = 2; i <= times; i++) {
  const temp = totalState1;

  totalState1 = totalState2 + (i - 1) * 4;
  totalState2 = temp;
}

const result =
  911 * times +
  917 * times +
  929 * times +
  932 * times +
  5331 +
  5340 +
  5348 +
  5357 +
  6206 * (times - 1) +
  6207 * (times - 1) +
  6215 * (times - 1) +
  6224 * (times - 1) +
  7193 * totalState1 +
  7082 * totalState2;

console.log(result);
