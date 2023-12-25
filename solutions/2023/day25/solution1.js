const fs = require("fs");

const reset = (graph) => {
  Object.values(graph).forEach((node) => {
    node.group = null;
  });
};

const mark = (graph) => {
  let totalGroups = 0;

  Object.values(graph).forEach((head) => {
    if (head.group) return;

    totalGroups++;

    const nodesToVisit = [head];

    while (nodesToVisit.length > 0) {
      const node = nodesToVisit.shift();
      if (node.group) continue;

      node.group = totalGroups;

      Object.keys(node.connections).forEach((c) => {
        nodesToVisit.push(graph[c]);
      });
    }
  });

  return totalGroups;
};

const getAllConnections = (graph) => {
  const connections = {};

  Object.keys(graph).forEach((name) => {
    Object.keys(graph[name].connections).forEach((c) => {
      const connection = [name, c].sort();
      connections[connection] = connection;
    });
  });

  return Object.values(connections);
};

const getTotalNodesPerGroup = (graph) => {
  const groups = {};

  Object.values(graph).forEach((node) => {
    groups[node.group] = groups[node.group] || 0;
    groups[node.group]++;
  });

  return groups;
};

const findGroups = (graph) => {
  delete graph["dvr"].connections["bbp"];
  delete graph["bbp"].connections["dvr"];
  delete graph["jzv"].connections["qvq"];
  delete graph["qvq"].connections["jzv"];

  const allConnections = getAllConnections(graph);

  for (let i = 0; i < allConnections.length; i++) {
    delete graph[allConnections[i][0]].connections[allConnections[i][1]];
    delete graph[allConnections[i][1]].connections[allConnections[i][0]];

    if (mark(graph) === 2) return;
    reset(graph);

    graph[allConnections[i][0]].connections[allConnections[i][1]] = true;
    graph[allConnections[i][1]].connections[allConnections[i][0]] = true;
  }
};

const graph = {};

fs.readFileSync("./input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const [name, connections] = line.trim().split(":");
    graph[name] = graph[name] || { connections: {} };
    connections.split(" ").forEach((connection) => {
      const c = connection.trim();
      if (!c) return;

      graph[c] = graph[c] || {
        connections: {},
      };

      graph[c].connections[name] = true;
      graph[name].connections[c] = true;
    });
  });

findGroups(graph);
const totalNodes = getTotalNodesPerGroup(graph);

console.log(totalNodes[1] * totalNodes[2]);
