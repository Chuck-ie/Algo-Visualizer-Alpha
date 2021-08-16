"use strict";
function dijkstra(start, target, rowSize) {
    myGlobalVars.allCells = document.getElementsByClassName("gridCells");
    myGlobalVars.targetID = target.id;
    myGlobalVars.startNode.actualCell = start;
    // append start- and targetNode to allNodes (start always index 1; target always index 0)
    myGlobalVars.allNodes.push(myGlobalVars.startNode);
    dijkstraLoop(myGlobalVars.startNode, rowSize);
}
function dijkstraLoop(currNode, rowSize, j = 0) {
    // let neighboursArr = [1, -1, rowSize, -rowSize];
    let neighboursArr = [-1, -rowSize - 1, -rowSize, -rowSize + 1, 1, rowSize + 1, rowSize, rowSize - 1];
    if (currNode.actualCell.id == myGlobalVars.targetID) {
        markShortestPath(currNode);
        return;
    }
    if (j > 0) {
        colorizeNode(currNode);
    }
    j += 1;
    checkNeighbours(currNode, neighboursArr);
    myGlobalVars.visitedNodes.push(currNode);
    let nextNode = getNextNode(currNode);
    if (nextNode.actualCell != undefined) {
        setTimeout(() => {
            dijkstraLoop(nextNode, rowSize, j);
        }, myGlobalVars.colorizeDelay * myGlobalVars.speedMultiplier);
    }
    else {
        alert(`There is no Path to the specified target.\nShortest path: ${Infinity}`);
    }
}
function checkNeighbours(currNode, neighboursArr) {
    if (neighboursArr.length === 0) {
        return;
    }
    let validNeighbour = { actualCell: undefined, predecessorNode: currNode, shortestPath: Infinity };
    let currID = Number(currNode.actualCell.id);
    let notValid = myGlobalVars.allNodes.map((node) => {
        return Number(node.actualCell.id);
    });
    if (currID + neighboursArr[0] >= 0 && currID + neighboursArr[0] < myGlobalVars.allCells.length) {
        if (notValid.includes(currID + neighboursArr[0])) {
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
        else {
            validNeighbour.actualCell = myGlobalVars.allCells[currID + neighboursArr[0]];
            validNeighbour.shortestPath = currNode.shortestPath + 1;
            myGlobalVars.allNodes.push(validNeighbour);
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
    }
}
function colorizeNode(currNode) {
    currNode.actualCell.setAttribute("style", "background-color:#FFE400;");
    setTimeout(() => {
        currNode.actualCell.setAttribute("style", "background-color:#FC4445;");
    }, myGlobalVars.colorizeDelay * myGlobalVars.speedMultiplier);
}
function markShortestPath(currNode) {
    if (currNode == undefined) {
        return;
    }
    if (currNode.predecessorNode != currNode) {
        currNode.actualCell.setAttribute("style", "background-color:#86C232;");
        setTimeout(() => {
            markShortestPath(currNode.predecessorNode);
        }, myGlobalVars.colorizeDelay * myGlobalVars.speedMultiplier);
    }
    else {
        currNode.actualCell.setAttribute("style", "background-color:#86C232;");
    }
}
function getNextNode(currNode) {
    let next = { actualCell: undefined, predecessorNode: undefined, shortestPath: Infinity };
    let validNextNodes = myGlobalVars.allNodes.filter((node) => {
        return !myGlobalVars.visitedNodes.includes(node);
    });
    for (let i = 0; i < validNextNodes.length; i++) {
        if (validNextNodes[i].shortestPath < next.shortestPath) {
            next = validNextNodes[i];
        }
    }
    return next;
}
