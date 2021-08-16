
var playfieldMenuRelated:any = {
    algoSelected: false,
    typeSelected: false,
    activeAlgo: undefined,
    speedMultiplier: undefined,
    speedSelected: false,
    choose_option: undefined,
    colorizeDelay: 100,
}

function chooseAlgoType(id:string) {

    windowRelated.windowWidth = window.innerWidth;
    windowRelated.windowHeight = window.innerHeight;
    windowRelated.typeSelected = true;
    playfieldMenuRelated.algoSelected = false;
    playfieldMenuRelated.choose_option = document.getElementById("algo_type");
    playfieldMenuRelated.choose_option.innerHTML = id;
    clearPlayfield();

    switch (id) {

        case "Sorting":
            resetChooseButton("2")
            createSortingPlayfield((windowRelated.windowWidth*0.5)/16);
            break;

        case "Pathfinding":
            resetChooseButton("3");
            createPathfindingPlayfield(0.5*windowRelated.windowWidth, 0.6*windowRelated.windowHeight);
            break;
    }
}

function selectAlgo(myMenuHeaderX:any, self:any) {
    playfieldMenuRelated.choose_option = document.getElementsByClassName("choose_algo");
    playfieldMenuRelated.activeAlgo = self.id;
    playfieldMenuRelated.algoSelected = true;

    for (let i = 0; i < playfieldMenuRelated.choose_option.length; i++) {
        playfieldMenuRelated.choose_option[i].innerHTML = self.id;
    }
}

function selectAlgoSpeed(myMenuHeaderX:any, myMenuX:any, self:any) {

    playfieldMenuRelated.speedMultiplier = 1 - Number(self.id);
    playfieldMenuRelated.speedSelected = true;    
    setHeaderName(myMenuHeaderX, self)
}

function testStart() {

    // typeSelected is not entirely necessary 
    if (playfieldMenuRelated.algoSelected === true && playfieldMenuRelated.speedSelected === true && playfieldMenuRelated.typeSelected === true) {
        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

function startAlgo() {

    let playfieldDivs:any = document.getElementById("playfield_container")!.childNodes;
    let myArray:any = [];

    playfieldDivs.forEach((node:any) => myArray.push(node));

    switch (playfieldMenuRelated.activeAlgo) {
        // Pathfinding options
        case "Dijkstra":
            if (pathingRelated.targetCell !== undefined) {
                dijkstra(pathingRelated.startCell, pathingRelated.targetCell, pathingRelated.allRows[1].childElementCount);
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
    
    windowRelated.windowWidth = window.innerWidth;
    windowRelated.windowHeight = window.innerHeight;

    if (playfieldRelated.sortingAlgoActive === true) {
        playfieldRelated.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield(windowRelated.windowWidth*0.5/16);

    } else if (playfieldRelated.pathfindingAlgoActive === true) {
        pathingRelated.targetFound = false;
        pathingRelated.targetCell = undefined;
        pathingRelated.allCells = undefined;
        pathingRelated.allNodes = new Array<myNode>();
        playfieldRelated.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathfindingPlayfield(0.5*windowRelated.windowWidth, 0.6*windowRelated.windowHeight);
    }
}

function chooseTargetCell(id:number) {

    if (playfieldRelated.runningAlgo === false) {

        if (pathingRelated.targetCell !== undefined) {
            pathingRelated.targetCell.setAttribute("style", "background-color:white;");
            pathingRelated.targetCell = document.getElementById(String(id));
            pathingRelated.targetCell.setAttribute("style", "background-color:#2E9CCA;");

        } else {
            pathingRelated.targetCell = document.getElementById(String(id));
            pathingRelated.targetCell.setAttribute("style", "background-color:#2E9CCA;");
        }

    } else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.")
    }
}

function setHeaderName(myMenuHeaderX:any, self:any) {

    myMenuHeaderX.innerHTML = self.innerHTML + "<i class='fas fa-angle-left'></i>";
}
