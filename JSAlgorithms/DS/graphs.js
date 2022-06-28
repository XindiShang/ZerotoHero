class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
        return this.adjacencyList;
    }
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
        return this.adjacencyList;
    }
    removeEdge(v1, v2) {
        this.adjacencyList[v1] =
            this.adjacencyList[v1].filter(val => val !== v2);
        this.adjacencyList[v2] =
            this.adjacencyList[v2].filter(val => val !== v1);
        return this.adjacencyList;
    }
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            let adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(adjacentVertex, vertex);
        }
        delete this.adjacencyList[vertex];
    }
    DFSRecursive(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function helper(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            for (let neighbor of adjacencyList[vertex]) {
                if (!visited[neighbor]) {
                    return helper(neighbor);
                }
            }
        })(start)
        return result;
    }
    DFSIterative(start) {
        const stack = [];
        const result = [];
        const visited = {};
        let vertex;

        stack.push(start);
        visited[start] = true;
        while (stack.length) {
            vertex = stack.pop();
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            })
            
        }
        return result;
    }
    BFS(start) {
        const queue = [];
        const result = [];
        const visited = {};
        let vertex;

        queue.push(start);
        visited[start] = true;

        while (queue.length) {
            vertex = queue.shift();
            result.push(vertex);

            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            })
        }
        return result;
    }
}

let g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');