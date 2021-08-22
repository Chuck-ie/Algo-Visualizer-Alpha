
function waitDelay(startTime:number) {

    let currentTime:number = performance.now();

    while ((currentTime - startTime) < 30) {
        currentTime = performance.now();
    }
}

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetColors(slicedArray:HTMLElement[]) {

    slicedArray.forEach((node:any) => {
        node.style.backgroundColor = "white";
    })
}

async function confirmOrder(playfieldDivs:HTMLElement[]) {

    for (let i = 0; i < playfieldDivs.length; i++) {
        playfieldDivs[i].style.backgroundColor = colors.green;
        await sleep(10 / playfieldMenu.speedMultiplier);
    }
}

function swapHeights(playfieldDivs:HTMLElement[], index1:number, index2:number, j_or_pivot:string) {

    // swap heights of elements at index1 and index2 to semi-sort array
    let height1:number = playfieldDivs[index1].clientHeight;
    let height2:number = playfieldDivs[index2].clientHeight;
    playfieldDivs[index1].style.minHeight = `${height2}px`;
    playfieldDivs[index2].style.minHeight = `${height1}px`;
}

async function colorizeElement(playfieldDivs:HTMLElement[], index:number, color:string, i_or_j="", ms=0) {

    switch(i_or_j) {

        case "i":
            playfieldDivs[index-1].style.backgroundColor = "white";
            break;

        case "j":
            playfieldDivs[index+1].style.backgroundColor = "white";
            break;

        default:
            break;
    }

    playfieldDivs[index].style.backgroundColor = color;
    await sleep(ms);
}
