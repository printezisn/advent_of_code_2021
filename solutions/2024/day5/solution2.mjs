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

const extendSet = (set, arr) => {
  const newSet = { ...set };

  arr.forEach((n) => (newSet[n] = true));
  return newSet;
};

const reorderPages = (pages, pageDependencies, forbiddenPages = {}) => {
  if (pages.length === 0) return [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (forbiddenPages[page]) continue;

    pages.splice(i, 1);

    const result = reorderPages(
      pages,
      pageDependencies,
      extendSet(forbiddenPages, pageDependencies[page] ?? [])
    );
    if (result) return [page, ...result];

    pages.splice(i, 0, page);
  }

  return null;
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
  if (isValidOrder(pages, pageDependencies)) return;

  const reorderedPages = reorderPages(pages, pageDependencies);
  result += reorderedPages[Math.floor(reorderedPages.length / 2)];
});

console.log(result);
