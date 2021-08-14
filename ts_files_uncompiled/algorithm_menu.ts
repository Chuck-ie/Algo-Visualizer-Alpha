// Choose Algorithm functions and important global vars
var choose_option:any;
var typeSelected:boolean = false;

function chooseAlgoType(id:string) {

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    typeSelected = true;
    algoSelected = false;
    choose_option = document.getElementById("algo_type");
    choose_option.innerHTML = id;
    clearPlayfield();

    switch (id) {

        case "Sorting":
            resetChooseButton("2")
            createSortingPlayfield((windowWidth*0.5)/16);
            break;

        case "Pathfinding":
            resetChooseButton("3");
            createPathfindingPlayfield(0.5*windowWidth, 0.6*windowHeight);
            break;
    }
}

// Change displayed Algorithm name depending on type
var algoSelected:boolean = false;
var activeAlgo:string | undefined = undefined;

function selectAlgo(id:string) {
    choose_option = document.getElementsByClassName("choose_algo");
    activeAlgo = id;
    algoSelected = true;

    for (let i = 0; i < choose_option.length; i++) {
        choose_option[i].innerHTML = id;
    }
}

// Choose Algorithm speed functions and Important global vars
const colorizeDelay:number = 100;
var speedMultiplier:number;
var speedSelected:boolean = false;

function selectAlgoSpeed(id:string) {
    choose_option = document.getElementById("algo_speed");
    choose_option.innerHTML = `${id}x`;
    speedMultiplier = 1 - Number(id);
    speedSelected = true;
}

// Test if Start can be called
function testStart() {

    // typeSelected is not entirely necessary 
    if (algoSelected === true && speedSelected === true && typeSelected === true) {
        startAlgo();

    } else {
        alert("Please select all options!");
    }
}

// Start and Reset functions and Important global vars
var windowHeight:number;
var windowWidth:number;

function startAlgo() {

    let playfieldDivs:any = document.getElementById("playfield_container")!.childNodes;
    let myArray:any = [];

    playfieldDivs.forEach((node:any) => myArray.push(node));

    switch (activeAlgo) {
        // Pathfinding options
        case "Dijkstra":
            if (targetCell !== undefined) {
                dijkstra(startCell, targetCell, allRows[1].childElementCount);
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
    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (myBools.sortingAlgoActive === true) {
        myBools.sortingAlgoActive = false;
        clearPlayfield();
        createSortingPlayfield(windowWidth*0.5/16);

    } else if (myBools.pathfindingAlgoActive === true) {
        targetFound = false;
        targetCell = undefined;
        allCells = undefined;
        allNodes = new Array<myNode>();
        myBools.pathfindingAlgoActive = false;
        clearPlayfield();
        createPathfindingPlayfield(0.5*windowWidth, 0.6*windowHeight);
    }
}

// Set start for Pathfinding Algorithm and Important global vars
var targetCell:any = undefined;
var runningAlgo:boolean = false;

function chooseTargetCell(id:number) {

    if (runningAlgo === false) {

        if (targetCell !== undefined) {
            targetCell.setAttribute("style", "background-color:white;");
            targetCell = document.getElementById(String(id));
            targetCell.setAttribute("style", "background-color:#2E9CCA;");

        } else {
            targetCell = document.getElementById(String(id));
            targetCell.setAttribute("style", "background-color:#2E9CCA;");
        }

    } else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.")
    }
}