var targetFound:boolean = false;
var allCells:any = undefined;
var allNodes = new Array<myNode>();
var visitedNodes = new Array<myNode>();
var targetID:string;
var startNode:myNode = {actualCell:undefined, predecessorNode:undefined, shortestPath:0};
var j = 0;

interface myNode {
    actualCell: any;
    predecessorNode:myNode | undefined;
    shortestPath: number;
}

function dijkstra(start:any, target:any, rowSize:number) {

    allCells = document.getElementsByClassName("gridCells");
    targetID = target.id;
    startNode.actualCell = start;
    // append start- and targetNode to allNodes (start always index 1; target always index 0)
    allNodes.push(startNode);
    dijkstraLoop(startNode, rowSize);
}

function dijkstraLoop(currNode:myNode, rowSize:number) {

    // let neighboursArr = [1, -1, rowSize, -rowSize];
    let neighboursArr = [-1, -rowSize-1, -rowSize, -rowSize+1, 1, rowSize+1, rowSize, rowSize-1];

    if (currNode.actualCell.id == targetID) {
        markShortestPath(currNode);
        return;
    }

    if (j > 0) {
        colorizeNode(currNode);
    }

    j += 1;
    checkNeighbours(currNode, neighboursArr)

    visitedNodes.push(currNode);
    let nextNode:myNode = getNextNode(currNode);

    if (nextNode.actualCell != undefined) {
        setTimeout(() => {
            dijkstraLoop(nextNode, rowSize);
        }, colorizeDelay * speedMultiplier)

    } else {
        alert(`There is no Path to the specified target.\nShortest path: ${Infinity}`)
    }
}
 
function checkNeighbours(currNode:myNode, neighboursArr:any) {

    if (neighboursArr.length === 0) {
        return;
    }

    let validNeighbour:myNode = {actualCell:undefined, predecessorNode:currNode, shortestPath:Infinity};
    let currID:number = Number(currNode.actualCell.id);
    let notValid:any = allNodes.map((node:myNode) => {
        return Number(node.actualCell.id);
    })

    if (currID + neighboursArr[0] >= 0 && currID + neighboursArr[0] < allCells.length) {
        if (notValid.includes(currID + neighboursArr[0])) {
            checkNeighbours(currNode, neighboursArr.slice(1));

        } else {
            validNeighbour.actualCell = allCells[currID + neighboursArr[0]];
            validNeighbour.shortestPath = currNode.shortestPath + 1;
            allNodes.push(validNeighbour);
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
    }
}

function colorizeNode(currNode:myNode) {

    currNode.actualCell.setAttribute("style", "background-color:#FFE400;");
    
    setTimeout(() => {
        currNode.actualCell.setAttribute("style", "background-color:#FC4445;")
    }, colorizeDelay * speedMultiplier);

}

function markShortestPath(currNode:myNode | undefined) {

    if (currNode == undefined) {
        return;
    }

    if (currNode!.predecessorNode != currNode) {
        currNode!.actualCell.setAttribute("style", "background-color:#86C232;");
        setTimeout(() => {
            markShortestPath(currNode!.predecessorNode);
        }, colorizeDelay * speedMultiplier)

    } else {
        currNode!.actualCell.setAttribute("style", "background-color:#86C232;");
    }
}

function getNextNode(currNode:myNode) {

    let next:myNode = {actualCell:undefined, predecessorNode:undefined, shortestPath:Infinity};
    let validNextNodes = allNodes.filter((node:myNode) => {
        return !visitedNodes.includes(node);
    })
    
    for (let i = 0; i < validNextNodes.length; i++) {
        if (validNextNodes[i].shortestPath < next.shortestPath) {
            next = validNextNodes[i];
        }
    }

    return next;
}

