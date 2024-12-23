import fs from "fs";
import path from "path";

const allNodesSet = new Set();
const connections = new Map();

const addConnection = (node1, node2) => {
  if (!connections.has(node1)) {
    connections.set(node1, new Set());
  }

  connections.get(node1).add(node2);
};

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n");
lines.forEach((line) => {
  const nodes = line.split("-").map((n) => n.trim());
  addConnection(nodes[0], nodes[1]);
  addConnection(nodes[1], nodes[0]);
  allNodesSet.add(nodes[0]);
  allNodesSet.add(nodes[1]);
});

const allNodes = Array.from(allNodesSet);
const allPairs = new Set();

for (let i = 0; i < allNodes.length; i++) {
  for (let j = i + 1; j < allNodes.length; j++) {
    for (let k = j + 1; k < allNodes.length; k++) {
      let valid =
        allNodes[i][0] === "t" ||
        allNodes[j][0] === "t" ||
        allNodes[k][0] === "t";
      valid =
        valid &&
        connections.get(allNodes[i]).has(allNodes[j]) &&
        connections.get(allNodes[j]).has(allNodes[k]) &&
        connections.get(allNodes[k]).has(allNodes[i]);

      if (valid) {
        allPairs.add([allNodes[i], allNodes[j], allNodes[k]].toString());
      }
    }
  }
}

console.log(allPairs.size);
