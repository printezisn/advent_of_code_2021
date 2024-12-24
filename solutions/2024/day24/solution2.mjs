import fs from "fs";
import path from "path";

const wires = new Map();
const gates = new Map();

const xWires = [];
const yWires = [];
const zWires = [];

const addRandomNum = (arr, symbol) => {
  const low = 2 ** (arr.length - 1);
  const high = 2 ** arr.length - 1;
  const num = Math.floor(Math.random() * (high - low)) + low;

  Array.from(num.toString(2)).forEach((n, i) => {
    wires.set(`${symbol}${i.toString().padStart(2, "0")}`, n);
  });
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

const addWire = (wire, value) => {
  if (wires.has(wire) && value === null) return;

  wires.set(wire, value);
  if (wire[0] === "x") xWires.push(wire);
  else if (wire[0] === "y") yWires.push(wire);
  else if (wire[0] === "z") zWires.push(wire);
};

const wireComparer = (a, b) => Number(b.slice(1)) - Number(a.slice(1));

lines.forEach((line) => {
  if (!line) return;

  const parts = line
    .replace(/(\->)|(\:)/g, " ")
    .split(" ")
    .map((p) => p.trim())
    .filter(Boolean);

  if (line.includes("->")) {
    gates.set(parts[3], parts);
    addWire(parts[0], null);
    addWire(parts[2], null);
    addWire(parts[3], null);
  } else {
    addWire(parts[0], Number(parts[1]));
  }
});

xWires.sort(wireComparer);
yWires.sort(wireComparer);
zWires.sort(wireComparer);
const outputWires = Array.from(gates.keys());
const result = [];

const findWireValue = (wire, visited = new Set()) => {
  if (wires.get(wire) !== null) return Number(wires.get(wire));
  if (visited.has(wire)) return 0;

  visited.add(wire);

  const gate = gates.get(wire);
  let value;

  switch (gate[1]) {
    case "AND":
      value =
        findWireValue(gate[0], visited) && findWireValue(gate[2], visited)
          ? 1
          : 0;
      break;
    case "OR":
      value =
        findWireValue(gate[0], visited) || findWireValue(gate[2], visited)
          ? 1
          : 0;
      break;
    case "XOR":
      value =
        findWireValue(gate[0], visited) !== findWireValue(gate[2], visited)
          ? 1
          : 0;
      break;
    default:
      throw new Error("Invalid gate");
  }

  visited.delete(wire);

  return value;
};

const wiresToNum = (wires) => {
  const bits = wires.map((wire) => findWireValue(wire)).join("");
  return parseInt(bits, 2);
};

const isValidBit = (index) => {
  for (let time = 0; time < 1000; time++) {
    addRandomNum(xWires, "x");
    addRandomNum(yWires, "y");

    const x = wiresToNum(xWires);
    const y = wiresToNum(yWires);
    const expectedZ = Array.from(Number(x + y).toString(2)).map(Number);

    const num = Array.from(wiresToNum(zWires).toString(2)).map(Number);
    if (
      num[num.length - 1 - index] !== expectedZ[expectedZ.length - 1 - index]
    ) {
      return false;
    }
  }

  return true;
};

const swapPair = (wire1, wire2) => {
  const temp = gates.get(wire1);
  gates.set(wire1, gates.get(wire2));
  gates.set(wire2, temp);
};

const findValidSwaps = () => {
  let index;
  for (index = 0; index < zWires.length; index++) {
    if (!isValidBit(index)) break;
  }
  if (index === zWires.length) return true;

  for (let i = 0; i < outputWires.length; i++) {
    for (let j = i + 1; j < outputWires.length; j++) {
      swapPair(outputWires[i], outputWires[j]);
      if (isValidBit(index) && findValidSwaps()) {
        result.push(outputWires[i], outputWires[j]);
        return true;
      }
      swapPair(outputWires[i], outputWires[j]);
    }
  }

  return false;
};

findValidSwaps();

console.log(result.sort().join(","));
