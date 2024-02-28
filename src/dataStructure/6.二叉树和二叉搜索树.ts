import { defaultCompare } from './utils/index';
// 定义树的节点
class TreeNode {
	public key: number;
	public left: TreeNode | null;
	public right: TreeNode | null;

	constructor(key: number) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

// 定义树
class BinarySearchTree {
	private root: TreeNode | null;
	private compareFn: (a: number, b: number) => 0 | 1 | -1;
	constructor(compareFn = defaultCompare) {
		this.root = null;
		this.compareFn = compareFn;
	}

	// 递归插入节点
	insertNode(node: TreeNode, key: number) {
		if (this.compareFn(key, node.key) === -1) {
			if (node.left === null) {
				node.left = new TreeNode(key);
			} else {
				this.insertNode(node.left, key);
			}
		} else {
			if (node.right === null) {
				node.right = new TreeNode(key);
			} else {
				this.insertNode(node.right, key);
			}
		}
	}

	// 向树中插入一个新的键。
	insert(key: number) {
		if (this.root === null) {
			this.root = new TreeNode(key);
		} else {
			this.insertNode(this.root, key);
		}
	}
	// 在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
	search(key: number) {
		return this.searchNode(this.root, key);
	}
	searchNode(node: TreeNode | null, key: number): boolean {
		if (node === null) {
			return false;
		}
		if (this.compareFn(key, node.key) === -1) {
			return this.searchNode(node.left, key);
		} else if (this.compareFn(key, node.key) === 1) {
			return this.searchNode(node.right, key);
		}
		return true;
	}
	// 中序遍历是一种访问BST所有节点的遍历方式，也就是从最小到最大的顺序访问所以节点。
	inOrderTraverse(callback: (e: number) => void) {
		this.inOrderTraverseNode(this.root, callback);
	}
	// 中序遍历的递归方法
	inOrderTraverseNode(node: TreeNode | null, callback: (e: number) => void) {
		if (node !== null) {
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
		}
	}
	// 先序遍历是以优先后代节点的顺序访问每个节点的，先序遍历的一种应用是打印一个结构化的文档。
	preOrderTraverse(callback: (e: number) => void) {
		this.preOrderTraverseNode(this.root, callback);
	}
	preOrderTraverseNode(node: TreeNode | null, callback: (e: number) => void) {
		if (node !== null) {
			callback(node.key);
			this.preOrderTraverseNode(node.left, callback);
			this.preOrderTraverseNode(node.right, callback);
		}
	}
	// 后续遍历则是先访问节点的后代节点，再访问节点本身。后续遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
	postOrderTraverse(callback: (e: number) => void) {
		this.postOrderTraverseNode(this.root, callback);
	}
	postOrderTraverseNode(node: TreeNode | null, callback: (e: number) => void) {
		if (node !== null) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
	// 返回树中最小的值/键。
	min() {
		return this.minNode(this.root);
	}
	minNode(node: TreeNode | null) {
		let current = node;
		while (current !== null && current.left !== null) {
			current = current.left;
		}
		return current;
	}
	// 返回树中最大的值/键。
	max() {
		return this.maxNode(this.root);
	}
	maxNode(node: TreeNode | null) {
		let current = node;
		while (current !== null && current.right !== null) {
			current = current.right;
		}
		return current;
	}
	// 从树中移除某个键。
	remove(key: number) {
		this.root = this.removeNode(this.root, key);
	}
	removeNode(node: TreeNode | null, key: number) {
		if (node === null) {
			return null;
		}
		if (this.compareFn(key, node.key) === -1) {
			node.left = this.removeNode(node.left, key);
			return node;
		} else if (this.compareFn(key, node.key) === 1) {
			node.right = this.removeNode(node.right, key);
			return node;
		} else {
			// 键等于node.key
			// 第一种情况——一个叶节点
			if (node.left === null && node.right === null) {
				node = null;
				return node;
			}
			// 第二种情况——一个只有一个子节点的节点
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}
			// 第三种情况——一个有两个子节点的节点
			const aux = this.minNode(node.right);
			node.key = aux!.key;
			node.right = this.removeNode(node.right, aux!.key);
			return node;
		}
	}
}
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
const printNode = (e: number) => {
	process.stdout.write(e + ' ');
};
process.stdout.write('\n先序遍历:');
tree.inOrderTraverse(printNode); // 先序遍历:3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

process.stdout.write('\n中序遍历:');
tree.preOrderTraverse(printNode); // 中序遍历：11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

process.stdout.write('\n后序遍历:');
tree.postOrderTraverse(printNode); // 后序遍历：3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
console.log('\n');

console.log('🚀 ~ tree.min()?.key:', tree.min()?.key); // 🚀 ~ tree.min()?.key: 3
console.log('🚀 ~ tree.max()?.key:', tree.max()?.key); // 🚀 ~ tree.max()?.key: 25

console.log('🚀 ~ tree.search(8):', tree.search(8)); // 🚀 ~ tree.search(8): true

tree.remove(8);

process.stdout.write('\n先序遍历:');
tree.inOrderTraverse(printNode); // 先序遍历:3 5 6 7 9 10 11 12 13 14 15 18 20 25

process.stdout.write('\n中序遍历:');
tree.preOrderTraverse(printNode); // 中序遍历：11 7 5 3 6 9 10 15 13 12 14 20 18 25

process.stdout.write('\n后序遍历:');
tree.postOrderTraverse(printNode); // 后序遍历：3 6 5 10 9 7 12 14 13 18 25 20 15 11
console.log('\n');
