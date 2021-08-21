"use strict";
var playfield = {
    playfieldContainer: document.getElementById("playfield_container"),
    isResizing: false,
    emptyActive: true,
    sortingActive: false,
    pathingActive: false,
    algoInProgress: false,
    needsReset: false
};
var colors = {
    yellow: "hsl(59, 78%, 57%)",
    red: "hsl(360, 97%, 63%)",
    green: "hsl(172, 47%, 48%)",
    blue: "hsl(224, 83%, 61%)"
};
function clearPlayfield() {
    for (let i = playfield.playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfield.playfieldContainer.childNodes[i].remove();
    }
}
function createPathingPlayfield(height, width) {
    // active playfield = true, else = false
    playfield.pathingActive = true;
    playfield.sortingActive = false;
    playfield.emptyActive = false;
    let rowCount = Math.floor(height / 22);
    let cellCount = Math.floor(width / 24);
    // add rows to playfield container depending on the current window size
    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        playfield.playfieldContainer.appendChild(newRow).className = "row";
    }
    // add cells to each row element
    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell = document.createElement("div");
            newCell.id = `${(j * cellCount) + k}`;
            newCell.style.left = `${(k * 24) + 2 + document.getElementById("playfield_menu").clientWidth}px`;
            newCell.style.top = `${j * 24}px`;
            newCell.setAttribute("onclick", `setTargetCell(this.id)`);
            if (j == Math.floor(rowCount / 2) && k == Math.floor(cellCount / 2)) {
                // adding marker to start
                let marker = document.createElement("i");
                marker.className = "fas fa-angle-down";
                marker.style.position = "relative";
                marker.style.left = "2.5px";
                marker.style.color = "black";
                newCell.style.backgroundColor = "#FC4445";
                newCell.appendChild(marker);
                pathing.startCell = newCell;
            }
            pathing.allRows[j].appendChild(newCell).className = "cell";
        }
    }
    setMenuHeight(rowCount);
}
function createSortingPlayfield(width) {
    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = true;
    playfield.emptyActive = false;
    let elementCount = Math.floor(width);
    // create div elements for playfield to be sorted
    for (let i = 0; i < elementCount; i++) {
        let newElement = document.createElement("div");
        let elementHeight = (i * 10) + 10;
        newElement.id = `${i}`;
        newElement.className = "sortingElement";
        newElement.style.minHeight = `${elementHeight}px`;
        sorting.allSortElements.push(newElement);
    }
    // randomize element order
    for (let j = elementCount; j > 0; j--) {
        let randomIndex = Math.floor(Math.random() * j);
        let randomElement = sorting.allSortElements[randomIndex];
        sorting.allSortElements.splice(randomIndex, 1);
        playfield.playfieldContainer.appendChild(randomElement);
    }
    setMenuHeight();
}
function createEmptyPlayfield(height, width) {
    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = false;
    playfield.emptyActive = true;
    // create empty playfield
    let emptyElement = document.createElement("div");
    emptyElement.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.6 * height}px;min-width:${0.5 * width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyElement.innerHTML = "Select Algorithm Type first!";
    playfield.playfieldContainer.appendChild(emptyElement);
    setMenuHeight();
}
