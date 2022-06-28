class Node {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        let oldTail = this.tail;
        if (!this.tail) return undefined;
        else if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let secondToLast = oldTail.prev;
            secondToLast.next = null;
            this.tail = secondToLast;
            oldTail.prev = null;
        } 
        this.length--;
        return oldTail;
    }
    shift() {
        let oldHead = this.head;
        if (!this.head) return undefined;
        else if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let newHead = oldHead.next;
            newHead.prev = null;
            this.head = newHead;
            oldHead.next = null;
        }
        this.length--;
        return oldHead;
    }
    unshift(val) {
        if (!this.head) {
            return this.push(val);
        } else {
            let newNode = new Node(val);
            let oldHead = this.head;
            oldHead.prev = newNode;
            newNode.next = oldHead;
            this.head = newNode;
            this.length++;
            return this;
        }
    }
    get(idx) {
        if (idx < 0 || idx >= this.length) return null;
        let midPoint = Math.floor(this.length / 2); 
        let current, counter;
        if (idx <= midPoint) {
            current = this.head;
            counter = 0;
            while (idx != counter) {
                current = current.next;
                counter++;
            }
            // for (let i = 0; i <= midPoint; i++){
            //     if (counter === idx) return current;
            //     current = current.next;
            //     counter++;
            // }
        } else {
            current = this.tail;
            counter = this.length - 1;
            while (idx != counter) {
                current = current.prev;
                counter--;
            }
        }
        return current;
    }
    set(idx, val) {
        let caughtNode = this.get(idx);
        if (!caughtNode) return false;
        caughtNode.val = val;
        return true;
    }
    insert(idx, val) {
        if (idx < 0 || idx > this.length) return false;
        else if (idx === 0) {
            this.unshift(val);
        } else if (idx === this.length) {
            this.push(val);
        } else {
            let caughtNode = this.get(idx);
            let prevNode = caughtNode.prev;
            let newNode = new Node(val);
            caughtNode.prev = newNode;
            newNode.prev = prevNode;
            newNode.next = caughtNode;
            prevNode.next = newNode;
            this.length++; 
        }
        return true
    }
    remove(idx) {
        if (idx < 0 || idx >= this.length) return false;
        else if (idx === 0) return this.shift();
        else if (idx === this.length - 1) return this.pop();
        else {
            let trashNode = this.get(idx);
            let prevNode = trashNode.prev;
            let aftNode = trashNode.next;
            trashNode.prev = null, trashNode.next = null;
            prevNode.next = aftNode, aftNode.prev = prevNode;
            this.length--;
            return trashNode;
        }
    }
    print() {
        let arr = [];
        let current = this.head;
        let counter = 0;
        while (counter < this.length) {
            arr.push(current.val);
            current = current.next;
            counter++;
        }
        console.log(arr);
    }
    reverse() {
        if (!this.head) return undefined;

        let current = this.head;
        this.head = this.tail;
        this.tail = node;

        let counter = 0;
        let prev = null;
        let next;
        
        while (counter < this.length) {
            next = current.next;
            // next.next = current; current.next = prev重复
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
            counter++;

        }
        return this;
    }
}

let list = new DoublyLinkedList;
list.push(0);
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);