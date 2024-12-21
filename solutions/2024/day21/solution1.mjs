import fs from "fs";
import path from "path";

const KEY_PAD = ["7", "8", "9", "4", "5", "6", "1", "2", "3", null, "0", "A"];
const KEY_PAD_MAP = new Map(KEY_PAD.map((n, i) => [n, i]));
const DIRECTION_PAD = [null, "^", "A", "<", "v", ">"];
const DIRECTION_PAD_MAP = new Map(DIRECTION_PAD.map((n, i) => [n, i]));

const getMoveCombinations = (from, to, isNumeric, combination = []) => {
  if (from === to) return [[...combination, "A"]];
  if (isNumeric && KEY_PAD[from] === null) return [];
  if (!isNumeric && DIRECTION_PAD[from] === null) return [];

  const key = [from, to, isNumeric].toString();

  const [x1, y1] = [from % 3, Math.floor(from / 3)];
  const [x2, y2] = [to % 3, Math.floor(to / 3)];
  const combinations = [];

  if (y1 > y2) {
    combinations.push(
      ...getMoveCombinations(from - 3, to, isNumeric, [...combination, "^"])
    );
  } else if (y1 < y2) {
    combinations.push(
      ...getMoveCombinations(from + 3, to, isNumeric, [...combination, "v"])
    );
  }
  if (x1 > x2) {
    combinations.push(
      ...getMoveCombinations(from - 1, to, isNumeric, [...combination, "<"])
    );
  } else if (x1 < x2) {
    combinations.push(
      ...getMoveCombinations(from + 1, to, isNumeric, [...combination, ">"])
    );
  }

  return combinations;
};

const calculateTotalMoves = (from, to, depth = 1, dp = new Map()) => {
  if (depth === 4) return 1;

  const key = [from, to, depth].toString();
  if (dp.has(key)) return dp.get(key);

  let result = Infinity;

  getMoveCombinations(from, to, depth === 1).forEach((moves) => {
    let total = 0;
    let newFrom = DIRECTION_PAD_MAP.get("A");

    moves.forEach((move) => {
      let newTo = DIRECTION_PAD_MAP.get(move);
      total += calculateTotalMoves(newFrom, newTo, depth + 1, dp);
      newFrom = newTo;
    });

    result = Math.min(result, total);
  });

  dp.set(key, result);
  return result;
};

const codes = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()));

let result = 0;

codes.forEach((code) => {
  let current = "A";
  let total = 0;

  code.forEach((ch) => {
    const from = KEY_PAD_MAP.get(current);
    const to = KEY_PAD_MAP.get(ch);
    current = ch;

    total += calculateTotalMoves(from, to);
  });

  result += total * parseInt(code.join(""));
});

console.log(result);
