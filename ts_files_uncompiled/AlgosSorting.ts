var sortingRelated:any = {
    allSortElements: new Array<any>(),
}

async function selectionSort(playfieldDivs:HTMLElement[]) {

    for (let i = 0; i < playfieldDivs.length; i++) {

        let currentElement:HTMLElement = playfieldDivs[i];
        let startHeight:number = Number(currentElement.clientHeight)
        let bestIndex:number = i;
        let bestHeight:number = currentElement.clientHeight;
        // set currentElement blue
        currentElement.style.backgroundColor = "hsl(224, 83%, 61%)";

        for (let j = (i + 1); j < playfieldDivs.length; j++) {

            // set comparisonElement yellow
            playfieldDivs[j].style.backgroundColor = "hsl(59, 78%, 57%)";
            let comparisonHeight:number = playfieldDivs[j].clientHeight;
            await sleep(50 / playfieldMenu.speedMultiplier);

            if (comparisonHeight < bestHeight) {
                // set comparisonElement green
                if (bestHeight === startHeight) {
                    // set new best green
                    playfieldDivs[j].style.backgroundColor = "hsl(172, 47%, 48%)";

                } else {
                    // set old best red and new best green
                    playfieldDivs[bestIndex].style.backgroundColor = "hsl(360, 97%, 63%)";  // red
                    playfieldDivs[j].style.backgroundColor = "hsl(172, 47%, 48%)";          // green

                }
                bestHeight = comparisonHeight;
                bestIndex = j;

            } else {
                // else set comparisonElement red
                playfieldDivs[j].style.backgroundColor = "hsl(360, 97%, 63%)";
            }
        }

        playfieldDivs[i].style.minHeight = `${bestHeight}px`;
        playfieldDivs[bestIndex].style.minHeight = `${startHeight}px`;
        resetColors(playfieldDivs.slice(i + 1));
    }

    confirmOrder(playfieldDivs);
}

function quickSort() {
    alert("quickSort started");
}
