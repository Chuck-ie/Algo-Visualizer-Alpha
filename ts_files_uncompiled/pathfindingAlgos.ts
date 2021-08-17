
interface myNode {
    
    actualCell: HTMLElement;
    predecessorNode: myNode | undefined;
    shortestPath: number;
}

// var pathingRelated:any = {

//     startCell: undefined,
//     allNodes: new Array<myNode>(),
//     visitedNodes: new Array<myNode>(),
//     startNode: {actualCell:undefined, predecessorNode:undefined, shortestPath:0},
//     targetCell: undefined,
//     targetFound: false,
//     targetID: undefined,
// }

var pathing:any = {
    startCell: undefined,
    targetCell: undefined,
    nextNodes: new Array<myNode>(),


}


function dijkstra(startCell:HTMLElement, targetCell:any, rowSize:number) {

    let neighboursArray:any = [1, -1, rowSize, -rowSize];
    let startNode:myNode = {actualCell: startCell, predecessorNode: undefined , shortestPath:0}
    startNode.predecessorNode = startNode;

    



}

function dijkstraLoop() {




}


