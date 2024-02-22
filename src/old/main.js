import Queue from './queue.js';
function BinarySearchTree() {
	function Node(key) {
		this.key = key;
		this.left = null;
		this.right = this.right;
	}
	this.root = null;
	//插入
	BinarySearchTree.prototype.insert = function (key) {
		let newNode = new Node(key);
		if (this.root === null) this.root = newNode;
		else this.insertNode(this.root, newNode);
	};
	//递归插入
	BinarySearchTree.prototype.insertNode = function (node, newNode) {
		// console.log('当前节点:', node.key)
		if (newNode.key > node.key)
			if (!node.right) node.right = newNode;
			else this.insertNode(node.right, newNode);
		else if (!node.left) node.left = newNode;
		else this.insertNode(node.left, newNode);
	};
	//搜索
	BinarySearchTree.prototype.search = function (key) {
		return this.searchNode(this.root, key);
	};
	BinarySearchTree.prototype.searchNode = function (node, key) {
		if (!node) return false;
		if (key > node.key) return this.searchNode(node.right, key);
		else if (key < node.key) return this.searchNode(node.left, key);
		else return true;
	};
	//遍历
	//先序遍历
	BinarySearchTree.prototype.preOrderTraversal = function (handler) {
		this.preOrderTraversalNode(this.root, handler);
	};
	//递归
	BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
		if (node != null) {
			handler(node.key);
			this.preOrderTraversalNode(node.left, handler);
			this.preOrderTraversalNode(node.right, handler);
		}
	};
	//中序遍历
	BinarySearchTree.prototype.inOrderTraversal = function (handler) {
		this.inOrderTraversalNode(this.root, handler);
	};
	//递归
	BinarySearchTree.prototype.inOrderTraversalNode = function (node, handler) {
		if (node != null) {
			this.inOrderTraversalNode(node.left, handler);
			handler(node.key);
			this.inOrderTraversalNode(node.right, handler);
		}
	};
	//后序遍历
	BinarySearchTree.prototype.postOrderTraversal = function (handler) {
		this.postOrderTraversalNode(this.root, handler);
	};
	//递归
	BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
		if (node != null) {
			this.postOrderTraversalNode(node.left, handler);
			this.postOrderTraversalNode(node.right, handler);
			handler(node.key);
		}
	};
	// 最大值最小值
	BinarySearchTree.prototype.max = function () {
		let node = this.root;
		while (node.right) node = node.right;
		return node.key;
	};
	BinarySearchTree.prototype.min = function () {
		let node = this.root;
		while (node.left) node = node.left;
		return node.key;
	};
	//删除【重难点】
	BinarySearchTree.prototype.remove = function (key) {
		let current = this.root;
		let parent = this.root;
		let isLeftChild = true;
		while (current.key !== key) {
			parent = current;
			if (current.key > key) {
				isLeftChild = true;
				current = current.left;
			} else {
				isLeftChild = false;
				current = current.right;
			}
			if (current === null) return false;
			//为叶子节点
			if (!current.left && !current.right) {
				if (current == this.root) this.root = null;
				else if (isLeftChild) parent.left = null;
				else parent.right = null;
			}

			//有一个子节点
			//删除节点的右节点为空
			else if (!current.right) {
				//删除根节点
				if (current == this.root) this.root = current.left;
				else if (isLeftChild) parent.left = current.left;
				else parent.right = current.left;
			}
			//删除节点的左节点为空
			else if (!current.left) {
				//删除根节点
				if (current == this.root) this.root = current.right;
				else if (isLeftChild) parent.left = current.right;
				else parent.right = current.right;
			}
			//有两个子节点
			else {
				let successor = this.getSuccssor(current);
				if (current == this.root) this.root = successor;
				else if (isLeftChild) parent.left = successor;
				else parent.right = successor;
				successor.left = current.left;
			}
			return true;
			// else {
			//   //寻找要删除节点右树的最小键值
			//   let node = current.right
			//   while (node.left) {
			//     node = node.left
			//   }
			//   //递归删除最小键值节点：肯定满足情况一和情况二
			//   this.remove(node.key)
			//   //用最小键值节点替换要删除的节点
			//   current.key = node.key
			//   current.data = node.data
			// }
		}
	};
	//获取后继
	BinarySearchTree.prototype.getSuccssor = function (delNode) {
		let successor = delNode;
		let current = delNode.right;
		let successorParent = delNode;
		while (current) {
			successorParent = successor;
			successor = current;
			current = current.left;
		}
		if (successor != delNode.right) {
			successorParent.left = successor.right;
			successor.right = delNode.right;
		}
		return successor;
	};
	层序遍历;
	BinarySearchTree.prototype.levelOrder = function () {
		let queue = new Queue();
		queue.enqueue(this.root);
		while (!queue.isEmpty()) {
			let node = queue.dequeue();
			console.log(node.key);
			if (node.left) queue.enqueue(node.left);
			if (node.right) queue.print(node.right);
		}
	};
}
let bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
// console.log(bst.root.left.right.key)
var resultSting = '';
bst.preOrderTraversal(function (key) {
	resultSting += key + ' ';
});
console.log('先序遍历:', resultSting);
var resultSting = '';
bst.inOrderTraversal(function (key) {
	resultSting += key + ' ';
});
console.log('中序遍历:', resultSting);
var resultSting = '';
bst.postOrderTraversal(function (key) {
	resultSting += key + ' ';
});
console.log('后序遍历:', resultSting);
console.log('最大值:', bst.max());
console.log('最小值:', bst.min());
console.log(bst.search(343));
console.log(bst.search(7));
console.log(bst.search(23));
bst.remove(9);
// bst.remove(7)
// bst.remove(15)
// bst.levelOrder()
var resultSting = '';
bst.inOrderTraversal(function (key) {
	resultSting += key + ' ';
});
console.log('中序遍历:', resultSting);

/*删除9的时候有bug（删除了7）*/
