class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}
class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    buildTree(array, start = 0, end = array.length - 1) {
        //array = [...new Set(array)];
        array.sort((a, b) => a - b);
        array = this.removeDuplicate(array);
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let rootNode = new Node(array[mid]);
        rootNode.leftChild = this.buildTree(array, start, mid - 1);
        rootNode.rightChild = this.buildTree(array, mid + 1, end);

        return rootNode;
    }
    removeDuplicate(array) {
        let temp = array;
        array = [];
        for (let number of temp) {
            if (!array.includes(number)) {
                array.push(number);
            }
        }
        return array;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
    includes(value, rootNode = this.root) {
        if (rootNode === null || rootNode === undefined) return;
        if (rootNode.data === value) {
            return true;
        }
        if (this.includes(value, rootNode.leftChild)) return true;
        if (this.includes(value, rootNode.rightChild)) return true;
        return false;
    }
    insert(value) {
        if (!this.root) return (this.root = new Node(value));
        if (this.includes(value)) return "already inserted";
        let temp = this.root;
        while (temp != null) {
            if (value < temp.data) {
                if (temp.leftChild === null) {
                    temp.leftChild = new Node(value);
                    return;
                }
                temp = temp.leftChild;
            }
            if (value > temp.data) {
                if (temp.rightChild === null) {
                    temp.rightChild = new Node(value);
                    return;
                }
                temp = temp.rightChild;
            }
        }
    }
    deleteItem(value, rootNode = this.root) {
        if (!this.root) return rootNode;
        if (!this.includes(value)) console.log("not in tree");

    }
}

let t = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
t.deleteItem(9);

t.prettyPrint(t.root);
