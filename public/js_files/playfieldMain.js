"use strict";
var windowRelated = {
    waitingForDelay: false,
};
var playfield = {
    playfieldContainer: document.getElementById("playfield_container"),
    allRows: document.getElementsByClassName("gridRows"),
    emptyActive: true,
    sortingActive: false,
    pathingActive: false,
    runningAlgo: false,
};
window.onload = doOnLoad;
window.onresize = doOnResize;
function getWindowSize() {
    return [window.innerHeight, window.innerWidth];
}
function doOnLoad() {
    let windowSize = getWindowSize();
    createEmptyPlayfield(windowSize[0], windowSize[1]);
}
function doOnResize() {
    let windowSize = getWindowSize();
    clearPlayfield();
    if (playfield.emptyActive === true) {
        createEmptyPlayfield(windowSize[0], windowSize[1]);
    }
    else if (playfield.sortingActive === true) {
        createSortingPlayfield((windowSize[1] * 0.5) / 16);
    }
    else if (playfield.pathingActive === true) {
        createPathfindingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
    }
}
function clearPlayfield() {
    if (playfield.emptyPlayfieldActive === true) {
        let empty = document.getElementById("empty_playfield");
        playfield.emptyPlayfieldActive = false;
        empty.remove();
    }
    sortingRelated.allArrays = [];
    for (let i = playfield.playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfield.playfieldContainer.childNodes[i].remove();
    }
}
function createPathfindingPlayfield(height, width) {
    playfield.pathfindingAlgoActive = true;
    playfield.sortingAlgoActive = false;
    let rowCount = Math.floor(height / 22);
    let cellCount = Math.floor(width / 24);
    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        playfield.playfieldContainer.appendChild(newRow).className = "gridRows";
    }
    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell = document.createElement("div");
            newCell.setAttribute("id", `${(j * cellCount) + k}`);
            newCell.setAttribute("onclick", "chooseTargetCell(this.id)");
            if (j == Math.floor(rowCount / 2) && k == Math.floor(cellCount / 2)) {
                newCell.setAttribute("style", "background-color:#2E9CCA;");
                pathingRelated.startCell = newCell;
            }
            playfield.allRows[j].appendChild(newCell).className = "gridCells";
        }
    }
}
function createSortingPlayfield(width) {
    let size = Math.floor(width);
    playfield.sortingAlgoActive = true;
    playfield.pathfindingAlgoActive = false;
    for (let i = 0; i < size; i++) {
        let newArray = document.createElement("div");
        let arrayHeight = (i * 10) + 10;
        newArray.setAttribute("class", "sortingArray");
        newArray.setAttribute("style", `min-width:10px;min-height:${arrayHeight}px;background-color:white;margin-right: 2px;border: 1px solid gray;position: relative;display:inline-block;`);
        newArray.setAttribute("id", i);
        sortingRelated.allArrays.push(newArray);
    }
    for (let j = sortingRelated.allArrays.length; j > 0; j--) {
        let randomID = Math.floor(Math.random() * j);
        let newArray = sortingRelated.allArrays[randomID];
        let toBeRemoved = sortingRelated.allArrays.indexOf(newArray);
        sortingRelated.allArrays.splice(toBeRemoved, 1);
        playfield.playfieldContainer.appendChild(newArray);
    }
}
function createEmptyPlayfield(height, width) {
    let emptyPlayfield = document.createElement("div");
    emptyPlayfield.setAttribute("id", "empty_playfield");
    emptyPlayfield.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.7 * height}px;min-width:${0.5 * width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyPlayfield.innerHTML = "Select Algorithm Type!";
    playfield.playfieldContainer.appendChild(emptyPlayfield);
    playfield.emptyPlayfieldActive = true;
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
function showDropdown(myMenuHeaderX, myMenuX) {
    if (myMenuX.contentEditable === "true") {
        myMenuX.contentEditable = "false";
        myMenuX.style.display = "none";
        myMenuX.style.filter = "brightness(1.0)";
        myMenuHeaderX.children[0].className = "fas fa-angle-left";
        myMenuHeaderX.style.backgroundColor = "#4056A1";
        myMenuHeaderX.style.filter = "brightness(1.0)";
    }
    else {
        myMenuX.contentEditable = "true";
        myMenuX.style.display = "block";
        myMenuX.style.filter = "brightness(1.2)";
        myMenuHeaderX.children[0].className = "fas fa-angle-down";
        myMenuHeaderX.style.backgroundColor = "#14A76C";
        myMenuHeaderX.style.filter = "brightness(1.2)";
    }
}
