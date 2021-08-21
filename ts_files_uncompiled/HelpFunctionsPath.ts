
function setTargetCell(id:string) {

    if (playfield.algoInProgress === false) {

        if (pathing.targetCell !== undefined) {
            pathing.targetCell.style.backgroundColor = "white";
            pathing.targetCell = document.getElementById(id);
            pathing.targetCell.style.backgroundColor = "#14A76C";

        } else {
            pathing.targetCell = document.getElementById(id);
            pathing.targetCell.style.backgroundColor = "#14A76C";
        }

    } else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.");
    }
}

async function delayColors(currentNode:myNode, i:number) {
    await setTimeout(() => {
        colorizeNode(currentNode)
    }, (i * 5) / playfieldMenu.speedMultiplier)
}

async function waitForColors(currentNode:myNode, i:number) {
    await setTimeout(() => {
        markShortestPath(currentNode);
    }, (i * 5) / playfieldMenu.speedMultiplier)
}

function colorizeNode(currentNode:myNode) {

    currentNode.actualCell.style.borderRadius = "15px";
    // hsl below meaning blue color
    currentNode.actualCell.style.backgroundColor = colors.blue;
    currentNode.actualCell.style.animationName = "myCellFadeIn";
    currentNode.actualCell.style.animationDuration = "2s";
}

function markShortestPath(currentNode:myNode) {

    // hsl below meaning yellow color
    currentNode.actualCell.style.backgroundColor = colors.yellow;
    currentNode.actualCell.style.animationName = "shortestPath";
    currentNode.actualCell.style.animationDuration = "2s";

    let nextNode:myNode | undefined = currentNode.predecessorNode;

    if (nextNode !== undefined) {
        setTimeout(() => {
            markShortestPath(nextNode!);
        }, 100)
    } else {
        playfield.algoInProgress = false;
        playfield.needsReset = true;
    }
}
