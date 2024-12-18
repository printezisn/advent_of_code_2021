const numberToBits = (num) => {
  const bits = Array(3).fill(0);

  for (let i = 0; i < 3; i++) {
    bits[2 - i] = num & (1 << i) ? 1 : 0;
  }

  return bits;
};

const setNumBits = (number, numberToSet, offset) => {
  const bits = numberToBits(numberToSet);
  for (let i = 0; i < bits.length; i++) {
    const valid =
      number[offset - i] === null ||
      number[offset - i] === bits[bits.length - 1 - i];
    if (!valid) return false;

    number[offset - i] = bits[bits.length - 1 - i];
  }

  return true;
};

const fillNumber = (number, forcedOutput, index = 0) => {
  if (index >= forcedOutput.length) {
    return parseInt(number.map((n) => n ?? 0).join(""), 2);
  }

  const lowOffset = number.length - 1 - index * 3;
  let result = Infinity;

  for (let lowNum = 0; lowNum < 8; lowNum++) {
    const copy = Array.from(number);
    const highOffset = lowOffset - [5, 4, 7, 6, 1, 0, 3, 2][lowNum];
    const highNum =
      (([3, 2, 1, 0, 7, 6, 5, 4][lowNum] ^ forcedOutput[index]) >>> 0) % 8;

    if (
      !setNumBits(copy, lowNum, lowOffset) ||
      !setNumBits(copy, highNum, highOffset)
    ) {
      continue;
    }

    const candidate = fillNumber(copy, forcedOutput, index + 1);
    result = Math.min(result, candidate);
  }

  return result;
};

const result = fillNumber(
  Array(64).fill(null),
  [2, 4, 1, 5, 7, 5, 1, 6, 0, 3, 4, 2, 5, 5, 3, 0]
);

console.log(result);
