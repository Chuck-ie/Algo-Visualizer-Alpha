
var playfieldMenu:any = {

    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: 0,
    activeAlgoName: "",
    colorizeDelay: 100,
}

function chooseAlgoType(myMenuHeaderX:any, self:any, standardElement:any, pathingElement:any, sortingElement:any) {

    setHeaderName(myMenuHeaderX, self);
    let windowSize:any = getWindowSize();
    let myElements:any = [standardElement, pathingElement, sortingElement];
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

function selectAlgoSpeed(myMenuHeaderX:any, myMenuX:any, self:any) {

    playfieldMenu.speedMultiplier = 1 - Number(self.id);
    playfieldMenu.speedSelected = true;    
    setHeaderName(myMenuHeaderX, self);
}

function selectAlgo(myMenuHeaderX:any, self:any) {

    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.algoSelected = true;
    setHeaderName(myMenuHeaderX, self);
}

function resetAlgo() {
    
    let windowSize:any = getWindowSize();

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

function newResetPlayfield(self:any) {

    startResetGlow(self);
    


}


function testStart(self:any) {

    startResetGlow(self);
    
    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

function startAlgo() {

    // case sorting algo selected
    if (playfieldMenu.activeAlgoName.slice(-4) === "Sort") {

        let sortingElements:any = playfield.playfieldContainer.children;
        let elementsAsArray:any = [];
        for (let i = 0; i < sortingElements.length; i++) {
            elementsAsArray.push(sortingElements[i]);
        }


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
                    dijkstra(pathing.startCell, pathing.targetCell, 32);
                    break;
    
                } else {
                    alert("Please select a targetcell!");
                    break;
                }
        }
    }
}

