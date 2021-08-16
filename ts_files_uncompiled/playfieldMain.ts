
var playfield:any = {

    playfieldContainer: document.getElementById("playfield_container"),
    allRows: document.getElementsByClassName("row"),
    emptyActive: false,
    sortingActive: false,
    pathingActive: false,
}

window.onload = doOnLoad;
window.onresize = doOnResize;

function getWindowSize() {

    return [window.innerHeight, window.innerWidth];
}

function doOnLoad() {

    let windowSize:any = getWindowSize();
    createEmptyPlayfield(windowSize[0], windowSize[1]);
}

function doOnResize() {

    let test:any = document.getElementById("playfield_container");
    console.log(test.style.minHeight);

    let windowSize:any = getWindowSize();
    clearPlayfield();

    if (playfield.emptyActive === true) {
        createEmptyPlayfield(windowSize[0], windowSize[1])

    } else if (playfield.sortingActive === true) {
        createSortingPlayfield((windowSize[1] * 0.5) / 16);

    } else if (playfield.pathingActive === true) {
        createPathingPlayfield(windowSize[0] * 0.6, windowSize[1] * 0.5);

    }
}

function clearPlayfield() {

    for (let i = playfield.playfield_container.childNodes.length - 1; i >= 0; i--) {
        playfield.playfieldContainer.childNodes[i].remove();
    }
}

function createPathingPlayfield(height:number, width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = true;
    playfield.sortingActive = false;
    playfield.emptyActive = false;

    let rowCount:number = Math.floor(height/22);
    let cellCount:number = Math.floor(width/24);

    // add rows to playfield container depending on the current window size
    for (let i = 0; i < rowCount; i++) {
        let newRow:any = document.createElement("div");
        playfield.playfieldContainer!.appendChild(newRow).className = "row";
    }

    // add cells to each row element
    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell:any = document.createElement("div");
            newCell.id = `${(j * cellCount) + k}`;
            newCell.onclick = "setTargetCell(this.id)";

            if (j == Math.floor(rowCount / 2) && k == Math.floor(cellCount / 2)) {
                newCell.style.backgroundColor = "#FC4445";
                pathingRelated.startCell = newCell;
            }

            playfield.allRows[j].appendChild(newCell).className = "cell";
        }
    }
}

function createSortingPlayfield(width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = true;
    playfield.emptyActive = false;

    let elementCount:number = Math.floor(width);

    // create divs elements for playfield to be sorted
    for (let i = 0; i < elementCount; i++) {
        let newElement:any = document.createElement("div");
        let elementHeight:number = (i * 10) + 10;
        newElement.id = `${i}`;
        newElement.className = "sortingElement";
        newElement.setAttribute("style", `min-width:10px;min-height:${elementHeight}px;margin-right:2px;border:1px solid gray;position:relative;display:inline-block;`);
        sortingRelated.allSortElements.push(newElement);
    }

    // randomize element order
    for (let j = elementCount; j > 0; j--) {
        let randomIndex:number = Math.floor(Math.random() * j);
        let randomElement:any = sortingRelated.allSortElements[randomIndex]

        sortingRelated.allSortElements.splice(randomIndex, 1);
        playfield.playfieldContainer.appendChild(randomElement);
    }
}

function createEmptyPlayfield(height:number, width:number) {

    // active playfield = true, else = false
    playfield.pathingActive = false;
    playfield.sortingActive = false;
    playfield.emptyActive = true;

    // create empty playfield
    let emptyElement:any = document.createElement("div");
    emptyElement.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.7*height}px;min-width:${0.5*width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyElement.innerHTML = "Select Algorithm Type first!";
    playfield.playfieldContainer.appendChild(emptyElement);
}

function showDropdown(myMenuHeaderX:any, myMenuX:any) {

    if (myMenuX.contentEditable === "true") {

        myMenuX.contentEditable = "false";
        myMenuX.style.display = "none";
        myMenuX.style.filter = "brightness(1.0)";
        
        myMenuHeaderX.children[0].className = "fas fa-angle-left";
        myMenuHeaderX.style.backgroundColor = "#4056A1";
        myMenuHeaderX.style.filter = "brightness(1.0)";

    } else {

        myMenuX.contentEditable = "true";
        myMenuX.style.display = "block";
        myMenuX.style.filter = "brightness(1.2)";

        myMenuHeaderX.children[0].className = "fas fa-angle-down";
        myMenuHeaderX.style.backgroundColor = "#14A76C";
        myMenuHeaderX.style.filter = "brightness(1.2)";
    }
}
