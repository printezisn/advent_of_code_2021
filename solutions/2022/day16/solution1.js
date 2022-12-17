const fs = require('fs');
const path = require('path');

const stateKey = ({ openValves, valve }) => `${Object.keys(openValves).sort().join(',')}|${valve}`;

const findMaxPressure = (valves) => {
  const actionsToDo = [{
    valve: 'AA',
    openValves: {},
    totalPressure: 0,
    remainingTime: 30
  }];
  const actionsDone = { '|AA': actionsToDo[0].totalPressure };
  let maxTotalPressure = 0;

  while (actionsToDo.length > 0) {
    const state = actionsToDo.shift();
    const { valve, openValves, totalPressure, remainingTime } = state;
  
    maxTotalPressure = Math.max(maxTotalPressure, totalPressure);
    if (remainingTime === 0) continue;
  
    const actions = [];

    if (!openValves[valve] && valves[valve].flowRate > 0) {
      actions.push({
        valve,
        openValves: { ...openValves, [valve]: true },
        totalPressure: totalPressure + valves[valve].flowRate * (remainingTime - 1),
        remainingTime: remainingTime - 1
      });
    }
  
    valves[valve].connections.forEach(connection => {
      actions.push({
        valve: connection,
        openValves,
        totalPressure,
        remainingTime: remainingTime - 1
      });
    });
  
    actions.forEach(action => {
      const actionKey = stateKey(action);
  
      if (actionsDone[actionKey] == null || actionsDone[actionKey] < action.totalPressure) {
        actionsDone[actionKey] = action.totalPressure;
        actionsToDo.push(action);
      }
    });
  }

  return maxTotalPressure;
};

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const valves = {};

lines.forEach(line => {
  const parts = line.split(' ');
  const name = parts[1];
  const flowRate = Number(parts[4].match(/rate=(\d+)/)[1]);
  const connections = parts.slice(9).map(connection => connection.trim().replace(/\,/g, ''));

  valves[name] = { flowRate, connections };
});

console.log(findMaxPressure(valves));