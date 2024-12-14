import fs from "fs";
import path from "path";

const WIDTH = 101;
const HEIGHT = 103;
// const WIDTH = 11;
// const HEIGHT = 7;
const SECONDS = 10000;

const HALF_WIDTH = Math.floor(WIDTH / 2);
const HALF_HEIGHT = Math.floor(HEIGHT / 2);

const robots = [];
const quadrants = Array(4).fill(0);
const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
lines.forEach((line) => {
  const nums = line
    .trim()
    .match(/(\-?\d+)/g)
    .map(Number);
  robots.push({ p: nums.slice(0, 2), v: nums.slice(2) });
});

robots.forEach(({ p, v }) => {
  const state = new Map([[p[1] * WIDTH + p[0], 0]]);

  for (let second = 1; second <= SECONDS; second++) {
    p[0] += v[0];
    p[1] += v[1];
    if (p[0] < 0) {
      p[0] += WIDTH;
    } else if (p[0] >= WIDTH) {
      p[0] -= WIDTH;
    }
    if (p[1] < 0) {
      p[1] += HEIGHT;
    } else if (p[1] >= HEIGHT) {
      p[1] -= HEIGHT;
    }

    const stateKey = p[1] * WIDTH + p[0];
    if (state.has(stateKey)) {
      const start = state.get(stateKey);
      const cycle = second - start;
      second = SECONDS - ((SECONDS - start) % cycle);
      state.clear();
    }

    state.set(stateKey, second);
  }

  if (p[0] < HALF_WIDTH && p[1] < HALF_HEIGHT) {
    quadrants[0]++;
  } else if (p[0] > HALF_WIDTH && p[1] < HALF_HEIGHT) {
    quadrants[1]++;
  } else if (p[0] < HALF_WIDTH && p[1] > HALF_HEIGHT) {
    quadrants[2]++;
  } else if (p[0] > HALF_WIDTH && p[1] > HALF_HEIGHT) {
    quadrants[3]++;
  }
});

const result = quadrants.reduce((m, n) => m * n, 1);
console.log(result);
