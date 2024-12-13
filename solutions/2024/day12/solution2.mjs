import fs from "fs";
import path from "path";

const isOtherRegion = (map, row, col, region, marker = null) => {
  return (
    row < 0 ||
    row >= map.length ||
    col < 0 ||
    col >= map[row].length ||
    (map[row][col] !== region && (marker === null || map[row][col] !== marker))
  );
};

const calculateArea = (map, row, col, region, marker) => {
  if (isOtherRegion(map, row, col, region)) {
    return 0;
  }

  const next = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  let total = 1;
  map[row][col] = marker;

  next.forEach(([i, j]) => {
    total += calculateArea(map, i, j, region, marker);
  });

  return total;
};

const calculatePerimeter = (map, row, col, region, marker) => {
  let total = 0;

  if (
    isOtherRegion(map, row - 1, col, region, marker) &&
    (isOtherRegion(map, row, col - 1, region, marker) ||
      !isOtherRegion(map, row - 1, col - 1, region, marker))
  ) {
    total++;
  }

  if (
    isOtherRegion(map, row + 1, col, region, marker) &&
    (isOtherRegion(map, row, col - 1, region, marker) ||
      !isOtherRegion(map, row + 1, col - 1, region, marker))
  ) {
    total++;
  }

  if (
    isOtherRegion(map, row, col - 1, region, marker) &&
    (isOtherRegion(map, row - 1, col, region, marker) ||
      !isOtherRegion(map, row - 1, col - 1, region, marker))
  ) {
    total++;
  }

  if (
    isOtherRegion(map, row, col + 1, region, marker) &&
    (isOtherRegion(map, row - 1, col, region, marker) ||
      !isOtherRegion(map, row - 1, col + 1, region, marker))
  ) {
    total++;
  }

  map[row][col] = marker;

  const next = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  next.forEach(([i, j]) => {
    if (isOtherRegion(map, i, j, region)) return;

    total += calculatePerimeter(map, i, j, region, marker);
  });

  return total;
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
    const area = calculateArea(map, row, col, map[row][col], marker);
    const perimeter = calculatePerimeter(map, row, col, marker, marker + 1);
    marker++;

    price += area * perimeter;
  }
}

console.log(price);
