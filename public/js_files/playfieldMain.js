"use strict";
var windowRelated = {
    windowHeight: undefined,
    windowWidth: undefined,
    waitingForDelay: false,
};
var playfieldRelated = {
    playfieldContainer: document.getElementById("playfield_container"),
    allRows: document.getElementsByClassName("gridRows"),
    emptyPlayfieldActive: true,
    sortingAlgoActive: false,
    pathfindingAlgoActive: false,
    runningAlgo: false,
};
window.onresize = doOnResize;
window.onload = doOnLoad;
function doOnLoad() {
    windowRelated.windowHeight = window.innerHeight;
    windowRelated.windowWidth = window.innerWidth;
    createEmptyPlayfield(windowRelated.windowWidth, windowRelated.windowHeight);
}
function doOnResize() {
    if (windowRelated.waitingForDelay === false) {
        resetAlgo();
        windowRelated.waitingForDelay = true;
        windowRelated.windowHeight = window.innerHeight;
        windowRelated.windowWidth = window.innerWidth;
        if (windowRelated.emptyPlayfieldActive === true) {
            clearPlayfield();
            createEmptyPlayfield(windowRelated.windowWidth, windowRelated.windowHeight);
        }
        else if (windowRelated.sortingAlgoActive === true) {
            clearPlayfield();
            createSortingPlayfield((windowRelated.windowWidth * 0.5) / 16);
        }
        else if (windowRelated.pathfindingAlgoActive === true) {
            clearPlayfield();
            createPathfindingPlayfield(0.5 * windowRelated.windowWidth, 0.6 * windowRelated.windowHeight);
        }
        else {
            clearPlayfield();
        }
        setTimeout(() => { windowRelated.waitingForDelay = false; }, windowRelated.delay);
    }
}
function clearPlayfield() {
    if (playfieldRelated.emptyPlayfieldActive === true) {
        let empty = document.getElementById("empty_playfield");
        playfieldRelated.emptyPlayfieldActive = false;
        empty.remove();
    }
    sortingRelated.allArrays = [];
    for (let i = playfieldRelated.playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfieldRelated.playfieldContainer.childNodes[i].remove();
    }
}
function createPathfindingPlayfield(width, height) {
    playfieldRelated.pathfindingAlgoActive = true;
    playfieldRelated.sortingAlgoActive = false;
    let rowCount = Math.floor(height / 22);
    let cellCount = Math.floor(width / 24);
    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        playfieldRelated.playfieldContainer.appendChild(newRow).className = "gridRows";
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
            playfieldRelated.allRows[j].appendChild(newCell).className = "gridCells";
        }
    }
}
function createSortingPlayfield(width) {
    let size = Math.floor(width);
    playfieldRelated.sortingAlgoActive = true;
    playfieldRelated.pathfindingAlgoActive = false;
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
        playfieldRelated.playfieldContainer.appendChild(newArray);
    }
}
function createEmptyPlayfield(width, height) {
    let emptyPlayfield = document.createElement("div");
    emptyPlayfield.setAttribute("id", "empty_playfield");
    emptyPlayfield.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.7 * height}px;min-width:${0.5 * width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyPlayfield.innerHTML = "Select Algorithm Type!";
    playfieldRelated.playfieldContainer.appendChild(emptyPlayfield);
    playfieldRelated.emptyPlayfieldActive = true;
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
