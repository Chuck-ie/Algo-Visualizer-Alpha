"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function setTargetCell(id) {
    if (playfield.algoInProgress === false) {
        if (pathing.targetCell !== undefined) {
            pathing.targetCell.style.backgroundColor = "white";
            pathing.targetCell = document.getElementById(id);
            pathing.targetCell.style.backgroundColor = "#14A76C";
        }
        else {
            pathing.targetCell = document.getElementById(id);
            pathing.targetCell.style.backgroundColor = "#14A76C";
        }
    }
    else {
        alert("You currently cant select a new start\n Please wait or press the 'Reset Algorithm' button.");
    }
}
function delayColors(currentNode, i) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setTimeout(() => {
            colorizeNode(currentNode);
        }, (i * 5) / playfieldMenu.speedMultiplier);
    });
}
function waitForColors(currentNode, i) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setTimeout(() => {
            markShortestPath(currentNode);
        }, (i * 5) / playfieldMenu.speedMultiplier);
    });
}
function colorizeNode(currentNode) {
    currentNode.actualCell.style.borderRadius = "15px";
    // hsl below meaning blue color
    currentNode.actualCell.style.backgroundColor = colors.blue;
    currentNode.actualCell.style.animationName = "myCellFadeIn";
    currentNode.actualCell.style.animationDuration = "2s";
}
function markShortestPath(currentNode) {
    // hsl below meaning yellow color
    currentNode.actualCell.style.backgroundColor = colors.yellow;
    currentNode.actualCell.style.animationName = "shortestPath";
    currentNode.actualCell.style.animationDuration = "2s";
    let nextNode = currentNode.predecessorNode;
    if (nextNode !== undefined) {
        setTimeout(() => {
            markShortestPath(nextNode);
        }, 100);
    }
    else {
        playfield.algoInProgress = false;
        playfield.needsReset = true;
    }
}
