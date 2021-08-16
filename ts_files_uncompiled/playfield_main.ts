// global vars used all over the project
var myGlobalVars:any = {
    delay: 50,
    playfieldContainer: document.getElementById("playfield_container"),
    waitingForDelay: false,
    windowHeight: undefined,
    windowWidth: undefined,
    allArrays: [],
    emptyPlayfieldActive: true,
    sortingAlgoActive: false,
    pathfindingAlgoActive: false,
    choose_option: undefined,
    typeSelected: false,
    allRows: document.getElementsByClassName("gridRows"),
    startCell: undefined,
    algoSelected: false,
    activeAlgo: undefined,
    colorizeDelay: 100,
    speedMultiplier: undefined,
    speedSelected: false,
    targetCell: undefined,
    runningAlgo: false,
    targetFound: false,
    allCells: undefined,
    allNodes: new Array<myNode>(),
    visitedNodes: new Array<myNode>(),
    targetID: undefined,
    startNode: {actualCell:undefined, predecessorNode:undefined, shortestPath:0},
}

// all used window.functions + do on start function calls
window.onresize = doOnResize;
window.onload = doOnLoad;

function doOnLoad() {
    myGlobalVars.windowHeight = window.innerHeight;
    myGlobalVars.windowWidth = window.innerWidth;
    createEmptyPlayfield(myGlobalVars.windowWidth, myGlobalVars.windowHeight);
}

function doOnResize() {

    if (myGlobalVars.waitingForDelay === false) {

        resetAlgo();
        myGlobalVars.waitingForDelay = true;
        myGlobalVars.windowHeight = window.innerHeight;
        myGlobalVars.windowWidth = window.innerWidth;

        if (myGlobalVars.emptyPlayfieldActive === true) {
            clearPlayfield();
            createEmptyPlayfield(myGlobalVars.windowWidth, myGlobalVars.windowHeight);

        } else if (myGlobalVars.sortingAlgoActive === true) {
            clearPlayfield();
            createSortingPlayfield((myGlobalVars.windowWidth*0.5)/16);

        } else if (myGlobalVars.pathfindingAlgoActive === true) {
            clearPlayfield();
            createPathfindingPlayfield(0.5*myGlobalVars.windowWidth, 0.6*myGlobalVars.windowHeight);

        } else {
            clearPlayfield();
        }

        setTimeout(() => {myGlobalVars.waitingForDelay = false}, myGlobalVars.delay);
    }
}

function clearPlayfield() {

    if (myGlobalVars.emptyPlayfieldActive === true) {
        let empty:any = document.getElementById("empty_playfield");
        myGlobalVars.emptyPlayfieldActive = false;
        empty.remove();
    }

    myGlobalVars.allArrays = [];

    for (let i = myGlobalVars.playfieldContainer.childNodes.length - 1; i >= 0; i--) {
        myGlobalVars.playfieldContainer.childNodes[i].remove();
    }
}

function createPathfindingPlayfield(width:number, height:number) {

    myGlobalVars.pathfindingAlgoActive = true;
    myGlobalVars.sortingAlgoActive = false;

    let rowCount:number = Math.floor(height/22);
    let cellCount:number = Math.floor(width/24);

    for (let i = 0; i < rowCount; i++) {
        let newRow = document.createElement("div");
        myGlobalVars.playfieldContainer!.appendChild(newRow).className = "gridRows";
    }

    for (let j = 0; j < rowCount; j++) {
        for (let k = 0; k < cellCount; k++) {
            let newCell = document.createElement("div");
            newCell.setAttribute("id", `${(j*cellCount)+k}`);
            newCell.setAttribute("onclick", "chooseTargetCell(this.id)");

            if (j == Math.floor(rowCount/2) && k == Math.floor(cellCount/2)) {
                newCell.setAttribute("style", "background-color:#2E9CCA;")
                myGlobalVars.startCell = newCell;
            }

            myGlobalVars.allRows[j].appendChild(newCell).className = "gridCells";
        }
    }
}

function createSortingPlayfield(width:number) {

    let size:number = Math.floor(width);
    myGlobalVars.sortingAlgoActive = true;
    myGlobalVars.pathfindingAlgoActive = false;

    for (let i = 0; i < size; i++) {
        let newArray:any = document.createElement("div");
        let arrayHeight:number = (i*10) + 10;
        newArray.setAttribute("class", "sortingArray");
        newArray.setAttribute("style", `min-width:10px;min-height:${arrayHeight}px;background-color:white;margin-right: 2px;border: 1px solid gray;position: relative;display:inline-block;`);
        newArray.setAttribute("id", i);
        myGlobalVars.allArrays.push(newArray);
    }

    for (let j = myGlobalVars.allArrays.length; j > 0; j --) {
        let randomID:number = Math.floor(Math.random() * j);
        let newArray:any = myGlobalVars.allArrays[randomID];
        let toBeRemoved:number = myGlobalVars.allArrays.indexOf(newArray);
        myGlobalVars.allArrays.splice(toBeRemoved, 1);
        myGlobalVars.playfieldContainer.appendChild(newArray);
    }
}

function createEmptyPlayfield(width:number, height:number) {

    let emptyPlayfield:any = document.createElement("div");
    emptyPlayfield.setAttribute("id", "empty_playfield")
    emptyPlayfield.setAttribute("style", `border-radius:0px 10px 10px 0px;color:black;min-height:${0.7*height}px;min-width:${0.5*width}px;background-color:white;text-align:center;font-size:22px;`);
    emptyPlayfield.innerHTML = "Select Algorithm Type!";
    myGlobalVars.playfieldContainer.appendChild(emptyPlayfield);
    myGlobalVars.emptyPlayfieldActive = true;
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
