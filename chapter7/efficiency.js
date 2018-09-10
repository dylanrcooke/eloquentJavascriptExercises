/* 
    Robot efficiency
    Can you write a robot that finishes the delivery task faster than goalOrientedRobot? If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

    If you solved the previous exercise, you might want to use your compareRobots function to verify whether you improved the robot. 
*/

const { roadGraph, VillageState, findRoute} = require("./07_robot");

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

runRobotAnimation(VillageState.random(), closestPickupThenDeliveryRobot, memory);

