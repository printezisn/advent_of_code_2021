const fs = require('fs');
const path = require('path');

const showList = head => {
  for (let node = head; node.next !== head; node = node.next) {
    console.log(node.realValue);
  }

  console.log(head.prev.realValue);
};

const findInList = (head, num) => {
  if (head.realValue === num) return head;

  for (node = head.next; node.next !== head; node = node.next) {
    if (node.realValue === num) return node;
  }

  return null;
};

const nthNodeForward = (node, n) => {
  for (let i = 0; i < n; i++) node = node.next;

  return node;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
let head = null, tail = null, originalNodes = [];

fileContent.split('\n').forEach(line => {
  const newTail = {
    value: Number(line) * 811589153,
    realValue: Number(line) * 811589153,
    prev: tail,
    next: null
  };

  tail = newTail;
  if (head == null) head = tail;
  if (tail.prev != null) tail.prev.next = tail;

  originalNodes.push(tail);
});

tail.next = head;
head.prev = tail;

for (let i = 0; i < originalNodes.length; i++) {
  originalNodes[i].value %= (originalNodes.length - 1);
}

for (let tries = 0; tries < 10; tries++) {
  for (let i = 0; i < originalNodes.length; i++) {
    const current = originalNodes[i];

    if (current.value >= 0) {
      for (let j = 0; j < current.value; j++) {
        if (current === head) head = current.next;

        const destination = current.next;

        current.prev.next = destination;
        destination.prev = current.prev;

        current.next = destination.next;
        current.prev = destination;

        destination.next.prev = current;
        destination.next = current;
      }
    } else {
      for (let j = 0; j < -current.value; j++) {
        if (current === head) head = current.next;

        const destination = current.prev;

        current.next.prev = destination;
        destination.next = current.next;

        current.prev = destination.prev;
        current.next = destination;

        destination.prev.next = current;
        destination.prev = current;
      }
    }
  }
}

showList(head);
console.log();

const zeroNode = findInList(head, 0);
console.log(nthNodeForward(zeroNode, 1000).realValue + nthNodeForward(zeroNode, 2000).realValue + nthNodeForward(zeroNode, 3000).realValue)
