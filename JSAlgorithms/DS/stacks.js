class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Stack{
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            let temp = this.first;
            this.first = newNode;
            newNode.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if (this.size === 0) return null;
        let oldFirst = this.first;
        if (this.size === 1) {
            this.last = null; 
        }
        this.first = oldFirst.next;
        oldFirst.next = null;
        this.size--;
        return oldFirst.val;
    }
}

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);