
interface myNode {
    
    actualCell: any;
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

var pathingRelated:any = {
    startCell: undefined,
    targetCell: undefined,
    nextNodes: new Array<myNode>(),
    

}


function dijkstra(startCell:any, targetCell:any, rowSize:number) {

    


}


