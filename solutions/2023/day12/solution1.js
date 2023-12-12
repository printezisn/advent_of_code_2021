const fs = require("fs");

const findTotalPossibleArrangements = (template, sequences, currentDamages = 0, templateIndex = 0, sequenceIndex = -1) => {
  if (templateIndex === template.length) {
    if (sequenceIndex !== sequences.length - 1) return 0;
    if (currentDamages > 0 && currentDamages !== sequences[sequenceIndex]) {
      return 0;
    }

    return 1;
  }

  if (template[templateIndex] === '#') {
    currentDamages++;
    if (currentDamages === 1) sequenceIndex++;
    if (sequenceIndex >= sequences.length || sequences[sequenceIndex] < currentDamages) {
      return 0;
    }

    return findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex + 1, sequenceIndex);
  }

  if (template[templateIndex] === '.') {
    if (currentDamages > 0 && sequences[sequenceIndex] !== currentDamages) {
      return 0;
    }

    return findTotalPossibleArrangements(template, sequences, 0, templateIndex + 1, sequenceIndex);
  }

  template[templateIndex] = '#';
  let total = findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex, sequenceIndex);
  template[templateIndex] = '.';
  total += findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex, sequenceIndex);
  template[templateIndex] = '?';

  return total;
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  const [template, sequencesList] = line.split(" ").map((p) => p.trim());
  const sequences = sequencesList.split(',').map(Number);

  total += findTotalPossibleArrangements([...template], sequences);
});

console.log(total);
