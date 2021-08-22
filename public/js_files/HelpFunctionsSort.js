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
function waitDelay(startTime) {
    let currentTime = performance.now();
    while ((currentTime - startTime) < 30) {
        currentTime = performance.now();
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function resetColors(slicedArray) {
    slicedArray.forEach((node) => {
        node.style.backgroundColor = "white";
    });
}
function confirmOrder(playfieldDivs) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < playfieldDivs.length; i++) {
            playfieldDivs[i].style.backgroundColor = colors.green;
            yield sleep(10 / playfieldMenu.speedMultiplier);
        }
    });
}
function swapHeights(playfieldDivs, index1, index2, j_or_pivot) {
    // swap heights of elements at index1 and index2 to semi-sort array
    let height1 = playfieldDivs[index1].clientHeight;
    let height2 = playfieldDivs[index2].clientHeight;
    playfieldDivs[index1].style.minHeight = `${height2}px`;
    playfieldDivs[index2].style.minHeight = `${height1}px`;
}
function colorizeElement(playfieldDivs, index, color, i_or_j = "", ms = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (i_or_j) {
            case "i":
                playfieldDivs[index - 1].style.backgroundColor = "white";
                break;
            case "j":
                playfieldDivs[index + 1].style.backgroundColor = "white";
                break;
            default:
                break;
        }
        playfieldDivs[index].style.backgroundColor = color;
        yield sleep(ms);
    });
}
