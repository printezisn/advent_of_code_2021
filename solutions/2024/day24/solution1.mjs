import fs from "fs";
import path from "path";

const wires = new Map();
const zWires = [];
const gates = new Map();

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

const addWire = (wire, value) => {
  if (wires.has(wire) && value === null) return;

  wires.set(wire, value);
  if (wire[0] === "z") zWires.push(wire);
};

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

zWires.sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)));

const findWireValue = (wire) => {
  if (wires.get(wire) !== null) return Number(wires.get(wire));

  const gate = gates.get(wire);
  let value;

  switch (gate[1]) {
    case "AND":
      value = findWireValue(gate[0]) && findWireValue(gate[2]) ? 1 : 0;
      break;
    case "OR":
      value = findWireValue(gate[0]) || findWireValue(gate[2]) ? 1 : 0;
      break;
    case "XOR":
      value = findWireValue(gate[0]) !== findWireValue(gate[2]) ? 1 : 0;
      break;
    default:
      throw new Error("Invalid gate");
  }

  wires.set(wire, value);
  return value;
};

console.log(parseInt(zWires.map(findWireValue).join(""), 2));
