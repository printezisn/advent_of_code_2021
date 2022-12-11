/*const monkeys = [
  { items: [79, 98], multiply: 19, test: 23, decision: [2, 3], inspections: 0 },
  { items: [54, 65, 75, 74], add: 6, test: 19, decision: [2, 0], inspections: 0 },
  { items: [79, 60, 97], multiply: 'self', test: 13, decision: [1, 3], inspections: 0 },
  { items: [74], add: 3, test: 17, decision: [0, 1], inspections: 0 },
];*/

const monkeys = [
  { items: [56, 52, 58, 96, 70, 75, 72], multiply: 17, test: 11, decision: [2, 3], inspections: 0 },
  { items: [75, 58, 86, 80, 55, 81], add: 7, test: 3, decision: [6, 5], inspections: 0 },
  { items: [73, 68, 73, 90], multiply: 'self', test: 5, decision: [1, 7], inspections: 0 },
  { items: [72, 89, 55, 51, 59], add: 1, test: 7, decision: [2, 7], inspections: 0 },
  { items: [76, 76, 91], multiply: 3, test: 19, decision: [0, 3], inspections: 0 },
  { items: [88], add: 4, test: 2, decision: [6, 4], inspections: 0 },
  { items: [64, 63, 56, 50, 77, 55, 55, 86], add: 8, test: 13, decision: [4, 0], inspections: 0 },
  { items: [79, 58], add: 6, test: 17, decision: [1, 5], inspections: 0 },
];

for (let i = 0; i < 20; i++) {
  monkeys.forEach(monkey => {
    monkey.items.forEach(item => {
      let worryLevel = 0;

      if (monkey.multiply === 'self') worryLevel = item * item;
      else if (monkey.multiply) worryLevel = item * monkey.multiply;
      else if (monkey.add) worryLevel = item + monkey.add;

      worryLevel = Math.floor(worryLevel / 3);

      const recipient = (worryLevel % monkey.test === 0) ? monkey.decision[0] : monkey.decision[1];
      monkeys[recipient].items.push(worryLevel); 
    });

    monkey.inspections += monkey.items.length;
    monkey.items = [];
  });
}

monkeys.sort((a, b) => b.inspections - a.inspections);

console.log(monkeys[0].inspections * monkeys[1].inspections);