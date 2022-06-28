class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(val) {
        let newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        } else {
            let current = this.root;
            while (true) {
                if (val < current.val) {
                    if (!current.left) {
                        current.left = newNode;
                        return this;
                    } else {
                        current = current.left;
                    }
                } else if (val > current.val) {
                    if (!current.right) {
                        current.right = newNode;
                        return this;
                    } else {
                        current = current.right;
                    }
                } else {
                    return undefined;
                }
            }
        }   
    }
    find(val) {
        if (!this.root) {
            return false;
        }
        let current = this.root;
        let isFound = false;
        while (current && !isFound) {
            if (val < current.val) {
                // if (!current.left) return false;
                // 不需要，因为变量isFound默认是false
                // ，返回的值就直接是false了
                current = current.left;
            } else if (val > current.val) {
                // if (!current.right) return false;
                current = current.right;
            } else {
                isFound = true;
            }
        }
        if (!isFound) return undefined;
        return current;   
    }
    // breadth first solution
    BFS() {
        let data = [];
        let q = [];
        let node = this.root;
        q.push(node);
        while (q.length) {
            node = q.shift();
            data.push(node); //也可以直接推node.val
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right)          
        }
        return data;
    }
    DFSPreOrder() {
        let data = [];
        let current = this.root;
        const traverse = (node) => {
            data.push(node.val);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(current);
        return data;
    }
    DFSPosOrder() {
        let data = [];
        let current = this.root;
        const traverse = (node) => {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            // 改到这一行，push底部的children
            data.push(node.val);
        }
        traverse(current);
        return data;
    }
    DFSInOrder() {
        let data = [];
        let current = this.root;
        const traverse = (node) => {
            node.left && traverse(node.left);
            // 改到这一行，push左边的分支
            data.push(node.val);
            node.right && traverse(node.right);
        }
        traverse(current);
        return data;
    }
}

//       10
//   5       13
// 2   6   11  16

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
