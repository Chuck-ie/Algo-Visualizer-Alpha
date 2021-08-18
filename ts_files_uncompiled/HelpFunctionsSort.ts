
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
        playfieldDivs[i].style.backgroundColor = "hsl(172, 47%, 48%)";
        await sleep(25 / playfieldMenu.speedMultiplier);
    }
}
