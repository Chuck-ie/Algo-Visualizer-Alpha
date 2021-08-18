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
            playfieldDivs[i].style.backgroundColor = "hsl(172, 47%, 48%)";
            yield sleep(25 / playfieldMenu.speedMultiplier);
        }
    });
}
