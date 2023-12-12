const fs = require("fs");

const findTotalPossibleArrangements = (template, sequences, index = 0) => {
  if (index >= template.length) {
    const parts = template
      .join("")
      .split(".")
      .filter(Boolean)
      .map((p) => p.length)
      .join(",");

    return parts === sequences ? 1 : 0;
  }
  if (template[index] !== "?") {
    return findTotalPossibleArrangements(template, sequences, index + 1);
  }

  template[index] = "#";
  let total = findTotalPossibleArrangements(template, sequences, index + 1);
  template[index] = ".";
  total += findTotalPossibleArrangements(template, sequences, index + 1);

  template[index] = "?";
  return total;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  const [template, sequences] = line.split(" ").map((p) => p.trim());

  total += findTotalPossibleArrangements([...template], sequences);
});

console.log(total);
