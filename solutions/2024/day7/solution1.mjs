import fs from "fs";
import path from "path";

const checkIfEquationIsTrue = (equation, total = equation[1], index = 2) => {
  if (index >= equation.length) {
    return equation[0] === total;
  }

  return (
    checkIfEquationIsTrue(equation, total + equation[index], index + 1) ||
    checkIfEquationIsTrue(equation, total * equation[index], index + 1)
  );
};

const equations = [];
let result = 0;

const lines = fs
  .readFileSync(path.resolve(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");
lines.forEach((line) => {
  const parts = line
    .trim()
    .split(" ")
    .map((n) => parseInt(n));
  equations.push(parts);
});

equations.forEach((equation) => {
  if (checkIfEquationIsTrue(equation)) {
    result += equation[0];
  }
});

console.log(result);
