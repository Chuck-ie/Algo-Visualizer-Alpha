
var playfieldMenu:any = {

    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: 0,
    activeAlgoName: "",
    colorizeDelay: 100,
}

function chooseAlgoType(myMenuHeaderX:HTMLElement, myObject:HTMLElement, standardElement:HTMLElement, pathingElement:HTMLElement, sortingElement:HTMLElement) {

    setHeaderName(myMenuHeaderX, myObject);
    let windowSize:number[] = getWindowSize();
    let myElements:HTMLElement[] = [standardElement, pathingElement, sortingElement];
    playfieldMenu.activeAlgoName = myObject.innerHTML;
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

function selectAlgoSpeed(myMenuHeaderX:HTMLElement, myMenuX:HTMLElement, myObject:HTMLElement) {

    playfieldMenu.speedMultiplier = Number(myObject.id);
    playfieldMenu.speedSelected = true;    
    setHeaderName(myMenuHeaderX, myObject);
}

function selectAlgo(myMenuHeaderX:HTMLElement, myObject:HTMLElement) {

    playfieldMenu.activeAlgoName = myObject.innerHTML;
    playfieldMenu.algoSelected = true;
    setHeaderName(myMenuHeaderX, myObject);
}

function resetPlayfield(myObject:HTMLElement | undefined = undefined) {

    if (myObject !== undefined) {
        startResetGlow(myObject);
    }

    clearPlayfield();

    let windowSize:number[] = getWindowSize();
    playfield.algoInProgress = false;

    if (playfield.sortingActive === true) {
        createSortingPlayfield((windowSize[1] * 0.5) / 16);

    } else if (playfield.pathingActive === true) {
        createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);

        // resetting important values to default
        pathing.targetCell = undefined;
        pathing.allNodes = new Array<myNode>();
        pathing.visitedNodes = new Array<myNode>();
        pathing.usedIDs = new Array<string>();
        pathing.neighboursArr = [1, -1];

    } else if (playfield.emptyActive === true) {
        createEmptyPlayfield(windowSize[0], windowSize[1]);
    }
}

function testStart(myObject:HTMLElement) {

    startResetGlow(myObject);

    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {

        if (playfield.needsReset === true) {
            let oldTarget:HTMLElement = pathing.targetCell;
            resetPlayfield();
            setTargetCell(oldTarget.id);
        }

        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

function startAlgo() {

    playfield.algoInProgress = true;
    // case sorting algo selected
    if (playfieldMenu.activeAlgoName.slice(-4) === "Sort") {
        let myArray:HTMLElement[] = [...playfield.playfieldContainer.children];

        switch(playfieldMenu.activeAlgoName) {
            
            case "Selection Sort":
                selectionSort(myArray);
                break;
    
            case "Quick Sort":
                quickSort(myArray, 0, myArray.length - 1);
                break;
        }

    // case pathing algo selected
    } else {
        switch(playfieldMenu.activeAlgoName) {

            case "Dijkstra":
                if (pathing.targetCell !== undefined) {
                    dijkstra(pathing.startCell, pathing.targetCell, pathing.allRows[0].childElementCount);
                    break;
    
                } else {
                    alert("Please select a targetcell!");
                    playfield.algoInProgress = false;
                    break;
                }
        }
    }
}

