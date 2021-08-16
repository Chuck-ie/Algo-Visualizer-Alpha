
var playfieldMenu:any = {

    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    algoInProgress: false,
    speedMultiplier: undefined,
    activeAlgoName: undefined,
    choose_option: undefined,
    colorizeDelay: 100,
}

function chooseAlgoType(myMenuHeaderX:any, self:any) {

    setHeaderName(myMenuHeaderX, self);
    let windowSize:any = getWindowSize();
    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.typeSelected = true;
    playfieldMenu.algoSelected = false;
    clearPlayfield();

    switch(playfieldMenu.activeAlgoName) {

        case "Sorting":
            createSortingPlayfield((windowSize[1] * 0.5) / 16);
            break;

        case "Pathfinding":
            createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
            break;
    }
}

function selectAlgo(myMenuHeaderX:any, self:any) {
    playfieldMenu.choose_option = document.getElementsByClassName("choose_algo");
    playfieldMenu.activeAlgoName = self.id;
    playfieldMenu.algoSelected = true;

    for (let i = 0; i < playfieldMenu.choose_option.length; i++) {
        playfieldMenu.choose_option[i].innerHTML = self.id;
    }
}

function selectAlgoSpeed(myMenuHeaderX:any, myMenuX:any, self:any) {

    playfieldMenu.speedMultiplier = 1 - Number(self.id);
    playfieldMenu.speedSelected = true;    
    setHeaderName(myMenuHeaderX, self);
}

function testStart() {

    // typeSelected is not entirely necessary 
    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

function startAlgo() {

    let playfieldDivs:any = document.getElementById("playfield_container")!.childNodes;
    let myArray:any = [];

    playfieldDivs.forEach((node:any) => myArray.push(node));

    switch (playfieldMenu.activeAlgoName) {
        // Pathfinding options
        case "Dijkstra":
            if (pathingRelated.targetCell !== undefined) {
                dijkstra(pathingRelated.startCell, pathingRelated.targetCell, pathingRelated.allRows[1].childElementCount);
                break;

            } else {
                alert("Please select a targetcell!");
                break;
            }
            
        // Sorting options
        case "SelectionSort":
            selectionSort(myArray, myArray[0]);
            break;

        case "QuickSort":
            quickSort();
            break;
    }
}


function newTestStart(self:any) {

    StartResetGlow(self);
    doOnLoad();
    

}

function newStart() {



}

function newResetPlayfield(self:any) {

    StartResetGlow(self);


}

function resetAlgo() {
    
    let windowSize:any = getWindowSize();

    if (playfield.sortingAlgoActive === true) {
        playfield.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield((windowSize[1] * 0.5) / 16);

    } else if (playfield.pathfindingAlgoActive === true) {
        pathingRelated.targetFound = false;
        pathingRelated.targetCell = undefined;
        pathingRelated.allCells = undefined;
        pathingRelated.allNodes = new Array<myNode>();
        playfield.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
    }
}


