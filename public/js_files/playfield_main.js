"use strict";
// global vars used all over the project
const delay = 50;
const playfieldContainer = document.getElementById("playfield_container");
var waitingForDelay = false;
var windowHeight;
var windowWidth;
// all used window.functions + do on start function calls
window.onresize = doOnResize;
window.onload = doOnLoad;
function doOnLoad() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    createEmptyPlayfield(windowWidth, windowHeight);
    fixBorder();
}
function doOnResize() {
    if (waitingForDelay === false) {
        resetAlgo();
        waitingForDelay = true;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        if (myBools.emptyPlayfieldActive === true) {
            clearPlayfield();
            createEmptyPlayfield(windowWidth, windowHeight);
        }
        else if (myBools.sortingAlgoActive === true) {
            clearPlayfield();
            createSortingPlayfield((windowWidth * 0.5) / 16);
        }
        else if (myBools.pathfindingAlgoActive === true) {
            clearPlayfield();
            createPathfindingPlayfield(0.5 * windowWidth, 0.6 * windowHeight);
        }
        else {
            clearPlayfield();
        }
        setTimeout(() => { waitingForDelay = false; }, delay);
    }
}
// Important globalvars to clear the Playfield
var myBools = {
    sortingAlgoActive: false,
    pathfindingAlgoActive: false,
    emptyPlayfieldActive: true,
};
function clearPlayfield() {
    if (myBools.emptyPlayfieldActive === true) {
        let empty = document.getElementById("empty_playfield");
        myBools.emptyPlayfieldActive = false;
        empty.remove();
    }
    allArrays = [];
    for (let i = playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfieldContainer.childNodes[i].remove();
    }
}
// Important globalvars and functions for PathfindingAlgoPlayfield
var allRows = document.getElementsByClassName("gridRows");
var startCell;
function createPathfindingPlayfield(width, height) {
    myBools.pathfindingAlgoActive = true;
    myBools.sortingAlgoActive = false;
    let rowCount = Math.floor(height / 22);
    let cellCount = Math.floor(width / 24);
    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        playfieldContainer.appendChild(newRow).className = "gridRows";
    }
    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell = document.createElement("div");
            newCell.setAttribute("id", `${(j * cellCount) + k}`);
            newCell.setAttribute("onclick", "chooseTargetCell(this.id)");
            if (j == Math.floor(rowCount / 2) && k == Math.floor(cellCount / 2)) {
                newCell.setAttribute("style", "background-color:#2E9CCA;");
                startCell = newCell;
            }
            allRows[j].appendChild(newCell).className = "gridCells";
        }
    }
}
// Important globalvars and functions for SortingAlgoPlayfield
var allArrays = [];
function createSortingPlayfield(width) {
    let size = Math.floor(width);
    myBools.sortingAlgoActive = true;
    myBools.pathfindingAlgoActive = false;
    for (let i = 0; i < size; i++) {
        let newArray = document.createElement("div");
        let arrayHeight = (i * 10) + 10;
        newArray.setAttribute("class", "sortingArray");
        newArray.setAttribute("style", `min-width:10px;min-height:${arrayHeight}px;background-color:white;margin-right: 2px;border: 1px solid gray;position: relative;display:inline-block;`);
        newArray.setAttribute("id", i);
        allArrays.push(newArray);
    }
    for (let j = allArrays.length; j > 0; j--) {
        let randomID = Math.floor(Math.random() * j);
        let newArray = allArrays[randomID];
        let toBeRemoved = allArrays.indexOf(newArray);
        allArrays.splice(toBeRemoved, 1);
        playfieldContainer.appendChild(newArray);
    }
}
function createEmptyPlayfield(width, height) {
    let emptyPlayfield = document.createElement("div");
    emptyPlayfield.setAttribute("id", "empty_playfield");
    emptyPlayfield.setAttribute("style", `min-height:${0.7 * height}px;min-width:${0.5 * width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyPlayfield.innerHTML = "Select Algorithm Type!";
    playfieldContainer.appendChild(emptyPlayfield);
    myBools.emptyPlayfieldActive = true;
}
// Important globalvars and functions to fix the Playfield Border and Button
var playfield_menu = document.getElementById("playfield_menu");
var playfield = document.getElementById("playfield");
function fixBorder() {
    setInterval(() => {
        playfield_menu.setAttribute("style", "min-height:0px");
        playfield_menu.setAttribute("style", `min-height:${playfield.offsetHeight}px`);
    }, 50);
}
function resetChooseButton(id) {
    let algo_option = document.getElementsByClassName("choose_algo");
    let currMenu;
    for (let i = 0; i < algo_option.length; i++) {
        algo_option[i].innerHTML = "Choose Algorithm";
    }
    for (let j = 1; j <= 3; j++) {
        if (String(j) == id) {
            currMenu = document.getElementById("menu" + id);
            currMenu.setAttribute("style", "display:inline-block;");
        }
        else {
            currMenu = document.getElementById("menu" + String(j));
            currMenu.setAttribute("style", "display:none;");
        }
    }
}
