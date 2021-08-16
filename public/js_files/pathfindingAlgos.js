"use strict";
var pathingRelated = {
    allNodes: new Array(),
    visitedNodes: new Array(),
    startNode: { actualCell: undefined, predecessorNode: undefined, shortestPath: 0 },
    targetCell: undefined,
    targetFound: false,
    startCell: undefined,
    targetID: undefined,
};
function newDijkstra(startCell, targetCell, rowSize) {
}
function dijkstra(start, target, rowSize) {
    pathingRelated.targetID = target.id;
    pathingRelated.startNode.actualCell = start;
    // append start- and targetNode to allNodes (start always index 1; target always index 0)
    pathingRelated.allNodes.push(pathingRelated.startNode);
    dijkstraLoop(pathingRelated.startNode, rowSize);
}
function dijkstraLoop(currNode, rowSize, j = 0) {
    // let neighboursArr = [1, -1, rowSize, -rowSize];
    let neighboursArr = [-1, -rowSize - 1, -rowSize, -rowSize + 1, 1, rowSize + 1, rowSize, rowSize - 1];
    if (currNode.actualCell.id == pathingRelated.targetID) {
        markShortestPath(currNode);
        return;
    }
    if (j > 0) {
        colorizeNode(currNode);
    }
    j += 1;
    checkNeighbours(currNode, neighboursArr);
    pathingRelated.visitedNodes.push(currNode);
    let nextNode = getNextNode(currNode);
    if (nextNode.actualCell != undefined) {
        setTimeout(() => {
            dijkstraLoop(nextNode, rowSize, j);
        }, pathingRelated.colorizeDelay * pathingRelated.speedMultiplier);
    }
    else {
        alert(`There is no Path to the specified target.\nShortest path: ${Infinity}`);
    }
}
function checkNeighbours(currNode, neighboursArr) {
    let allCells = document.getElementsByClassName("gridCells");
    if (neighboursArr.length === 0) {
        return;
    }
    let validNeighbour = { actualCell: undefined, predecessorNode: currNode, shortestPath: Infinity };
    let currID = Number(currNode.actualCell.id);
    let notValid = pathingRelated.allNodes.map((node) => {
        return Number(node.actualCell.id);
    });
    if (currID + neighboursArr[0] >= 0 && currID + neighboursArr[0] < allCells.length) {
        if (notValid.includes(currID + neighboursArr[0])) {
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
        else {
            validNeighbour.actualCell = allCells[currID + neighboursArr[0]];
            validNeighbour.shortestPath = currNode.shortestPath + 1;
            pathingRelated.allNodes.push(validNeighbour);
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
    }
}
function colorizeNode(currNode) {
    currNode.actualCell.setAttribute("style", "background-color:#FFE400;");
    setTimeout(() => {
        currNode.actualCell.setAttribute("style", "background-color:#FC4445;");
    }, playfieldMenuRelated.colorizeDelay * playfieldMenuRelated.speedMultiplier);
}
function markShortestPath(currNode) {
    if (currNode == undefined) {
        return;
    }
    if (currNode.predecessorNode != currNode) {
        currNode.actualCell.setAttribute("style", "background-color:#86C232;");
        setTimeout(() => {
            markShortestPath(currNode.predecessorNode);
        }, playfieldMenuRelated.colorizeDelay * playfieldMenuRelated.speedMultiplier);
    }
    else {
        currNode.actualCell.setAttribute("style", "background-color:#86C232;");
    }
}
function getNextNode(currNode) {
    let next = { actualCell: undefined, predecessorNode: undefined, shortestPath: Infinity };
    let validNextNodes = pathingRelated.allNodes.filter((node) => {
        return !pathingRelated.visitedNodes.includes(node);
    });
    for (let i = 0; i < validNextNodes.length; i++) {
        if (validNextNodes[i].shortestPath < next.shortestPath) {
            next = validNextNodes[i];
        }
    }
    return next;
}
