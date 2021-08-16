"use strict";
var sortingRelated = {
    allArrays: new Array(),
};
function selectionSort(myArray, currNode, i = 0, j = 1, bestNode = currNode, bestIndex = i) {
    let comparisonNode = myArray[j];
    let next_i_loop_available = true;
    let next_j_loop_available = true;
    if (myArray[j + 1] === undefined) {
        next_j_loop_available = false;
        if (myArray[i + 1] === undefined) {
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
            selectionSort(myArray, currNode, i, j + 1, bestNode, bestIndex);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === true && next_j_loop_available === false) {
        setTimeout(() => {
            swapNodes(myArray, i, bestIndex);
            resetColors(myArray.slice(i + 1));
            selectionSort(myArray, myArray[i + 1], i + 1, i + 1);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === false && next_j_loop_available === true) {
        setTimeout(() => {
            comparisonNode.style.backgroundColor = "red";
            selectionSort(myArray, currNode, i, j + 1, bestNode, bestIndex);
        }, playfieldMenu.colorizeDelay * playfieldMenu.speedMultiplier);
    }
    else if (next_i_loop_available === false && next_j_loop_available === false) {
        swapNodes(myArray, i, bestIndex);
        confirmArrayOrder(myArray);
    }
    else {
        console.log("idk what happened tbh.");
    }
}
function quickSort() {
    alert("quickSort started");
}
