"use strict";
var playfieldMenu = {
    typeSelected: false,
    algoSelected: false,
    speedSelected: false,
    speedMultiplier: 0,
    activeAlgoName: "",
    colorizeDelay: 100,
    fasAngleLeft: "<i class='fas fa-angle-left'></i>",
    leftClassName: "fas fa-angle-left",
    fasAngleDown: "<i class='fas fa-angle-down'></i>",
    downClassName: "fas fa-angle-down"
};
function selectAlgoType(myObject, algoTypeHeader) {
    let windowSize = getWindowSize();
    playfieldMenu.typeSelected = true;
    playfieldMenu.algoSelected = false;
    algoTypeHeader.innerHTML = myObject.innerHTML + playfieldMenu.fasAngleLeft;
    let selectAlgoMenu = document.getElementById("select_algo_menu");
    let selectHeader = selectAlgoMenu.querySelector("#select_algo_header");
    let selectOptions = selectAlgoMenu.querySelector(".my_dropdown_options");
    selectHeader.innerHTML = "Choose Algorithm" + playfieldMenu.fasAngleLeft;
    selectOptions.innerHTML = "";
    clearPlayfield();
    switch (myObject.innerHTML) {
        case "Pathfinding":
            createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
            selectOptions.insertAdjacentHTML("afterbegin", '<p onclick="selectAlgo(this, select_algo_header)">Dijkstra</p>');
            break;
        case "Sorting":
            createSortingPlayfield((windowSize[1] * 0.5) / 16);
            selectOptions.insertAdjacentHTML("afterbegin", '<p onclick="selectAlgo(this, select_algo_header)">Selection Sort</p>');
            selectOptions.insertAdjacentHTML("afterbegin", '<p onclick="selectAlgo(this, select_algo_header)">Quick Sort</p>');
            break;
    }
}
function selectAlgo(myObject, selectAlgoHeader) {
    let algorithmName = myObject.innerHTML;
    playfieldMenu.activeAlgoName = algorithmName;
    playfieldMenu.algoSelected = true;
    setHeaderName(selectAlgoHeader, algorithmName);
}
function selectAlgoSpeed(speedOption, speedHeader) {
    playfieldMenu.speedMultiplier = Number(speedOption.id);
    playfieldMenu.speedSelected = true;
    setHeaderName(speedHeader, speedOption.innerHTML);
}
function resetPlayfield(myObject = undefined) {
    if (myObject !== undefined) {
        startResetGlow(myObject);
    }
    clearPlayfield();
    let windowSize = getWindowSize();
    playfield.algoInProgress = false;
    playfield.needsReset = false;
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
function testStart(myObject) {
    startResetGlow(myObject);
    if (playfieldMenu.algoSelected === true && playfieldMenu.speedSelected === true && playfieldMenu.typeSelected === true) {
        if (playfield.needsReset === true) {
            if (pathing.targetCell !== undefined) {
                let oldTarget = pathing.targetCell;
                resetPlayfield();
                setTargetCell(oldTarget.id);
            }
            else {
                resetPlayfield();
            }
        }
        startAlgo();
    }
    else {
        alert("Please select all options!");
    }
}
function startAlgo() {
    playfield.algoInProgress = true;
    playfield.needsReset = true;
    // case sorting algo selected
    if (playfieldMenu.activeAlgoName.slice(-4) === "Sort") {
        let myArray = [...playfield.playfieldContainer.children];
        switch (playfieldMenu.activeAlgoName) {
            case "Selection Sort":
                selectionSort(myArray);
                break;
            case "Quick Sort":
                quickSort(myArray, 0, myArray.length - 1);
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
                    playfield.algoInProgress = false;
                    break;
                }
        }
    }
}
