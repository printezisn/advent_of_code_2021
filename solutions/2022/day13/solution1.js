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

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let total = 0;

for (let i = 0, index = 1; i < lines.length; i += 3, index++) {
  if (compareLists(JSON.parse(lines[i]), JSON.parse(lines[i + 1])) >= 0) {
    total += index;
  }
}

console.log(total);
