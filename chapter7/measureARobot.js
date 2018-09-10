
/**
 *  Measuring a robot
    It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks or the kind of tasks that it is good at, whereas the other didn’t.

    Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

    For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot. 
*/

const { findRoute, goalOrientedRobot, roadGraph, VillageState} = require("./07_robot");

const PARCELS_PER_TEST = 5;
const NUM_TESTS = 100;

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
          return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
      }
}

function getAverage(array) {
    return array.reduce((tot, val) => tot + val, 0) / array.length;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    const results1 = [];
    const results2 = [];
    for (let tests = 0; tests < NUM_TESTS; tests++){
        const state = VillageState.random(PARCELS_PER_TEST);
        results1.push(runRobot(state, robot1, memory1));
        results2.push(runRobot(state, robot2, memory2));
    }
    console.log(`Robot 1 - avg steps per task: ${getAverage(results1)}`);
    console.log(`Robot 2 - avg steps per task: ${getAverage(results2)}`);
}

function compareDistance(routeA, routeB) {
    return routeA !== undefined && (routeA <= routeB || routeB === undefined) ? routeA : routeB;
}

function closestPickupThenDeliveryRobot({place, parcels}, route) {
    if (route.length == 0) {
        const bestPickup = parcels.filter(p => p.place !== place)
                            .map(p => findRoute(roadGraph, place, p.place))
                            .reduce((best, val) => compareDistance(val, best), undefined);
        const bestDelivery = parcels.filter(p => p.place === place)
                            .map(p => findRoute(roadGraph, place, p.address))
                            .reduce((best, val) => compareDistance(val, best), undefined);
        route = compareDistance(bestPickup, bestDelivery);
    }
    return {direction: route[0], memory: route.slice(1)};
}

compareRobots(closestPickupThenDeliveryRobot, [], goalOrientedRobot, []);