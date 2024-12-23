import fs from "fs";
import path from "path";

const allNodesSet = new Set();
const connections = new Map();
let maxGroup = [];

const addConnection = (node1, node2) => {
  if (!connections.has(node1)) {
    connections.set(node1, new Set());
  }

  connections.get(node1).add(node2);
};

const intersection = (set1, set2) => {
  const set = new Set();

  set1.forEach((s) => {
    if (set2.has(s)) {
      set.add(s);
    }
  });

  return set;
};

const findMaxGroup = (group, candidates, considered) => {
  if (candidates.size === 0 && considered.size === 0) {
    if (maxGroup.length < group.length) {
      maxGroup = Array.from(group).sort();
    }

    return;
  }

  while (candidates.size > 0) {
    const candidate = candidates.values().next().value;
    group.push(candidate);

    findMaxGroup(
      group,
      intersection(candidates, connections.get(candidate)),
      intersection(considered, connections.get(candidate))
    );

    group.pop();
    candidates.delete(candidate);
    considered.add(candidate);
  }
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

findMaxGroup([], allNodesSet, new Set());
console.log(maxGroup.join(","));
