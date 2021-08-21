var sorting:any = {
    allSortElements: new Array<any>(),
}

async function selectionSort(playfieldDivs:HTMLElement[]) {

    for (let i = 0; i < playfieldDivs.length; i++) {

        let currentElement:HTMLElement = playfieldDivs[i];
        let startHeight:number = Number(currentElement.clientHeight)
        let bestIndex:number = i;
        let bestHeight:number = currentElement.clientHeight;
        // set currentElement blue
        currentElement.style.backgroundColor = colors.blue;

        for (let j = (i + 1); j < playfieldDivs.length; j++) {

            // set comparisonElement yellow
            playfieldDivs[j].style.backgroundColor = colors.yellow;
            let comparisonHeight:number = playfieldDivs[j].clientHeight;
            await sleep(10 / playfieldMenu.speedMultiplier);

            if (comparisonHeight < bestHeight) {
                // set comparisonElement green
                if (bestHeight === startHeight) {
                    // set new best green
                    playfieldDivs[j].style.backgroundColor = colors.green;

                } else {
                    // set old best red and new best green
                    playfieldDivs[bestIndex].style.backgroundColor = colors.red;
                    playfieldDivs[j].style.backgroundColor = colors.green;

                }
                bestHeight = comparisonHeight;
                bestIndex = j;

            } else {
                // else set comparisonElement red
                playfieldDivs[j].style.backgroundColor = colors.red;
            }
        }

        playfieldDivs[i].style.minHeight = `${bestHeight}px`;
        playfieldDivs[bestIndex].style.minHeight = `${startHeight}px`;
        resetColors(playfieldDivs.slice(i + 1));
    }

    confirmOrder(playfieldDivs);
    playfield.algoInProgress = false;
}

async function quickSort(playfieldDivs:HTMLElement[], lowest:number, highest:number) {

    if (lowest < highest) {
        let index:number = await getIndex(playfieldDivs, lowest, highest);

        await quickSort(playfieldDivs, lowest, index-1);
        await quickSort(playfieldDivs, index+1, highest);
    } else if (lowest === highest) [
        confirmOrder(playfieldDivs.slice(lowest, lowest+1))
    ]
}

async function getIndex(playfieldDivs:HTMLElement[], lowest:number, highest:number) {

    let pivot:number = highest;
    let i:number = lowest;
    let j:number = highest-1
    let delay:number = 50;

    playfieldDivs[pivot].style.backgroundColor = colors.blue;
    playfieldDivs[i].style.backgroundColor = colors.yellow;
    playfieldDivs[j].style.backgroundColor = colors.red;
    await sleep(delay);

    while (i < j) {


        while (i < highest && playfieldDivs[i].clientHeight < playfieldDivs[pivot].clientHeight) {
            i++;
            // colorize current element yellow
            await colorizeElement(playfieldDivs, i, colors.yellow, "i", delay);
        }

        while (j > lowest && playfieldDivs[j].clientHeight >= playfieldDivs[pivot].clientHeight) {
            j--;
            // colorize current element red
            await colorizeElement(playfieldDivs, j, colors.red, "j", delay);
        }

        if (i < j) {
            swapHeights(playfieldDivs, i, j, "j");
        }
    }

    if (playfieldDivs[i].clientHeight > playfieldDivs[pivot].clientHeight) {
        swapHeights(playfieldDivs, i, highest, "pivot");
    }

    // set color of sorted element to green
    playfieldDivs[i].style.backgroundColor = colors.green;

    // get unsorted elements
    let sortedElements:HTMLElement[] | undefined = playfieldDivs.filter((element:HTMLElement) => {
        // all colors that aren't green === all elements that aren't sorted yet
        return element.style.backgroundColor != "rgb(65, 180, 165)";
    })

    // set all unsorted elements to white
    sortedElements.forEach((element:HTMLElement) => {
        element.style.backgroundColor = "white";
    })

    return i;
}
