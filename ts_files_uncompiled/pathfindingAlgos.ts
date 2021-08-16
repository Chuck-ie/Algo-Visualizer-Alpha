
interface myNode {
    
    actualCell: any;
    predecessorNode: myNode | undefined;
    shortestPath: number;
}

var pathingRelated:any = {

    startCell: undefined,
    allNodes: new Array<myNode>(),
    visitedNodes: new Array<myNode>(),
    startNode: {actualCell:undefined, predecessorNode:undefined, shortestPath:0},
    targetCell: undefined,
    targetFound: false,
    targetID: undefined,
}


function newDijkstra(startCell:any, targetCell:any, rowSize:number) {

    


}


function dijkstra(start:any, target:any, rowSize:number) {

    pathingRelated.targetID = target.id;
    pathingRelated.startNode.actualCell = start;
    // append start- and targetNode to allNodes (start always index 1; target always index 0)
    pathingRelated.allNodes.push(pathingRelated.startNode);
    dijkstraLoop(pathingRelated.startNode, rowSize);
}

function dijkstraLoop(currNode:myNode, rowSize:number, j=0) {

    // let neighboursArr = [1, -1, rowSize, -rowSize];
    let neighboursArr = [-1, -rowSize-1, -rowSize, -rowSize+1, 1, rowSize+1, rowSize, rowSize-1];

    if (currNode.actualCell.id == pathingRelated.targetID) {
        markShortestPath(currNode);
        return;
    }

    if (j > 0) {
        colorizeNode(currNode);
    }

    j += 1;
    checkNeighbours(currNode, neighboursArr)

    pathingRelated.visitedNodes.push(currNode);
    let nextNode:myNode = getNextNode(currNode);

    if (nextNode.actualCell != undefined) {
        setTimeout(() => {
            dijkstraLoop(nextNode, rowSize, j);
        }, pathingRelated.colorizeDelay * pathingRelated.speedMultiplier)

    } else {
        alert(`There is no Path to the specified target.\nShortest path: ${Infinity}`)
    }
}
