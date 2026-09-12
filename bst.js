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
    getPredecessor(rootNode) {
        let temp = rootNode.leftChild;
        while (temp != null && temp.rightChild != null) {
            temp = temp.rightChild;
        }
        return temp;
    }
    deleteItem(value, rootNode = this.root) {
        if (!rootNode) return rootNode;
        if (!this.includes(value)) return;

        if (rootNode.data > value) {
            rootNode.leftChild = this.deleteItem(value, rootNode.leftChild);
        } else if (rootNode.data < value) {
            rootNode.rightChild = this.deleteItem(value, rootNode.rightChild);
        } else {
            if (rootNode.leftChild === null) {
                return rootNode.rightChild;
            }
            if (rootNode.rightChild === null) {
                return rootNode.leftChild;
            }
            let predecessor = this.getPredecessor(rootNode);
            rootNode.data = predecessor.data;
            rootNode.leftChild = this.deleteItem(predecessor.data, rootNode.leftChild);
        }

        return rootNode;
    }
    levelOrderForEach(callback) {
        if (!callback) throw new Error("callback is required");
        if (this.root === null) return;
        let visitedNode = [];
        let discorveredNode = [];
        let visitedNodeData = [];
        discorveredNode.push(this.root);
        while (discorveredNode.length != 0) {
            let front = discorveredNode[0];
            visitedNodeData.push(front.data);
            //console.log(visitedNodeData);
            discorveredNode.shift();
            if (front.leftChild != null) discorveredNode.push(front.leftChild);
            if (front.rightChild != null) discorveredNode.push(front.rightChild);
        }
        let update = [];
        for (let i = 0; i < visitedNodeData.length; i++) {
            update.push(callback(visitedNodeData[i]));
        }
        return update;
    }
    preOrderForEach(callback, nodeList = [], rootNode = this.root) {
        if (!callback) throw new Error("callback is required");
        if (rootNode === null) return rootNode;
        nodeList.push(rootNode);
        nodeList.push(this.preOrderForEach(callback, nodeList, rootNode.leftChild));
        nodeList.push(this.preOrderForEach(callback, nodeList, rootNode.rightChild));
        let nodeListNoNull = nodeList.filter((node) => node != null);
        let nodeListData = [];
        nodeListNoNull.forEach((node) => {
            nodeListData.push(node.data);
        });
        let nodeListNoUndefined = nodeListData.filter((node) => node != undefined);
        let callbackNodeList = [];
        nodeListNoUndefined.forEach((item) => {
            callbackNodeList.push(callback(item));
        });

        return callbackNodeList;
    }
    postOrderForEach(callback, nodeList = [], rootNode = this.root) {
        if (!callback) throw new Error("callback is required");
        if (rootNode === null) return rootNode;
        nodeList.push(this.postOrderForEach(callback, nodeList, rootNode.leftChild));
        nodeList.push(this.postOrderForEach(callback, nodeList, rootNode.rightChild));

        nodeList.push(rootNode);
        let nodeListNoNull = nodeList.filter((node) => node != null);
        let nodeListData = [];
        nodeListNoNull.forEach((node) => {
            nodeListData.push(node.data);
        });
        let nodeListNoUndefined = nodeListData.filter((node) => node != undefined);
        let callbackNodeList = [];
        nodeListNoUndefined.forEach((item) => {
            callbackNodeList.push(callback(item));
        });

        return callbackNodeList;
    }

    inOrderForEach(callback, nodeList = [], rootNode = this.root) {
        if (!callback) throw new Error("callback is required");

        if (rootNode === null) return rootNode;
        nodeList.push(this.inOrderForEach(callback, nodeList, rootNode.leftChild));
        nodeList.push(rootNode);
        nodeList.push(this.inOrderForEach(callback, nodeList, rootNode.rightChild));

        let nodeListNoNull = nodeList.filter((node) => node != null);
        let nodeListData = [];
        nodeListNoNull.forEach((node) => {
            nodeListData.push(node.data);
        });
        let nodeListNoUndefined = nodeListData.filter((node) => node != undefined);
        let callbackNodeList = [];
        nodeListNoUndefined.forEach((item) => {
            callbackNodeList.push(callback(item));
        });

        return callbackNodeList;
    }
    #findNodeFromValue(value, nodeList = [], rootNode = this.root) {
        if (rootNode === null) return rootNode;
        nodeList.push(this.#findNodeFromValue(value, nodeList, rootNode.leftChild));
        nodeList.push(rootNode);
        nodeList.push(this.#findNodeFromValue(value, nodeList, rootNode.rightChild));

        let nodeListNoNull = nodeList.filter((node) => node != null);
        let valueNode;
        nodeListNoNull.forEach((node) => {
            if (node.data === value) {
                valueNode = node;
            }
        });
        return valueNode;
    }
    height(value) {
        if (!this.includes(value)) return undefined;
        let temp = this.#findNodeFromValue(value);

        let discorveredNode = [];

        let count = 0;
        discorveredNode.push(temp);
        while (discorveredNode.length != 0) {
            for (let i = 0; i < discorveredNode.length; i++) {
                let front = discorveredNode.shift();
                if (front.leftChild != null) discorveredNode.push(front.leftChild);
                if (front.rightChild != null) discorveredNode.push(front.rightChild);
            }

            count += 1;
        }

        return count - 1;
    }
}

function callback(value) {
    return value;
}

let t = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//t.levelOrderForEach(callbackLevelOrderForEach);
t.prettyPrint(t.root);
let a = t.height(6);
console.log("height: ", a);
//[1, 2, 3, 4, 5, 6, 7, 8, 9]
