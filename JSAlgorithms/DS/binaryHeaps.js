class MaxBinaryHeap {
    constructor() {
        this.values = [41,39,33,18,27,12];
    }
    insert(el) {
        this.values.push(el);
        this.bubbleUp();
        return this.values;
    }
    bubbleUp() {
        let currentIdx = this.values.length - 1;
        let el = this.values[currentIdx];
        while (currentIdx > 0) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);
            let parent = this.values[parentIdx];
            if (el <= parent) break;
            this.values[parentIdx] = el;
            this.values[currentIdx] = parent;
            currentIdx = parentIdx;
        }
    }
    extractMax() {
        let max = this.values[0];
        let end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }
    sinkDown() {
        let el = this.values[0];
        let currentIdx = 0;
        while (true) {
            let leftIdx = currentIdx * 2 + 1;
            let rightIdx = leftIdx + 1;
            let leftChild;
            let rightChild;
            let swap = null;
            if (leftIdx < this.values.length) {
                leftChild = this.values[leftIdx];
                if (leftChild > el) {
                    swap = leftIdx;
                }
            }
            if (rightIdx < this.values.length) {
                rightChild = this.values[rightIdx];
                if (
                    (swap === null && rightChild > el) ||
                    (!swap && rightChild > leftChild)
                ) {
                    swap = rightIdx;
                }
            }
            if (!swap) break;
            this.values[currentIdx] = this.values[swap];
            this.values[swap] = el;
            currentIdx = swap;
        }
    }
}

let heap = new MaxBinaryHeap();

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
    this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
        
    }
    bubbleUp() {
        let currentIdx = this.values.length - 1;
        let el = this.values[currentIdx];
        while (currentIdx > 0) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);
            let parent = this.values[parentIdx];
            if (el.priority >= parent.priority) break;
            this.values[parentIdx] = el;
            this.values[currentIdx] = parent;
            currentIdx = parentIdx;
        }
    }
    dequeue() {
        let min = this.values[0];
        let end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let el = this.values[0];
        let currentIdx = 0;
        while (true) {
            let leftIdx = currentIdx * 2 + 1;
            let rightIdx = leftIdx + 1;
            let leftChild;
            let rightChild;
            let swap = null;
            if (leftIdx < this.values.length) {
                leftChild = this.values[leftIdx];
                if (leftChild.priority < el.priority) {
                    swap = leftIdx;
                }
            }
            if (rightIdx < this.values.length) {
                rightChild = this.values[rightIdx];
                if (
                    (swap === null && rightChild.priority < el.priority) ||
                    (!swap && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightIdx;
                }
            }
            if (!swap) break;
            this.values[currentIdx] = this.values[swap];
            this.values[swap] = el;
            currentIdx = swap;
        }
    }
}

let ER = new PriorityQueue();
ER.enqueue('common cold', 5);
ER.enqueue('gunshot wound', 1);
ER.enqueue('high fever', 4);
ER.enqueue('broken arm', 2);
ER.enqueue('glass in foot', 3);

