const fs = require('fs');
const path = require('path');

const compareLists = (leftList, rightList) => {
  let i;

  for (i = 0; i < leftList.length; i++) {
    if (i >= rightList.length) return -1;
    
    if (Array.isArray(leftList[i]) || Array.isArray(rightList[i])) {
      const leftSubList = Array.isArray(leftList[i]) ? leftList[i] : [leftList[i]];
      const rightSubList = Array.isArray(rightList[i]) ? rightList[i] : [rightList[i]];
      const result = compareLists(leftSubList, rightSubList);

      if (result !== 0) return result;
    } else if (leftList[i] !== rightList[i]) {
      return leftList[i] < rightList[i] ? 1 : -1;
    }
  }

  return leftList.length === rightList.length ? 0 : 1;
};

let total = 1;
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const packets = fileContent
  .split('\n')
  .filter(line => line.trim())
  .map(JSON.parse);

packets.push([[2]]);
packets.push([[6]]);

packets.sort((a, b) => compareLists(b, a));

packets.forEach((packet, i) => {
  const packetStr = JSON.stringify(packet);

  if (packetStr === JSON.stringify([[2]]) || packetStr === JSON.stringify([[6]])) {
    total *= (i + 1);
  }
});

console.log(total);
