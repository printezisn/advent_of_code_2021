const fs = require("fs");

const checkReflection = (arr, i) => {
  if (arr[i] !== arr[i + 1]) return false;

  for (let j = 1; i - j >= 0 && i + 1 + j < arr.length; j++) {
    if (arr[i - j] !== arr[i + 1 + j]) {
      return false;
    }
  }

  return true;
};

const findReflectionPoints = (rows, columns) => {
  const points = [];

  for (let i = 0; i < rows.length - 1; i++) {
    if (checkReflection(rows, i)) {
      points.push({ type: "row", index: i, score: 100 * (i + 1) });
    }
  }

  for (let i = 0; i < columns.length - 1; i++) {
    if (checkReflection(columns, i)) {
      points.push({ type: "column", index: i, score: i + 1 });
    }
  }

  return points;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

for (let row = 0; row < lines.length; row++) {
  let limit;

  for (limit = row; limit < lines.length && lines[limit]; limit++);

  const rows = lines.slice(row, limit);
  const columns = [...Array(rows[0].length)].map((_, i) => {
    return rows.map((row) => row[i]).join("");
  });

  row = limit;

  let points = {};

  findReflectionPoints(rows, columns).forEach(p => {
    points[[p.type, p.index]] = { ...p, initial: true };
  });

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const newChar = rows[i][j] === "#" ? "." : "#";
      const oldRow = rows[i];

      rows[i] = rows[i].substring(0, j) + newChar + rows[i].substring(j + 1);
      findReflectionPoints(rows, []).forEach(p => {
        if (!points[[p.type, p.index]]) {
          points[[p.type, p.index]] = p;
        }
      });
      rows[i] = oldRow;
    }
  }

  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columns[i].length; j++) {
      const newChar = columns[i][j] === "#" ? "." : "#";
      const oldColumn = columns[i];

      columns[i] =
        columns[i].substring(0, j) + newChar + columns[i].substring(j + 1);
      findReflectionPoints([], columns).forEach(p => {
        if (!points[[p.type, p.index]]) {
          points[[p.type, p.index]] = p;
        }
      });
      columns[i] = oldColumn;
    }
  }

  total += Object.values(points).find(({ initial }) => !initial).score;
}

console.log(total);
