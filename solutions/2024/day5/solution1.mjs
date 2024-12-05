import fs from "fs";

const isValidOrder = (pages, pageDependencies) => {
  const forbiddenPages = {};

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    if (forbiddenPages[page]) return false;

    (pageDependencies[page] ?? []).forEach((dependency) => {
      forbiddenPages[dependency] = true;
    });
  }

  return true;
};

const pageDependencies = {};
const pageUpdates = [];
let result = 0;

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.includes(",")) {
      pageUpdates.push(trimmedLine.split(",").map(Number));
    } else {
      const parts = trimmedLine.split("|").map(Number);
      pageDependencies[parts[1]] ??= [];
      pageDependencies[parts[1]].push(parts[0]);
    }
  });

pageUpdates.forEach((pages) => {
  if (isValidOrder(pages, pageDependencies)) {
    result += pages[Math.floor(pages.length / 2)];
  }
});

console.log(result);
