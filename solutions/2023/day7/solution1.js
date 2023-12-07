const fs = require("fs");

const cardTypes = Object.freeze({
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
});

const handTypes = Object.freeze({
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
});

const getHandType = (hand) => {
  const hash = {};

  for (let i = 0; i < hand.length; i++) {
    hash[hand[i]] = (hash[hand[i]] || 0) + 1;
  }
  const totalUniqueCards = Object.keys(hash).length;
  const cardPopulation = Object.values(hash);

  if (cardPopulation.includes(5)) return "FiveOfAKind";
  if (cardPopulation.includes(4)) {
    return "FourOfAKind";
  }
  if (cardPopulation.includes(3)) {
    return cardPopulation.includes(2) ? "FullHouse" : "ThreeOfAKind";
  }
  if (totalUniqueCards < 5) {
    return totalUniqueCards === 3 ? "TwoPair" : "OnePair";
  }

  return "HighCard";
};

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const hands = [];
lines.forEach((line) => {
  const [hand, bid] = line.split(" ");

  hands.push([hand.trim(), Number(bid.trim())]);
});

hands.sort((a, b) => {
  const firstHand = a[0];
  const secondHand = b[0];

  const handTypeDiff =
    handTypes[getHandType(firstHand)] - handTypes[getHandType(secondHand)];
  if (handTypeDiff !== 0) return handTypeDiff;

  for (let i = 0; i < firstHand.length; i++) {
    const cardDiff = cardTypes[firstHand[i]] - cardTypes[secondHand[i]];
    if (cardDiff !== 0) return cardDiff;
  }

  return 0;
});

let result = 0;

for (let i = 0; i < hands.length; i++) {
  result += hands[i][1] * (i + 1);
}

console.log(result);
