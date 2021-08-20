"use strict";
var pathing = {
    allRows: document.getElementsByClassName("row"),
    allCells: document.getElementsByClassName("cell"),
    neighboursArr: [1, -1],
    startCell: undefined,
    startNode: { actualCell: undefined, predecessorNode: undefined, shortestPath: 0 },
    targetCell: undefined,
    targetNode: { actualCell: undefined, predecessorNode: undefined, shortestPath: Infinity },
    allNodes: new Array(),
    visitedNodes: new Array(),
    usedIDs: new Array()
};
function dijkstra(startCell, targetCell, rowLength) {
    playfield.algoInProgress = true;
    playfield.needsReset;
    // setting missing values for start-/targetNode
    pathing.startNode.actualCell = startCell;
    pathing.targetNode.actualCell = targetCell;
    // adding missing values to identify neighbours;
    pathing.neighboursArr.push(rowLength, -rowLength);
    pathing.allNodes.push(pathing.startNode);
    // starting dijkstra
    let currentNode = pathing.startNode;
    let currentID = currentNode.actualCell.id;
    let i = 0;
    while (pathing.allNodes.length >= pathing.visitedNodes.length && playfield.algoInProgress === true) {
        if (currentNode === undefined) {
            break;
        }
        else if (currentNode.actualCell.id === targetCell.id) {
            waitForColors(currentNode, i);
            break;
        }
        pathing.neighboursArr.forEach((num) => {
            let testCell = pathing.allCells[Number(currentID) + num];
            if (testCell !== undefined) {
                if (pathing.usedIDs.includes(testCell.id) === false) {
                    const newNeighbour = {
                        actualCell: testCell,
                        predecessorNode: currentNode,
                        shortestPath: currentNode.shortestPath + 1
                    };
                    pathing.usedIDs.push(testCell.id);
                    pathing.allNodes.push(newNeighbour);
                }
            }
        });
        delayColors(currentNode, i);
        i++;
        pathing.visitedNodes.push(currentNode);
        currentNode = pathing.allNodes[i];
        currentID = currentNode.actualCell.id;
    }
}
