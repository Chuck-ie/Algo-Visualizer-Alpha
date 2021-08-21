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
var sorting = {
    allSortElements: new Array(),
};
function selectionSort(playfieldDivs) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < playfieldDivs.length; i++) {
            let currentElement = playfieldDivs[i];
            let startHeight = Number(currentElement.clientHeight);
            let bestIndex = i;
            let bestHeight = currentElement.clientHeight;
            // set currentElement blue
            currentElement.style.backgroundColor = colors.blue;
            for (let j = (i + 1); j < playfieldDivs.length; j++) {
                // set comparisonElement yellow
                playfieldDivs[j].style.backgroundColor = colors.yellow;
                let comparisonHeight = playfieldDivs[j].clientHeight;
                yield sleep(10 / playfieldMenu.speedMultiplier);
                if (comparisonHeight < bestHeight) {
                    // set comparisonElement green
                    if (bestHeight === startHeight) {
                        // set new best green
                        playfieldDivs[j].style.backgroundColor = colors.green;
                    }
                    else {
                        // set old best red and new best green
                        playfieldDivs[bestIndex].style.backgroundColor = colors.red;
                        playfieldDivs[j].style.backgroundColor = colors.green;
                    }
                    bestHeight = comparisonHeight;
                    bestIndex = j;
                }
                else {
                    // else set comparisonElement red
                    playfieldDivs[j].style.backgroundColor = colors.red;
                }
            }
            playfieldDivs[i].style.minHeight = `${bestHeight}px`;
            playfieldDivs[bestIndex].style.minHeight = `${startHeight}px`;
            resetColors(playfieldDivs.slice(i + 1));
        }
        confirmOrder(playfieldDivs);
        playfield.algoInProgress = false;
    });
}
function quickSort(playfieldDivs, lowest, highest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (lowest < highest) {
            let index = yield getIndex(playfieldDivs, lowest, highest);
            yield quickSort(playfieldDivs, lowest, index - 1);
            yield quickSort(playfieldDivs, index + 1, highest);
        }
        else if (lowest === highest)
            [
                confirmOrder(playfieldDivs.slice(lowest, lowest + 1))
            ];
    });
}
function getIndex(playfieldDivs, lowest, highest) {
    return __awaiter(this, void 0, void 0, function* () {
        let pivot = highest;
        let i = lowest;
        let j = highest - 1;
        let delay = 50;
        playfieldDivs[pivot].style.backgroundColor = colors.blue;
        playfieldDivs[i].style.backgroundColor = colors.yellow;
        playfieldDivs[j].style.backgroundColor = colors.red;
        yield sleep(delay);
        while (i < j) {
            while (i < highest && playfieldDivs[i].clientHeight < playfieldDivs[pivot].clientHeight) {
                i++;
                // colorize current element yellow
                yield colorizeElement(playfieldDivs, i, colors.yellow, "i", delay);
            }
            while (j > lowest && playfieldDivs[j].clientHeight >= playfieldDivs[pivot].clientHeight) {
                j--;
                // colorize current element red
                yield colorizeElement(playfieldDivs, j, colors.red, "j", delay);
            }
            if (i < j) {
                swapHeights(playfieldDivs, i, j, "j");
            }
        }
        if (playfieldDivs[i].clientHeight > playfieldDivs[pivot].clientHeight) {
            swapHeights(playfieldDivs, i, highest, "pivot");
        }
        // set color of sorted element to green
        playfieldDivs[i].style.backgroundColor = colors.green;
        // get unsorted elements
        let sortedElements = playfieldDivs.filter((element) => {
            // all colors that aren't green === all elements that aren't sorted yet
            return element.style.backgroundColor != "rgb(65, 180, 165)";
        });
        // set all unsorted elements to white
        sortedElements.forEach((element) => {
            element.style.backgroundColor = "white";
        });
        return i;
    });
}
