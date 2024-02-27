import { defaultEquals } from './utils/index';

// 定义节点
class DoublyNode<T = any> {
	public element: T;
	public next: DoublyNode | null;
	public prev: DoublyNode | null;

	constructor(e: T) {
		this.element = e;
	}
}

// 双向定义列表
class DoublyLinkedList<T> {
	public count: number;
	private head: DoublyNode | null;
	private tail: DoublyNode | null;
	private equalsFn: (a: T, b: T) => boolean;

	constructor() {
		this.count = 0;
		this.head = null;
		this.tail = null;
		this.equalsFn = defaultEquals<T>;
	}
	// 插入
	insert(element: T, index: number) {
		if (index >= 0 && index <= this.count) {
			const node = new DoublyNode(element);
			let current = this.head;
			if (index === 0) {
				if (this.head === null) {
					this.head = node;
					this.tail = node;
				} else {
					node.next = this.head;
					current!.prev = node;
					this.head = node;
				}
			} else if (index === this.count) {
				current = this.tail;
				current!.next = node;
				node.prev = current;
				this.tail = node;
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous!.next;
				node.next = current;
				previous!.next = node;
				current!.prev = node;
				node.prev = previous || null;
			}
			this.count++;
			return true;
		}
		return false;
	}
	// 通过下标获取元素
	getElementAt(index: number) {
		// 超出界域返回undefined
		if (index < 0 || index > this.count) return undefined;
		else if (index === 0) return this.head;
		else if (index === this.count) return this.tail;
		else if (index < this.count / 2) {
			// 从头开始寻找
			let cur = this.head;
			for (let i = 0; i < index && cur; i++) {
				cur = cur.next;
				i++;
			}
			return cur;
		} else {
			// 从尾部开始寻找
			// 从头开始寻找
			let cur = this.tail;
			for (let i = 0; i < index && cur; i++) {
				cur = cur.prev;
				i++;
			}
			return cur;
		}
	}
	//获取元素下标
	indexOf(element: T) {
		let cur = this.head;
		for (let i = 0; i < this.count && cur; i++) {
			if (this.equalsFn(element, cur.element)) {
				return i;
			}
			cur = cur.next;
		}
		return -1;
	}
	// 删除指定元素
	remove(element: T) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}
	// 删除任意下标对应的元素
	removeAt(index: number) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = current?.next || null;
				if (this.count === 1) {
					this.tail = null;
				} else {
					this.head!.prev = null;
				}
			} else if (index === this.count - 1) {
				current = this.tail;
				this.tail = current?.prev || null;
				this.tail!.next = null;
			} else {
				current = this.getElementAt(index) || null;
				const previous = current?.prev || null;
				previous!.next = current?.next || null;
				current!.next!.prev = previous;
			}
			this.count--;
			return current!.element;
		}
		return undefined;
	}
	//尾部添加元素
	push(element: T) {
		const node = new DoublyNode(element);
		if (this.head === null) {
			this.tail = node;
			this.head = node;
		} else {
			this!.tail!.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.count++;
	}
	// 获取双向列表的长度
	size() {
		return this.count;
	}
	// 清空双向列表
	clear() {
		this.count = 0;
		this.head = null;
		this.tail = null;
	}
	// 获取双向列表头部元素
	getHead() {
		return this.head === null ? undefined : this.head.element;
	}
	// 获取双向列表尾部元素
	getTail() {
		return this.tail === null ? undefined : this.tail.element;
	}
	// 判断双向列表是否为空
	isEmpty() {
		return !this.count;
	}
	// 打印
	inverseToString() {
		if (this.tail === null) {
			return '';
		}
		let str = `${this.tail.element}`;
		let current = this.tail.prev;
		for (let index = 0; index < this.count && current != null; index++) {
			str = `${str},${current.element}`;
			current = current.prev;
		}
		return str;
	}
	// 返回表示整个链表的字符串
	toString() {
		if (this.isEmpty()) {
			return undefined;
		}
		let result = '';
		let cur = this.head;
		// console.log('🚀 ~ Link<T> ~ toString ~ cur:', cur!.next?.next);
		while (cur) {
			result += `${cur?.element},`;
			cur = cur.next;
		}
		return result.slice(0, -1);
	}
}

const linkedList = new DoublyLinkedList();
console.log(linkedList.size()); // 0
console.log(linkedList.isEmpty()); // true
linkedList.push(1);
console.log(linkedList.getHead()); // 1
linkedList.push(3);
linkedList.push(2);
linkedList.push(5);
console.log(linkedList.size()); // 4
const node = linkedList.getElementAt(2);
console.log(node?.element); // 2
console.log(linkedList.indexOf(5)); // 3
console.log(linkedList.indexOf(8)); // -1
console.log(linkedList.insert(9, 1)); // true
console.log(linkedList.toString()); // 1,9,3,2,5
console.log(linkedList.inverseToString()); // 5,2,3,9,1
console.log(linkedList.getTail()); // 5
console.log(linkedList.remove(2)); // 2
console.log(linkedList.toString()); // 1,9,3,5
console.log(linkedList.inverseToString()); // 5,3,9,1
console.log(linkedList.removeAt(2)); // 3
console.log(linkedList.toString()); // 1,9,5
