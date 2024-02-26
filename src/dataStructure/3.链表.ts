import { defaultEquals } from './utils/index';

// 定义节点
class LinkNode<T = any> {
	public element: T;
	public next: LinkNode | null;

	constructor(e: T) {
		this.element = e;
	}
}

// 定义列表
class Link<T> {
	private count: number;
	private head: LinkNode | null;
	private equalsFn: (a: T, b: T) => boolean;
	constructor(equalsFn = defaultEquals) {
		this.count = 0;
		this.head = null;
		this.equalsFn = equalsFn<T>;
	}
	// 向链表尾部添加一个新元素
	push(element: T) {
		let cur = null;
		const node = new LinkNode(element);
		if (this.head) {
			cur = this.head;
			while (cur.next) {
				cur = cur.next;
			}
			cur.next = node;
		} else this.head = node;
		this.count++;
	}
	// 在链表指定位置插入一个新元素
	insert(element: T, index: number) {
		if (index >= 0 && index <= this.count) {
			const node = new LinkNode(element);
			// 在链表首位插入
			if (index === 0) {
				node.next = this.head;
				this.head = node;
			} else {
				// 在列表其他地方插入
				const cur = this.getElementAt(index - 1);
				node.next = cur!.next;
				cur!.next = node;
			}
			return true;
		}
		return false;
	}
	// 返回链表中特定位置的元素，如果没有则返回undefined
	getElementAt(index: number) {
		if (index >= 0 && index <= this.count) {
			let cur = this.head;
			for (let i = 0; i < index && cur; i++) {
				cur = cur.next;
			}
			return cur;
		}
		return undefined;
	}
	// 从链表中移除一个元素
	remove(element: T) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}
	// 返回元素在链表中的索引，如果没有则返回-1
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
	// 从链表指定位置移除一个元素
	removeAt(index: number) {
		if (index >= 0 && index < this.count) {
			let cur = this.head;
			if (index === 0) {
				this.head = cur!.next;
			} else {
				const prev = this.getElementAt(index - 1);
				cur = prev!.next;
				prev!.next = cur!.next;
			}
			this.count--;
			return cur;
		}
		return undefined;
	}
	// 如果链表中不包含任何元素，则返回true，否则返回false
	isEmpty() {
		return !this.count;
	}
	// 返回链表包含的元素个数
	size() {
		return this.count;
	}
	// 返回链表的第一个元素
	getHead() {
		return this.head || undefined;
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
const link = new Link();
console.log(link.size()); // 0
console.log(link.isEmpty()); // true
link.push(1);
console.log(link.getHead()); // 1
link.push(3);
link.push(2);
link.push(5);
console.log(link.size()); // 4
const node = link.getElementAt(2);
console.log(node?.element); // 2
console.log(link.indexOf(5)); // 3
console.log(link.indexOf(8)); // -1
console.log(link.insert(9, 1)); // true
console.log(link.toString()); // 1,9,3,2,5
console.log(link.remove(2)?.element); // 2
console.log(link.toString()); // 1,9,3,5
console.log(link.removeAt(2)?.element); // 3
console.log(link.toString()); // 1,9,5
