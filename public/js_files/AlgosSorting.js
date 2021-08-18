"use strict";
var sortingRelated = {
    allSortElements: new Array(),
};
function selectionSort(sortingElements, currNode, i = 0, j = 1, bestNode = currNode, bestIndex = i) {
    let comparisonNode = sortingElements[j];
    let next_i_loop_available = true;
    let next_j_loop_available = true;
    if (sortingElements[j + 1] === undefined) {
        next_j_loop_available = false;
        if (sortingElements[i + 1] === undefined) {
            next_i_loop_available = false;
        }
    }
    currNode.style.backgroundColor = "blue";
    comparisonNode.style.backgroundColor = "yellow";
    if (comparisonNode.clientHeight < bestNode.clientHeight) {
        if (bestNode != currNode) {
            bestNode.style.backgroundColor = "red";
        }
        bestNode = comparisonNode;
        bestNode.style.backgroundColor = "green";
        bestIndex = j;
    }
    else {
        comparisonNode.style.backgroundColor = "red";
    }
    if (next_i_loop_available === true && next_j_loop_available === true) {
        setTimeout(() => {
            selectionSort(sortingElements, currNode, i, j + 1, bestNode, bestIndex);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === true && next_j_loop_available === false) {
        setTimeout(() => {
            swapNodes(sortingElements, i, bestIndex);
            resetColors(sortingElements.slice(i + 1));
            selectionSort(sortingElements, sortingElements[i + 1], i + 1, i + 1);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === false && next_j_loop_available === true) {
        setTimeout(() => {
            comparisonNode.style.backgroundColor = "red";
            selectionSort(sortingElements, currNode, i, j + 1, bestNode, bestIndex);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === false && next_j_loop_available === false) {
        swapNodes(sortingElements, i, bestIndex);
        confirmArrayOrder(sortingElements);
    }
    else {
        console.log("idk what happened tbh.");
    }
}
function quickSort() {
    alert("quickSort started");
}
