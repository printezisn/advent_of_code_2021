const fs = require('fs');
const path = require('path');

const resourceTypeHarvestInMinutes = (minutes, resources, robots, type) => {
  return resources[type] + robots[type] * minutes;
};

const resourcesHarvestInMinutes = (minutes, resources, robots) => {
  const newResources = {};

  ['ore', 'clay', 'obsidian', 'geode'].forEach(resourceType => {
    newResources[resourceType] = resourceTypeHarvestInMinutes(minutes, resources, robots, resourceType);
  });

  return newResources;
};

const minutesToHarvestResource = (resources, robots, type, required) => {
  if (!robots[type]) return null;
  if (resources[type] >= required) return 1;

  return Math.ceil((required - resources[type]) / robots[type]) + 1;
};

const minutesToProduceRobot = (blueprint, resources, robots, type) => {
  const minutesPerResourceType = Object
    .keys(blueprint[type])
    .map(resourceType => minutesToHarvestResource(resources, robots, resourceType, blueprint[type][resourceType]));
  if (minutesPerResourceType.some(type => type == null)) return null;

  return minutesPerResourceType.reduce((max, minutes) => Math.max(max, minutes), 1);
}

const calculateResourcesAfterRobotProduction = (blueprint, requiredMinutes, resources, robots, robotType) => {
  const newResources = resourcesHarvestInMinutes(requiredMinutes, resources, robots);

  for (const resourceType in blueprint[robotType]) {
    newResources[resourceType] -= blueprint[robotType][resourceType];
  }

  return newResources;
}

const calculateMaxGeodes = (
  blueprint,
  maxResourcesPerBlueprint,
  remainingMinutes,
  resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 },
  robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 }
) => {
  let maxGeode = null;

  Object.keys(blueprint).reverse().forEach(robotType => {
    if (maxResourcesPerBlueprint[robotType] && robots[robotType] >= maxResourcesPerBlueprint[robotType]) return

    const requiredMinutes = minutesToProduceRobot(blueprint, resources, robots, robotType);
    if (requiredMinutes == null || requiredMinutes > remainingMinutes) return;

    const newResources = calculateResourcesAfterRobotProduction(blueprint, requiredMinutes, resources, robots, robotType);
    const newRobots = { ...robots, [robotType]: robots[robotType] + 1 };

    maxGeode = Math.max(
      maxGeode || 0,
      calculateMaxGeodes(blueprint, maxResourcesPerBlueprint, remainingMinutes - requiredMinutes, newResources, newRobots)
    );
  });

  if (maxGeode == null) {
    maxGeode = resourceTypeHarvestInMinutes(remainingMinutes, resources, robots, 'geode');
  }

  return maxGeode;
}

const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8', flag: 'r' });
const lines = fileContent.split('\n');
const blueprints = [], maxResourcesPerBlueprint = [];
let total = 0;

lines.forEach(line => {
  const robotSpecs = line.split(':')[1].trim().split('.').map(spec => spec.trim()).filter(Boolean);
  const blueprint = {}, maxResources = {};

  robotSpecs.forEach(spec => {
    let match = spec.match(/^Each (\w+) robot costs (\d+) (\w+)$/);
    if (match) {
      blueprint[match[1]] = { [match[3]]: Number(match[2]) };
      return;
    }

    match = spec.match(/^Each (\w+) robot costs (\d+) (\w+) and (\d+) (\w+)$/);
    blueprint[match[1]] = { [match[3]]: Number(match[2]), [match[5]]: Number(match[4]) };
  });

  for (const robotType in blueprint) {
    for (const resourceType in blueprint[robotType]) {
      maxResources[resourceType] = Math.max(
        maxResources[resourceType] || 0,
        blueprint[robotType][resourceType]
      );
    }
  }

  blueprints.push(blueprint);
  maxResourcesPerBlueprint.push(maxResources);
})

blueprints.forEach((blueprint, i) => {
  const quality = calculateMaxGeodes(blueprint, maxResourcesPerBlueprint[i], 24);

  console.log(quality);

  total += (i + 1) * quality;
});

console.log();
console.log(total);