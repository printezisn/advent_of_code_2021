const fs = require("fs");

const findTotalPossibleArrangements = (template, sequences, currentDamages = 0, templateIndex = 0, sequenceIndex = -1, cache = {}) => {
  const key = [templateIndex, sequenceIndex, currentDamages].join(',');

  if (cache[key] != null) {
    return cache[key];
  }

  if (templateIndex === template.length) {
    if (sequenceIndex !== sequences.length - 1) return (cache[key] = 0);
    if (currentDamages > 0 && currentDamages !== sequences[sequenceIndex]) {
      return (cache[key] = 0);
    }

    return (cache[key] = 1);
  }

  if (template[templateIndex] === '#') {
    currentDamages++;
    if (currentDamages === 1) sequenceIndex++;
    if (sequenceIndex >= sequences.length || sequences[sequenceIndex] < currentDamages) {
      return (cache[key] = 0);
    }

    return (cache[key] = findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex + 1, sequenceIndex, cache));
  }

  if (template[templateIndex] === '.') {
    if (currentDamages > 0 && sequences[sequenceIndex] !== currentDamages) {
      return (cache[key] = 0);
    }

    return (cache[key] = findTotalPossibleArrangements(template, sequences, 0, templateIndex + 1, sequenceIndex, cache));
  }

  template[templateIndex] = '#';
  let total = findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex, sequenceIndex, cache);
  template[templateIndex] = '.';
  delete cache[key];
  total += findTotalPossibleArrangements(template, sequences, currentDamages, templateIndex, sequenceIndex, cache);
  template[templateIndex] = '?';

  return (cache[key] = total);
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

let total = 0;

lines.forEach((line) => {
  let [template, sequencesList] = line.split(" ").map((p) => p.trim());

  template = Array(5).fill([...template].join('')).join('?');
  sequencesList = Array(5).fill([...sequencesList].join('')).join(',');
  const sequences = sequencesList.split(',').map(Number);

  total += findTotalPossibleArrangements([...template], sequences);
});

console.log(total);
