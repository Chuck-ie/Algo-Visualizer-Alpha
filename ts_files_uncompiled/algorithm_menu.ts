
function chooseAlgoType(id:string) {

    myGlobalVars.windowWidth = window.innerWidth;
    myGlobalVars.windowHeight = window.innerHeight;
    myGlobalVars.typeSelected = true;
    myGlobalVars.algoSelected = false;
    myGlobalVars.choose_option = document.getElementById("algo_type");
    myGlobalVars.choose_option.innerHTML = id;
    clearPlayfield();

    switch (id) {

        case "Sorting":
            resetChooseButton("2")
            createSortingPlayfield((myGlobalVars.windowWidth*0.5)/16);
            break;

        case "Pathfinding":
            resetChooseButton("3");
            createPathfindingPlayfield(0.5*myGlobalVars.windowWidth, 0.6*myGlobalVars.windowHeight);
            break;
    }
}

function selectAlgo(myMenuHeaderX:any, self:any) {
    myGlobalVars.choose_option = document.getElementsByClassName("choose_algo");
    myGlobalVars.activeAlgo = self.id;
    myGlobalVars.algoSelected = true;

    for (let i = 0; i < myGlobalVars.choose_option.length; i++) {
        myGlobalVars.choose_option[i].innerHTML = self.id;
    }
}

function selectAlgoSpeed(myMenuHeaderX:any, myMenuX:any, self:any) {

    myGlobalVars.speedMultiplier = 1 - Number(self.id);
    myGlobalVars.speedSelected = true;    
    setHeaderName(myMenuHeaderX, self)
}

function testStart() {

    // typeSelected is not entirely necessary 
    if (myGlobalVars.algoSelected === true && myGlobalVars.speedSelected === true && myGlobalVars.typeSelected === true) {
        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

function startAlgo() {

    let playfieldDivs:any = document.getElementById("playfield_container")!.childNodes;
    let myArray:any = [];

    playfieldDivs.forEach((node:any) => myArray.push(node));

    switch (myGlobalVars.activeAlgo) {
        // Pathfinding options
        case "Dijkstra":
            if (myGlobalVars.targetCell !== undefined) {
                dijkstra(myGlobalVars.startCell, myGlobalVars.targetCell, myGlobalVars.allRows[1].childElementCount);
                break;

            } else {
                alert("Please select a targetcell!");
                break;
            }
            
        // Sorting options
        case "SelectionSort":
            selectionSort(myArray, myArray[0]);
            break;

        case "QuickSort":
            quickSort();
            break;
    }
}

function resetAlgo() {
    
    myGlobalVars.windowWidth = window.innerWidth;
    myGlobalVars.windowHeight = window.innerHeight;

    if (myGlobalVars.sortingAlgoActive === true) {
        myGlobalVars.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield(myGlobalVars.windowWidth*0.5/16);

    } else if (myGlobalVars.pathfindingAlgoActive === true) {
        myGlobalVars.targetFound = false;
        myGlobalVars.targetCell = undefined;
        myGlobalVars.allCells = undefined;
        myGlobalVars.allNodes = new Array<myNode>();
        myGlobalVars.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathfindingPlayfield(0.5*myGlobalVars.windowWidth, 0.6*myGlobalVars.windowHeight);
    }
}

function chooseTargetCell(id:number) {

    if (myGlobalVars.runningAlgo === false) {

        if (myGlobalVars.targetCell !== undefined) {
            myGlobalVars.targetCell.setAttribute("style", "background-color:white;");
            myGlobalVars.targetCell = document.getElementById(String(id));
            myGlobalVars.targetCell.setAttribute("style", "background-color:#2E9CCA;");

        } else {
            myGlobalVars.targetCell = document.getElementById(String(id));
            myGlobalVars.targetCell.setAttribute("style", "background-color:#2E9CCA;");
        }

    } else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.")
    }
}

function setHeaderName(myMenuHeaderX:any, self:any) {

    myMenuHeaderX.innerHTML = self.innerHTML + "<i class='fas fa-angle-left'></i>";
}
