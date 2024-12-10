import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim();
const files = [];
const freeSpaces = [];
const map = new Map();

for (let i = 0, offset = 0; i < input.length; i++) {
  const n = Number(input[i]);
  if (i % 2 === 0) {
    files.push([offset, files.length, n]);
  } else {
    freeSpaces.push([offset, n]);
  }

  offset += n;
}

for (let i = files.length - 1; i >= 0; i--) {
  const [fileOffset, fileID, total] = files[i];
  let hasFreeSpace = false;

  for (let j = 0; j < freeSpaces.length; j++) {
    const [freeSpaceOffset, totalFreeSpace] = freeSpaces[j];
    if (freeSpaceOffset >= fileOffset) break;

    if (totalFreeSpace > total) {
      freeSpaces[j] = [freeSpaceOffset + total, totalFreeSpace - total];
      map.set(freeSpaceOffset, [fileID, total]);
      hasFreeSpace = true;
      break;
    } else if (totalFreeSpace === total) {
      freeSpaces.splice(j, 1);
      map.set(freeSpaceOffset, [fileID, total]);
      hasFreeSpace = true;
      break;
    }
  }

  if (!hasFreeSpace) {
    map.set(fileOffset, [fileID, total]);
  }
}

let checksum = 0;

map.forEach((file, offset) => {
  const [fileID, total] = file;
  checksum += fileID * (total / 2) * (2 * offset + total - 1);
});

console.log(checksum);
