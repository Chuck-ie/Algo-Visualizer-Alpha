"use strict";
var playfieldMenu = {
    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: 0,
    activeAlgoName: "",
    colorizeDelay: 100,
};
function chooseAlgoType(myMenuHeaderX, self, standardElement, pathingElement, sortingElement) {
    setHeaderName(myMenuHeaderX, self);
    let windowSize = getWindowSize();
    let myElements = [standardElement, pathingElement, sortingElement];
    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.typeSelected = true;
    playfieldMenu.algoSelected = false;
    clearPlayfield();
    switch (playfieldMenu.activeAlgoName) {
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
function selectAlgoSpeed(myMenuHeaderX, myMenuX, self) {
    playfieldMenu.speedMultiplier = Number(self.id);
    playfieldMenu.speedSelected = true;
    setHeaderName(myMenuHeaderX, self);
}
function selectAlgo(myMenuHeaderX, self) {
    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.algoSelected = true;
    setHeaderName(myMenuHeaderX, self);
}
function resetPlayfield(self) {
    startResetGlow(self);
    clearPlayfield();
    let windowSize = getWindowSize();
    playfield.algoInProgress = false;
    if (playfield.sortingActive === true) {
        createSortingPlayfield((windowSize[1] * 0.5) / 16);
    }
    else if (playfield.pathingActive === true) {
        createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
        // resetting important values to default
        pathing.targetCell = undefined;
        pathing.allNodes = new Array();
        pathing.visitedNodes = new Array();
        pathing.usedIDs = new Array();
        pathing.neighboursArr = [1, -1];
    }
    else if (playfield.emptyActive === true) {
        createEmptyPlayfield(windowSize[0], windowSize[1]);
    }
}
function testStart(self) {
    startResetGlow(self);
    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
        startAlgo();
    }
    else {
        alert("Please select all options!");
    }
}
function startAlgo() {
    playfield.algoInProgress = true;
    // case sorting algo selected
    if (playfieldMenu.activeAlgoName.slice(-4) === "Sort") {
        switch (playfieldMenu.activeAlgoName) {
            case "Selection Sort":
                selectionSort([...playfield.playfieldContainer.children]);
                break;
            case "Quick Sort":
                quickSort();
                break;
        }
        // case pathing algo selected
    }
    else {
        switch (playfieldMenu.activeAlgoName) {
            case "Dijkstra":
                if (pathing.targetCell !== undefined) {
                    dijkstra(pathing.startCell, pathing.targetCell, pathing.allRows[0].childElementCount);
                    break;
                }
                else {
                    alert("Please select a targetcell!");
                    break;
                }
        }
    }
}
