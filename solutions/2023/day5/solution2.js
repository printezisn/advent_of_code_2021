const fs = require("fs");

const splitIntoNumbers = (str) =>
  str
    .split(" ")
    .filter((num) => num)
    .map((num) => Number(num));

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let ranges = splitIntoNumbers(lines[0].split(":")[1]);
let newRanges = [];
let lineIndex = 3;

while (lineIndex < lines.length) {
  let i, j;

  for (i = 0; i < ranges.length; i += 2) {
    let found = false;

    for (j = lineIndex; j < lines.length && lines[j]; j++) {
      const [destinationStart, sourceStart, range] = splitIntoNumbers(lines[j]);

      const sourceEnd = sourceStart + range - 1;
      const rangeStart = ranges[i];
      const rangeEnd = ranges[i] + ranges[i + 1] - 1;

      if (rangeEnd < sourceStart || rangeStart > sourceEnd) {
        continue;
      }

      const intersectionStart = Math.max(sourceStart, rangeStart);
      const intersectionEnd = Math.min(sourceEnd, rangeEnd);

      newRanges.push(destinationStart + (intersectionStart - sourceStart));
      newRanges.push(intersectionEnd - intersectionStart + 1);
      if (rangeStart < intersectionStart) {
        ranges.push(rangeStart);
        ranges.push(intersectionStart - rangeStart);
      }
      if (intersectionEnd < rangeEnd) {
        ranges.push(intersectionEnd + 1);
        ranges.push(rangeEnd - intersectionEnd);
      }

      found = true;
      break;
    }
    if (!found) {
      newRanges.push(ranges[i]);
      newRanges.push(ranges[i + 1]);
    }
  }

  ranges = newRanges;
  newRanges = [];

  while (lineIndex < lines.length && !lines[lineIndex].includes(" map")) {
    lineIndex++;
  }

  lineIndex++;
}

let result = null;
for (let i = 0; i < ranges.length; i += 2) {
  result = result == null ? ranges[i] : Math.min(result, ranges[i]);
}

console.log(result);
