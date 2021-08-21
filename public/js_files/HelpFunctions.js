"use strict";
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
    if (playfield.isResizing === false) {
        let windowSize = getWindowSize();
        playfield.isResizing = true;
        clearPlayfield();
        if (playfield.emptyActive === true) {
            createEmptyPlayfield(windowSize[0], windowSize[1]);
        }
        else if (playfield.sortingActive === true) {
            createSortingPlayfield((windowSize[1] * 0.5) / 16);
        }
        else if (playfield.pathingActive === true) {
            createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
        }
        setTimeout(() => {
            playfield.isResizing = false;
        }, 50);
    }
}
// changes appearance of dropdown menu points
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
function setHeaderName(myMenuHeaderX, myObject) {
    myMenuHeaderX.innerHTML = myObject.innerHTML + "<i class='fas fa-angle-left'></i>";
}
function setMenuHeight(rows = 0) {
    let newHeight;
    if (rows !== 0) {
        newHeight = rows * 24;
    }
    else {
        newHeight = playfield.playfieldContainer.clientHeight;
    }
    let menuElement = document.getElementById("playfield_menu");
    menuElement.style.minHeight = `${newHeight}px`;
}
function startResetGlow(myObject) {
    myObject.style.backgroundColor = "#14A76C";
    myObject.style.filter = "brightness(1.2)";
    setTimeout(() => {
        myObject.style.backgroundColor = "#4056A1";
        myObject.style.filter = "brightness(1.0)";
    }, 1000);
}
