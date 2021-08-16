
function swapNodes(currArray:any, i:number, bestIndex:number) {
    let tempHeight:string = currArray[i].clientHeight.toString() + "px";
    currArray[i].style.minHeight = currArray[bestIndex].clientHeight.toString() + "px";
    currArray[bestIndex].style.minHeight = tempHeight;
}

function resetColors(slicedArray:any) {
    slicedArray.forEach((node:any) => {
        node.style.backgroundColor = "white";
    })
}

function confirmArrayOrder(currArray:any) {

    currArray[0].style.backgroundColor = "green";
    setTimeout(() => {
        if (currArray[1] !== undefined) {
            confirmArrayOrder(currArray.slice(1));
        }
    }, playfieldMenu.colorizeDelay / 2)
}
