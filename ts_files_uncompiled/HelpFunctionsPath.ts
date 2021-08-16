
function checkNeighbours(currNode:myNode, neighboursArr:any) {

    let allCells:any = document.getElementsByClassName("gridCells");

    if (neighboursArr.length === 0) {
        return;
    }

    let validNeighbour:myNode = {actualCell:undefined, predecessorNode:currNode, shortestPath:Infinity};
    let currID:number = Number(currNode.actualCell.id);
    let notValid:any = pathingRelated.allNodes.map((node:myNode) => {
        return Number(node.actualCell.id);
    })

    if (currID + neighboursArr[0] >= 0 && currID + neighboursArr[0] < allCells.length) {
        if (notValid.includes(currID + neighboursArr[0])) {
            checkNeighbours(currNode, neighboursArr.slice(1));

        } else {
            validNeighbour.actualCell = allCells[currID + neighboursArr[0]];
            validNeighbour.shortestPath = currNode.shortestPath + 1;
            pathingRelated.allNodes.push(validNeighbour);
            checkNeighbours(currNode, neighboursArr.slice(1));
        }
    }
}

function colorizeNode(currNode:myNode) {

    currNode.actualCell.setAttribute("style", "background-color:#FFE400;");
    
    setTimeout(() => {
        currNode.actualCell.setAttribute("style", "background-color:#FC4445;")
    }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
}

function markShortestPath(currNode:myNode | undefined) {

    if (currNode == undefined) {
        return;
    }

    if (currNode!.predecessorNode != currNode) {
        currNode!.actualCell.setAttribute("style", "background-color:#86C232;");
        setTimeout(() => {
            markShortestPath(currNode!.predecessorNode);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier)

    } else {
        currNode!.actualCell.setAttribute("style", "background-color:#86C232;");
    }
}

function getNextNode(currNode:myNode) {

    let next:myNode = {actualCell:undefined, predecessorNode:undefined, shortestPath:Infinity};
    let validNextNodes = pathingRelated.allNodes.filter((node:myNode) => {
        return !pathingRelated.visitedNodes.includes(node);
    })
    
    for (let i = 0; i < validNextNodes.length; i++) {
        if (validNextNodes[i].shortestPath < next.shortestPath) {
            next = validNextNodes[i];
        }
    }

    return next;
}