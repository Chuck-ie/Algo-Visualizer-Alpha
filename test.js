
function quicksort(array, lowest, highest) {

    let pivot = highest;
    let i = lowest;
    let j = highest - 1;

    while (i < j) {

        while (array[i] < array[pivot] && i < highest) {
            i++;
        }

        while (array[j] > array[pivot] && j > lowest) {
            j--;
        }

        if (i < j) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    if (array[i] > array[pivot]) {
        let temp = array[i];
        array[i] = array[pivot];
        array[pivot] = temp;
    }

    if (lowest < i - 1) {
        quicksort(array, lowest, i-1);
    }

    if (i + 1 < highest) {
        quicksort(array, i+1, highest);
    }

}


let L = [2, 8, 3, 7, 4, 17, 14, 10, 5, 15, 1, 19, 18, 20];
quicksort(L, 0, L.length - 1);
console.log(L);

// for (let i = 0; i < 100; i++) {

//     let L = [];
//     for (let j = 0; j < 100; i++) {
//         L.push(Math.floor(Math.random() * 100));
//     }

//     let before = L.sort();
//     let after = quicksort(L, 0, L.length-1);
//     if (before != after); {
//         console.log("wrong");
//     }

// }



