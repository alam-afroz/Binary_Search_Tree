import { Tree } from "./bst.js";

let randomArray = [14, 88, 3, 57, 92, 41, 76, 29, 65, 8];
let t = new Tree(randomArray);
t.prettyPrint(t.root);

console.log(t.isBalanced()); //true

function callback(value) {
    return value;
}

console.log("Level Order: ", t.levelOrderForEach(callback));
console.log("InOrder: ", t.inOrderForEach(callback));
console.log("PreOrder: ", t.preOrderForEach(callback));
console.log("PostOrder: ", t.postOrderForEach(callback));

// unbalancing the tree

t.insert(105);
t.insert(106);
t.prettyPrint(t.root);

console.log(t.isBalanced()); //false
t.rebalance();
t.prettyPrint(t.root);
console.log(t.isBalanced()); //true

console.log("Level Order after insertion and rebalancing: ", t.levelOrderForEach(callback));
console.log("InOrder after insertion and rebalancing: ", t.inOrderForEach(callback));
console.log("PreOrder after insertion and rebalancing: ", t.preOrderForEach(callback));
console.log("PostOrder after insertion and rebalancing: ", t.postOrderForEach(callback));
