import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());
const registers = lines
  .slice(0, 3)
  .map((line) => Number(line.match(/\d+/g)[0]));
const instructions = lines[4].match(/(\d+)/g).map(Number);
const output = [];
let instructionIndex = 0;

const operand = (index) => (index < 4 ? index : registers[index - 4]);
const instruction = [
  (op) => {
    const p = 2 ** operand(op);
    registers[0] = Math.floor(registers[0] / p);
    instructionIndex += 2;
  },
  (op) => {
    registers[1] = (registers[1] ^ op) >>> 0;
    instructionIndex += 2;
  },
  (op) => {
    registers[1] = operand(op) % 8;
    instructionIndex += 2;
  },
  (op) => {
    instructionIndex = registers[0] === 0 ? instructionIndex + 2 : op;
  },
  () => {
    registers[1] = (registers[1] ^ registers[2]) >>> 0;
    instructionIndex += 2;
  },
  (op) => {
    output.push(operand(op) % 8);
    instructionIndex += 2;
  },
  (op) => {
    const p = 2 ** operand(op);
    registers[1] = Math.floor(registers[0] / p);
    instructionIndex += 2;
  },
  (op) => {
    const p = 2 ** operand(op);
    registers[2] = Math.floor(registers[0] / p);
    instructionIndex += 2;
  },
];

while (instructionIndex < instructions.length) {
  instruction[instructions[instructionIndex]](
    instructions[instructionIndex + 1]
  );
}

console.log(output.join(","));
