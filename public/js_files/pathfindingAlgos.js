"use strict";
// var pathingRelated:any = {
//     startCell: undefined,
//     allNodes: new Array<myNode>(),
//     visitedNodes: new Array<myNode>(),
//     startNode: {actualCell:undefined, predecessorNode:undefined, shortestPath:0},
//     targetCell: undefined,
//     targetFound: false,
//     targetID: undefined,
// }
var pathing = {
    startCell: undefined,
    targetCell: undefined,
    nextNodes: new Array(),
};
function dijkstra(startCell, targetCell, rowSize) {
    let neighboursArray = [1, -1, rowSize, -rowSize];
    let startNode = { actualCell: startCell, predecessorNode: undefined, shortestPath: 0 };
    startNode.predecessorNode = startNode;
}
function dijkstraLoop() {
}
