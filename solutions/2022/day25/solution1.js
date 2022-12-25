const fs = require('fs');
const path = require('path');

const snafuToDecimal = snafuNum => {
  let num = 0, pow = 1;

  for (let i = snafuNum.length - 1; i >= 0; i--) {
    let digit = null;

    if (snafuNum[i] === '-') digit = -1;
    else if (snafuNum[i] === '=') digit = -2;
    else digit = Number(snafuNum[i]);

    num += digit * pow;
    pow *= 5;
  }

  return num;
}

const decimalToSnafu = num => {
  const snafuNum = [], digitMap = ['0', '1', '2', '=', '-'];

  while (num > 0) {
    const digit = num % 5;
    const extra = (digit >= 3) ? 1 : 0;

    snafuNum.unshift(digitMap[digit]);
    num = Math.floor(num / 5) + extra;
  }

  return snafuNum.join('');
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const sum = fileContent.split('\n').map(snafuToDecimal).reduce((s, n) => s + n, 0);

console.log(decimalToSnafu(sum));
