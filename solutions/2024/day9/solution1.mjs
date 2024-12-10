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

while (freeSpaces.length > 0) {
  const [freeSpaceOffset, available] = freeSpaces[0];
  const [fileOffset, fileID, total] = files[files.length - 1];

  if (freeSpaceOffset >= fileOffset) break;

  if (available > total) {
    map.set(freeSpaceOffset, [fileID, total]);
    files.pop();
    freeSpaces[0] = [freeSpaceOffset + total, available - total];
  } else if (available === total) {
    map.set(freeSpaceOffset, [fileID, total]);
    files.pop();
    freeSpaces.shift();
  } else {
    map.set(freeSpaceOffset, [fileID, available]);
    files[files.length - 1] = [fileOffset, fileID, total - available];
    freeSpaces.shift();
  }
}

for (let i = 0; i < files.length; i++) {
  const [offset, fileID, total] = files[i];
  map.set(offset, [fileID, total]);
}

let checksum = 0;

map.forEach((file, offset) => {
  const [fileID, total] = file;
  checksum += fileID * (total / 2) * (2 * offset + total - 1);
});

console.log(checksum);
