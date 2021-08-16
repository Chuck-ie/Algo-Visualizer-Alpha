"use strict";
var playfieldMenu = {
    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: undefined,
    activeAlgoNameName: undefined,
    choose_option: undefined,
    colorizeDelay: 100,
};
function ChooseAlgoType(myMenuHeaderX, self) {
    setHeaderName(myMenuHeaderX, self);
    let windowSize = getWindowSize();
    playfieldMenu.activeAlgoName = self.innerHTML;
    playfieldMenu.typeSelected = true;
    playfieldMenu.algoSelected = false;
    clearPlayfield();
    switch (playfieldMenu.activeAlgoName) {
        case "Sorting":
            createSortingPlayfield((windowSize[1] * 0.5) / 16);
            break;
        case "Pathfinding":
            createPathfindingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
            break;
    }
}
function selectAlgo(myMenuHeaderX, self) {
    playfieldMenu.choose_option = document.getElementsByClassName("choose_algo");
    playfieldMenu.activeAlgoName = self.id;
    playfieldMenu.algoSelected = true;
    for (let i = 0; i < playfieldMenu.choose_option.length; i++) {
        playfieldMenu.choose_option[i].innerHTML = self.id;
    }
}
function selectAlgoSpeed(myMenuHeaderX, myMenuX, self) {
    playfieldMenu.speedMultiplier = 1 - Number(self.id);
    playfieldMenu.speedSelected = true;
    setHeaderName(myMenuHeaderX, self);
}
function testStart() {
    // typeSelected is not entirely necessary 
    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
        startAlgo();
    }
    else {
        alert("Please select all options!");
    }
}
function startAlgo() {
    let playfieldDivs = document.getElementById("playfield_container").childNodes;
    let myArray = [];
    playfieldDivs.forEach((node) => myArray.push(node));
    switch (playfieldMenu.activeAlgoName) {
        // Pathfinding options
        case "Dijkstra":
            if (pathingRelated.targetCell !== undefined) {
                dijkstra(pathingRelated.startCell, pathingRelated.targetCell, pathingRelated.allRows[1].childElementCount);
                break;
            }
            else {
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
function newTestStart(self) {
    StartResetGlow(self);
    doOnLoad();
}
function newStart() {
}
function newResetPlayfield(self) {
    StartResetGlow(self);
}
function StartResetGlow(self) {
    self.style.backgroundColor = "#14A76C";
    self.style.filter = "brightness(1.2)";
    setTimeout(() => {
        self.style.backgroundColor = "#4056A1";
        self.style.filter = "brightness(1.0)";
    }, 1000);
}
function resetAlgo() {
    windowRelated.windowWidth = window.innerWidth;
    windowRelated.windowHeight = window.innerHeight;
    if (playfield.sortingAlgoActive === true) {
        playfield.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield(windowRelated.windowWidth * 0.5 / 16);
    }
    else if (playfield.pathfindingAlgoActive === true) {
        pathingRelated.targetFound = false;
        pathingRelated.targetCell = undefined;
        pathingRelated.allCells = undefined;
        pathingRelated.allNodes = new Array();
        playfield.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathfindingPlayfield(0.5 * windowRelated.windowWidth, 0.6 * windowRelated.windowHeight);
    }
}
function chooseTargetCell(id) {
    if (playfield.runningAlgo === false) {
        if (pathingRelated.targetCell !== undefined) {
            pathingRelated.targetCell.setAttribute("style", "background-color:white;");
            pathingRelated.targetCell = document.getElementById(String(id));
            pathingRelated.targetCell.setAttribute("style", "background-color:#2E9CCA;");
        }
        else {
            pathingRelated.targetCell = document.getElementById(String(id));
            pathingRelated.targetCell.setAttribute("style", "background-color:#2E9CCA;");
        }
    }
    else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.");
    }
}
function setHeaderName(myMenuHeaderX, self) {
    myMenuHeaderX.innerHTML = self.innerHTML + "<i class='fas fa-angle-left'></i>";
}
