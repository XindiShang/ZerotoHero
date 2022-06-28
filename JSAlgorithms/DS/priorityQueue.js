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

let q = new priorityQueue();
q.enqueue('B', 3);
q.enqueue('C', 1);
q.enqueue('D', 5);
q.enqueue('A', 2);