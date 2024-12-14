import fs from "fs";
import path from "path";

const WIDTH = 101;
const HEIGHT = 103;

const printMap = (marks, symbol) => {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const hasMark = marks.some((p) => p[0] === j && p[1] === i);
      process.stdout.write(hasMark ? `${symbol}` : ".");
    }
    console.log();
  }
};

const hasRobotsFormingTriangle = (robots) => {
  for (let i = 0; i < robots.length; i++) {
    const { p } = robots[i];

    const valid =
      robots.some(({ p: p2 }) => p[0] === p2[0] + 1 && p[1] === p2[1] - 1) &&
      robots.some(({ p: p2 }) => p[0] === p2[0] + 2 && p[1] === p2[1] - 2) &&
      robots.some(({ p: p2 }) => p[0] === p2[0] + 3 && p[1] === p2[1] - 3) &&
      robots.some(({ p: p2 }) => p[0] === p2[0] + 4 && p[1] === p2[1] - 4) &&
      robots.some(({ p: p2 }) => p[0] === p2[0] + 5 && p[1] === p2[1] - 5);
    if (valid) {
      return true;
    }
  }

  return false;
};

const hasRobotsFormingVerticalBorder = (robots) => {
  for (let i = 0; i < robots.length; i++) {
    const { p } = robots[i];
    let valid = true;

    for (let j = 1; j <= 10; j++) {
      if (!robots.some(({ p: p2 }) => p2[0] === p[0] && p2[1] === p[1] + j)) {
        valid = false;
        break;
      }
    }

    if (valid) return true;
  }

  return false;
};

const simulateRobots = (robots) => {
  let seconds = 0;

  while (true) {
    seconds++;

    robots.forEach(({ p, v }) => {
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
    });

    const valid =
      hasRobotsFormingTriangle(robots) &&
      hasRobotsFormingVerticalBorder(robots);
    if (valid) {
      console.log(seconds);
      printMap(
        robots.map((r) => r.p),
        "R"
      );
      return;
    }
  }
};

const robots = [];
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

simulateRobots(robots);
