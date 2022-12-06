const fs = require('fs');
const path = require('path');
const { listenerCount } = require('process');

const signal = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const hash = {};

for (let i = 0; i < signal.length; i++) {
  if (i >= 14) {
    hash[signal[i - 14]]--;
    if (!hash[signal[i - 14]]) delete hash[signal[i - 14]];
  }

  hash[signal[i]] = (hash[signal[i]] || 0) + 1;
  if (Object.keys(hash).length === 14) {
    console.log(i + 1);
    break;
  }
}