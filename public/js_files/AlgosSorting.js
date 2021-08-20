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
var sortingRelated = {
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
            currentElement.style.backgroundColor = "hsl(224, 83%, 61%)";
            for (let j = (i + 1); j < playfieldDivs.length; j++) {
                // set comparisonElement yellow
                playfieldDivs[j].style.backgroundColor = "hsl(59, 78%, 57%)";
                let comparisonHeight = playfieldDivs[j].clientHeight;
                yield sleep(10 / playfieldMenu.speedMultiplier);
                if (comparisonHeight < bestHeight) {
                    // set comparisonElement green
                    if (bestHeight === startHeight) {
                        // set new best green
                        playfieldDivs[j].style.backgroundColor = "hsl(172, 47%, 48%)";
                    }
                    else {
                        // set old best red and new best green
                        playfieldDivs[bestIndex].style.backgroundColor = "hsl(360, 97%, 63%)"; // red
                        playfieldDivs[j].style.backgroundColor = "hsl(172, 47%, 48%)"; // green
                    }
                    bestHeight = comparisonHeight;
                    bestIndex = j;
                }
                else {
                    // else set comparisonElement red
                    playfieldDivs[j].style.backgroundColor = "hsl(360, 97%, 63%)";
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
function quickSort(playfieldDivs) {
    let pivot = playfieldDivs[playfieldDivs.length - 1];
    console.log(pivot);
}
