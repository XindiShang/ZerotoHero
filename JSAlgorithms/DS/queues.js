class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue{
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(val) {
        let newNode = new Node(val)
        if (!this.last) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }
    dequeue() {
        if (!this.last) return null;
        let oldHead = this.first;
        if (this.size === 1) {
            this.last = null;
            // this.first = null;
            // 不需要，因为在oldHead.next为null的情况下
            // ，下一步自动会执行this.head = null；
        } 
        this.first = oldHead.next;
        oldHead.next = null;
        this.size--;
        return oldHead.val;
    }
}

let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3)