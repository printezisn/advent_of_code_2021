const fs = require('fs');
const path = require('path');

const stateKey = ({ openValves, valve }) => `${Object.keys(openValves).sort().join(',')}|${valve}`;

const findMaxPressure = (valves, openValves = {}, mustHelp = true) => {
  const actionsToDo = [{
    valve: 'AA',
    openValves: { ...openValves },
    totalPressure: 0,
    remainingTime: 26
  }];
  const actionsDone = { '|AA': actionsToDo[0].totalPressure };
  let maxTotalPressure = 0;

  while (actionsToDo.length > 0) {
    const state = actionsToDo.shift();
    const { valve, openValves, totalPressure, remainingTime } = state;
    const actions = [];
    let hasNewActions = false;

    if (!openValves[valve] && valves[valve].flowRate > 0 && remainingTime > 0) {
      actions.push({
        valve,
        openValves: { ...openValves, [valve]: true },
        totalPressure: totalPressure + valves[valve].flowRate * (remainingTime - 1),
        remainingTime: remainingTime - 1
      });
    }

    for (const connection in valves[valve].connections) {
      if (remainingTime < valves[valve].connections[connection]) continue;

      actions.push({
        valve: connection,
        openValves,
        totalPressure,
        remainingTime: remainingTime - valves[valve].connections[connection]
      });
    }

    actions.forEach(action => {
      const actionKey = stateKey(action);
  
      if (actionsDone[actionKey] == null || actionsDone[actionKey] < action.totalPressure) {
        actionsDone[actionKey] = action.totalPressure;
        actionsToDo.push(action);
        hasNewActions = true;
      }
    });

    if (!hasNewActions) {
      let pressureToConsider = totalPressure;

      if (mustHelp) pressureToConsider += findMaxPressure(valves, openValves, false);

      maxTotalPressure = Math.max(maxTotalPressure, pressureToConsider);
    }
  }

  return maxTotalPressure;
};

const getConnections = (valves, valve, depth = 0, visited = {}) => {
  if (visited[valve]) return {};
  if (depth > 0 && valves[valve].flowRate > 0) return { [valve]: depth };

  visited[valve] = true;

  const result = {};

  valves[valve].connections.forEach(connection => {
    const innerConnections = getConnections(valves, connection, depth + 1, visited);

    for (const innerConnection in innerConnections) {
      if (result[innerConnection] == null || innerConnections[innerConnection] < result[innerConnection]) {
        result[innerConnection] = innerConnections[innerConnection];
      }
    }
  });

  delete visited[valve];

  return result;
};

const createGraph = valves => {
  const graph = {};

  for (const valve in valves) {
    graph[valve] = { flowRate: valves[valve].flowRate, connections: getConnections(valves, valve) };
  }

  return graph;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
let valves = {};

lines.forEach(line => {
  const parts = line.split(' ');
  const name = parts[1];
  const flowRate = Number(parts[4].match(/rate=(\d+)/)[1]);
  const connections = parts.slice(9).map(connection => connection.trim().replace(/\,/g, ''));

  valves[name] = { flowRate, connections };
});

valves = createGraph(valves);

console.log(findMaxPressure(valves));