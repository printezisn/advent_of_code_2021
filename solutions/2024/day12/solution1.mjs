import fs from "fs";
import path from "path";

const getRegionStats = (map, row, col, region, marker) => {
  if (row < 0 || row >= map.length || col < 0 || col >= map[row].length) {
    return [0, 1];
  }
  if (map[row][col] === marker) return [0, 0];
  if (map[row][col] !== region) return [0, 1];

  let area = 1;
  let perimeter = 0;
  map[row][col] = marker;

  const next = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  next.forEach(([i, j]) => {
    const [a, p] = getRegionStats(map, i, j, region, marker);
    area += a;
    perimeter += p;
  });

  return [area, perimeter];
};

const map = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()));
let price = 0;
let marker = 0;

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (typeof map[row][col] === "number") continue;

    marker++;
    const [area, perimeter] = getRegionStats(
      map,
      row,
      col,
      map[row][col],
      marker
    );
    price += area * perimeter;
  }
}

console.log(price);
