class priorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    };
    dequeue() {
        return this.values.shift();
    };
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({ node: v2, weight });
        this.adjacencyList[v2].push({ node: v1, weight });
    }
    Dijkstra(start, end) {
        const nodes = new priorityQueue();
        const distances = {};
        const previous = {};
        let smallest;
        let path = [];

        // intialize objects and queue
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
                
            }
            previous[vertex] = null;
        }

        // traverse the graph
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === end) {
                // done, build path to return
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                let node = this.adjacencyList[smallest];
                for (let key in node) {
                    // find neighboring node
                    let neighbor = node[key];
                    // calculate new distance to neighboring node
                    let candidate = distances[smallest] + neighbor.weight;
                    if (candidate < distances[neighbor.node]) {
                        // update new smallest distance to neighbor
                        distances[neighbor.node] = candidate;
                        // update how we got to neighbor
                        previous[neighbor.node] = smallest;
                        nodes.enqueue(neighbor.node, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

let g = new WeightedGraph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('E', 'F', 1);

// const distances = {
//     A: 0, //start
//     B: Infinity,
//     C: Infinity,
//     D: Infinity,
//     E: Infinity,
//     F: Infinity
// }

// const previous = {
//     A: null,
//     B: null,
//     C: null,
//     D: null,
//     E: null,
//     F: null
// }

// const nodes = new PriorityQueue();
// nodes = [A, B, C, D, E, F];
// // ORDERED BY PRIORITY (1<2<3<4<5)

// const g = new WeightedGraph();
// g = {
//     A: [{ node: B, weight: 4 }, { node: C, weight: 2 }],
//     B: [{ node: A, weight: 4 }, { node: E, weight: 3 }],
//     C: [{ node: A, weight: 2 }, { node: D, weight: 2 }, { node: F, weight: 4 }],
//     D: [{ node: C, weight: 2 }, { node: E, weight: 3 }, { node: F, weight: 1 }],
//     E: [{ node: B, weight: 3 }, { node: D, weight: 3 }, { node: F, weight: 1 }],
//     F: [{ node: C, weight: 4 }, { node: D, weight: 1 }, { node: E, weight: 1 }],
// }

// function dynamicFibRefactored(n, memo = [undefined, 1, 1]){
//     if (memo[n] !== undefined) return memo[n];
//     let res = dynamicFibRefactored(n - 1, memo) + dynamicFibRefactored(n - 2, memo);
//     memo[n] = res;
//     return res;
// }

function fibTabulation(n) {
    if (n <= 2) return 1;
    let fibNums = [0, 1, 1];
    for (let i = 3; i <= n; i++){
        fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
    }
    return fibNums[n];
}