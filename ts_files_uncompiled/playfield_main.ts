// global vars used all over the project
const delay:number = 50;
const playfieldContainer:any = document.getElementById("playfield_container");
var waitingForDelay:boolean = false;
var windowHeight:number;
var windowWidth:number;

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

        } else if (myBools.sortingAlgoActive === true) {
            clearPlayfield();
            createSortingPlayfield((windowWidth*0.5)/16);

        } else if (myBools.pathfindingAlgoActive === true) {
            clearPlayfield();
            createPathfindingPlayfield(0.5*windowWidth, 0.6*windowHeight);

        } else {
            clearPlayfield();
        }

        setTimeout(() => {waitingForDelay = false},delay);
    }
}

// Important globalvars to clear the Playfield
var myBools:any = {
    sortingAlgoActive: false,
    pathfindingAlgoActive: false,
    emptyPlayfieldActive: true,
}

function clearPlayfield() {

    if (myBools.emptyPlayfieldActive === true) {
        let empty:any = document.getElementById("empty_playfield");
        myBools.emptyPlayfieldActive = false;
        empty.remove();
    }

    allArrays = [];

    for (let i = playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        playfieldContainer.childNodes[i].remove();
    }
}

// Important globalvars and functions for PathfindingAlgoPlayfield
var allRows:any = document.getElementsByClassName("gridRows");
var startCell:object;

function createPathfindingPlayfield(width:number, height:number) {

    myBools.pathfindingAlgoActive = true;
    myBools.sortingAlgoActive = false;

    let rowCount:number = Math.floor(height/22);
    let cellCount:number = Math.floor(width/24);

    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        playfieldContainer!.appendChild(newRow).className = "gridRows";
    }

    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell = document.createElement("div");
            newCell.setAttribute("id", `${(j*cellCount)+k}`);
            newCell.setAttribute("onclick", "chooseTargetCell(this.id)");

            if (j == Math.floor(rowCount/2) && k == Math.floor(cellCount/2)) {
                newCell.setAttribute("style", "background-color:#2E9CCA;")
                startCell = newCell;
            }

            allRows[j].appendChild(newCell).className = "gridCells";
        }
    }
}

// Important globalvars and functions for SortingAlgoPlayfield
var allArrays:any = [];

function createSortingPlayfield(width:number) {

    let size:number = Math.floor(width);
    myBools.sortingAlgoActive = true;
    myBools.pathfindingAlgoActive = false;

    for (let i = 0; i < size; i++) {
        let newArray:any = document.createElement("div");
        let arrayHeight:number = (i*10) + 10;
        newArray.setAttribute("class", "sortingArray");
        newArray.setAttribute("style", `min-width:10px;min-height:${arrayHeight}px;background-color:white;margin-right: 2px;border: 1px solid gray;position: relative;display:inline-block;`);
        newArray.setAttribute("id", i);
        allArrays.push(newArray);
    }

    for (let j = allArrays.length; j > 0; j --) {
        let randomID:number = Math.floor(Math.random() * j);
        let newArray:any = allArrays[randomID];
        let toBeRemoved:number = allArrays.indexOf(newArray);
        allArrays.splice(toBeRemoved, 1);
        playfieldContainer.appendChild(newArray);
    }
}

function createEmptyPlayfield(width:number, height:number) {

    let emptyPlayfield:any = document.createElement("div");
    emptyPlayfield.setAttribute("id", "empty_playfield")
    emptyPlayfield.setAttribute("style", `min-height:${0.7*height}px;min-width:${0.5*width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyPlayfield.innerHTML = "Select Algorithm Type!";
    playfieldContainer.appendChild(emptyPlayfield);
    myBools.emptyPlayfieldActive = true;
}

// Important globalvars and functions to fix the Playfield Border and Button
var playfield_menu:any = document.getElementById("playfield_menu");
var playfield:any = document.getElementById("playfield");

function fixBorder() {
    setInterval(() => {
        playfield_menu.setAttribute("style", "min-height:0px");
        playfield_menu.setAttribute("style", `min-height:${playfield.offsetHeight}px`);
    }, 50)
}

function resetChooseButton(id:string) {

    let algo_option = document.getElementsByClassName("choose_algo");
    let currMenu:any;

    for (let i = 0; i < algo_option.length; i++) {
        algo_option[i].innerHTML = "Choose Algorithm";
    }

    for (let j = 1; j <= 3; j++) {
        if (String(j) == id) {
            currMenu = document.getElementById("menu" + id);
            currMenu.setAttribute("style", "display:inline-block;");
        } else {
            currMenu = document.getElementById("menu" + String(j));
            currMenu.setAttribute("style", "display:none;");
        }
    }
}

