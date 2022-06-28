// class Node {
//     constructor(val){
//         this.val = val;
//         this.next = null;
//     }
// }


class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let nodebBaby = new Node(val);
        if (!this.head) {
            this.head = nodebBaby;
            this.tail = this.head;
            // this.tail = nodebBaby;
        } else {
            this.tail.next = nodebBaby;
            this.tail = nodebBaby;
        }
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) return undefined; 
        let current = this.head;
        let newTail = current;
        while (current.next != null) {
            newTail = current;
            current = current.next;
        }
        newTail.next = null;
        this.tail = newTail;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }
    shift() {
        if (!this.head) return undefined;
        let oldHead = this.head;
        this.head = oldHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return oldHead;
    }
    unshift(val) {
        let nodebBaby = new Node(val);
        if (!this.head) {
            this.head = nodebBaby;
            this.tail = this.head;
        } else {
            nodebBaby.next = this.head;
            this.head = nodebBaby;
        }
        this.length++;
        return this;
    }
    get(idx) {    
        if (idx < 0 || idx >= this.length) return null;
        let current = this.head;
        let counter = 0;
        while (counter != idx) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set(idx, val) {
        // use this to call functions inside the class
        let nodeChild = this.get(idx);
        if (!nodeChild) return false;
        nodeChild.val = val;
        return true;
    }
    insert(idx, val) {
        if (idx < 0 || idx > this.length) return false;
        // use !! to coerce a truthy value to a boolean expression, i.e !'hi' => false
        else if (idx === this.length) return !!this.push(val);
        else if (idx === 0) return !!this.unshift(val);
        else {
            let preNode = this.get(idx - 1);
            let afterNode = preNode.next;
            let nodebBaby = new Node(val);
            nodebBaby.next = afterNode;
            preNode.next = nodebBaby;
            this.length++;
            return true;
        }
    }
    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;
        else if (idx === this.length - 1) return this.pop(val);
        else if (idx === 0) return this.shift(val);
        else {
            let preNode = this.get(idx - 1);
            let trashNode = preNode.next;
            preNode.next = trashNode.next;
            this.length--;
            return trashNode;
        }
    }
    reverse() { 
        let current = this.head;
        this.head = this.tail;
        this.tail = current;
        let next;
        // remember to set the last node's pointer to null
        let prev = null;
        for (let i = 0; i < this.length; i++){
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return this;
    }
    show() {
        if (!this.head) return undefined; 
        let current = this.head;
        let counter = 0;
        let nodePrint = `${current.val}=>`;
        while (counter != this.length-1) {
            current = current.next;
            counter++;
            nodePrint += `${current.val}=>`
        }
        return nodePrint
    }
}