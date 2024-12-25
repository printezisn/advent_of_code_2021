import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()));
const locks = [];
const keys = [];
let lastEntity;

lines.forEach((line) => {
  if (line.length === 0) {
    lastEntity = null;
    return;
  }
  if (!lastEntity) {
    lastEntity = { rows: 0, heights: Array(line.length).fill(0) };
    line[0] === "#" ? locks.push(lastEntity) : keys.push(lastEntity);
  }

  lastEntity.rows++;

  line.forEach((ch, col) => {
    if (ch === "#") lastEntity.heights[col]++;
  });
});

let result = 0;

locks.forEach((lock) => {
  keys.forEach((key) => {
    if (key.rows !== lock.rows) return;
    if (key.heights.length !== lock.heights.length) return;

    for (let i = 0; i < key.heights.length; i++) {
      if (key.heights[i] + lock.heights[i] > key.rows) return;
    }

    result++;
  });
});

console.log(result);
