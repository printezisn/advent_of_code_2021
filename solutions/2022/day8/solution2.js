const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let i, j, k, max = 0;

for (i = 0; i < lines.length; i++) {
  for (j = 0; j < lines[i].length; j++) {
    let topView = 0, leftView = 0, rightView = 0, bottomView = 0;

    for (k = i - 1; k >= 0; k--) {
      topView++;
      if (lines[k][j] >= lines[i][j]) break;
    }

    for (k = i + 1; k < lines.length; k++) {
      bottomView++;
      if (lines[k][j] >= lines[i][j]) break;
    }

    for (k = j - 1; k >= 0; k--) {
      leftView++;
      if (lines[i][k] >= lines[i][j]) break;
    }

    for (k = j + 1; k < lines[i].length; k++) {
      rightView++;
      if (lines[i][k] >= lines[i][j]) break;
    }

    const score = topView * rightView * bottomView * leftView;
    max = Math.max(max, score);
  }
}

console.log(max);