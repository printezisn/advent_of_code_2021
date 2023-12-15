const fs = require("fs");

const computeHash = (str) => {
  let total = 0;

  [...str].forEach((ch) => {
    total += ch.charCodeAt(0);
    total *= 17;
    total %= 256;
  });

  return total;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const boxes = {};

lines.forEach((line) => {
  line
    .split(",")
    .filter(Boolean)
    .forEach((sequence) => {
      if (sequence.endsWith("-")) {
        const label = sequence.substring(0, sequence.length - 1);
        const box = computeHash(label);

        boxes[box] = (boxes[box] || []).filter((l) => l.label !== label);
      } else {
        const [label, length] = sequence.split("=");
        const box = computeHash(label);

        boxes[box] = boxes[box] || [];
        const existingBox = boxes[box].find((l) => l.label === label);
        if (existingBox) {
          existingBox.length = Number(length);
        } else {
          boxes[box].push({ label, length: Number(length) });
        }
      }
    });
});

let total = 0;

Object.keys(boxes).forEach((box) => {
  boxes[box].forEach((lens, i) => {
    total += (Number(box) + 1) * (i + 1) * lens.length;
  });
});

console.log(total);
