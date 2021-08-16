"use strict";
function swapNodes(currArray, i, bestIndex) {
    let tempHeight = currArray[i].clientHeight.toString() + "px";
    currArray[i].style.minHeight = currArray[bestIndex].clientHeight.toString() + "px";
    currArray[bestIndex].style.minHeight = tempHeight;
}
function resetColors(slicedArray) {
    slicedArray.forEach((node) => {
        node.style.backgroundColor = "white";
    });
}
function confirmArrayOrder(currArray) {
    currArray[0].style.backgroundColor = "green";
    setTimeout(() => {
        if (currArray[1] !== undefined) {
            confirmArrayOrder(currArray.slice(1));
        }
    }, playfieldMenuRelated.colorizeDelay / 2);
}
