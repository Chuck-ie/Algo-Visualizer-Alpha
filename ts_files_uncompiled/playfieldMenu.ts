
var playfieldMenu:any = {

    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: 0,
    activeAlgoName: "",
    colorizeDelay: 100,
}

function chooseAlgoType(myMenuHeaderX:HTMLElement, self:HTMLElement, standardElement:HTMLElement, pathingElement:HTMLElement, sortingElement:HTMLElement) {

    setHeaderName(myMenuHeaderX, self);
    let windowSize:number[] = getWindowSize();
    let myElements:HTMLElement[] = [standardElement, pathingElement, sortingElement];
    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.typeSelected = true;
    playfieldMenu.algoSelected = false;
    clearPlayfield();

    switch(playfieldMenu.activeAlgoName) {

        case "Sorting":
            createSortingPlayfield((windowSize[1] * 0.5) / 16);

            standardElement.style.display = "none";
            pathingElement.style.display = "none";
            sortingElement.style.display = "block";

            break;

        case "Pathfinding":
            createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
            standardElement.style.display = "none";
            pathingElement.style.display = "block";
            sortingElement.style.display = "none";
            break;
    }
}

function selectAlgoSpeed(myMenuHeaderX:HTMLElement, myMenuX:HTMLElement, self:HTMLElement) {

    playfieldMenu.speedMultiplier = 1 - Number(self.id);
    playfieldMenu.speedSelected = true;    
    setHeaderName(myMenuHeaderX, self);
}

function selectAlgo(myMenuHeaderX:HTMLElement, self:HTMLElement) {

    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.algoSelected = true;
    setHeaderName(myMenuHeaderX, self);
}

function resetAlgo() {
    
    let windowSize:number[] = getWindowSize();

    if (playfield.sortingAlgoActive === true) {

        playfield.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield((windowSize[1] * 0.5) / 16);

    } else if (playfield.pathfindingAlgoActive === true) {

        pathing.targetFound = false;
        pathing.targetCell = undefined;
        pathing.allCells = undefined;
        pathing.allNodes = new Array<myNode>();
        playfield.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
    }
}

function newResetPlayfield(self:HTMLElement) {

    startResetGlow(self);
    


}


function testStart(self:HTMLElement) {

    startResetGlow(self);
    
    (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) ? startAlgo() : alert("Please select all options!");

    // if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
    //     startAlgo();

    // } else {
    //     alert("Please select all options!");
    // }
}

function startAlgo() {

    // case sorting algo selected
    if (playfieldMenu.activeAlgoName.slice(-4) === "Sort") {

        let sortingElements:HTMLElement[] = playfield.playfieldContainer.children;
        let elementsAsArray = new Array<HTMLElement>();

        sortingElements.forEach((element:HTMLElement) => {
            elementsAsArray.push(element)
        })

        // for (let i = 0; i < sortingElements.length; i++) {
        //     elementsAsArray.push(sortingElements[i]);
        // }

        switch(playfieldMenu.activeAlgoName) {
            
            case "Selection Sort":
                selectionSort(elementsAsArray, elementsAsArray[0]);
                break;
    
            case "Quick Sort":
                quickSort();
                break;
        }

    // case pathing algo selected
    } else {
        switch(playfieldMenu.activeAlgoName) {

            case "Dijkstra":
                if (pathing.targetCell !== undefined) {
                    prepareDijkstra(pathing.startCell, pathing.targetCell, pathing.allRows[0].childElementCount);
                    break;
    
                } else {
                    alert("Please select a targetcell!");
                    break;
                }
        }
    }
}

