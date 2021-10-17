
window.onload = doOnLoad;
window.onresize = doOnResize;

function getWindowSize() {

    return [window.innerHeight, window.innerWidth];
}

function doOnLoad() {

    let windowSize:number[] = getWindowSize();
    createEmptyPlayfield(windowSize[0], windowSize[1]);
}

function doOnResize() {

    if (playfield.isResizing === false) {

        let windowSize:number[] = getWindowSize();

        playfield.isResizing = true;
        clearPlayfield();

        if (playfield.emptyActive === true) {
            createEmptyPlayfield(windowSize[0], windowSize[1]);
    
        } else if (playfield.sortingActive === true) {
            createSortingPlayfield((windowSize[1] * 0.5) / 16);
    
        } else if (playfield.pathingActive === true) {
            createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);
    
        }
        setTimeout(() => {
            playfield.isResizing = false;
        }, 50)
    }
}

function showDropdown(optionsMenuID:HTMLElement, dropdownHeader:HTMLElement) {
    
    let displayType:string = window.getComputedStyle(optionsMenuID).display;

    if (displayType === "block") {
        // make dropdown menu disappear while changing header color/fas symbol
        optionsMenuID.style.display = "none";
        optionsMenuID.style.filter = "brightness(1.0)";

        dropdownHeader.style.backgroundColor = "#4056A1";
        dropdownHeader.children[0].className = playfieldMenu.leftClassName;

    } else {
        // make dropdown menu reappear while changing header color/fas symbol back
        optionsMenuID.style.display = "block";
        optionsMenuID.style.filter = "brightness(0.9)";

        dropdownHeader.style.backgroundColor = "#14A76C";
        dropdownHeader.children[0].className = playfieldMenu.downClassName;
    }
}

function setHeaderName(elementHeader:HTMLElement, newHeader:string) {

    elementHeader.innerHTML = newHeader + playfieldMenu.fasAngleLeft;
}

function setMenuHeight(rows=0) {

    let newHeight:number

    if (rows !== 0) {
        newHeight = rows*24;

    } else {
        newHeight = playfield.playfieldContainer.clientHeight;
    }

    let menuElement:HTMLElement = document.getElementById("playfield_menu")!;
    menuElement.style.minHeight = `${newHeight}px`;
}

function startResetGlow(myObject:HTMLElement) {

    myObject.style.backgroundColor = "#14A76C";
    myObject.style.filter = "brightness(1.2)";
    setTimeout(() => {
        myObject.style.backgroundColor = "#4056A1";
        myObject.style.filter = "brightness(1.0)";
    }, 1000);
}
