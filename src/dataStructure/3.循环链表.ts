import { LinkedList, LinkNode } from './3.链表';
import { defaultEquals } from './utils/index';

class CircularLinkedList<T> extends LinkedList<T> {
	constructor(equalsFn = defaultEquals) {
		super(equalsFn);
	}
	insert(element: T, index: number) {
		if (index >= 0 && index <= this.count) {
			const node = new LinkNode(element);
			let current = this.head;
			if (index === 0) {
				if (this.head === null) {
					this.head = node;
					node.next = this.head;
				} else {
					node.next = current;
					current = this.getElementAt(this.count - 1) || null;
					current!.next = node;
					this.head = node;
				}
			} else {
				const previous = this.getElementAt(index - 1);
				node.next = previous?.next || null;
				previous!.next = node;
			}
			this.count++;
			return true;
		}
		return false;
	}
	removeAt(index: number) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				if (this.count === 1) {
					this.head = null;
				} else {
					const removed = this.head;
					current = this.getElementAt(this.count - 1) || null;
					this.head = this.head?.next || null;
					current!.next = this.head;
					current = removed;
				}
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous?.next || null;
				previous!.next = current?.next || null;
			}
			this.count--;
			return current?.element;
		}
		return undefined;
	}
}
const linkedList = new CircularLinkedList();
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
console.log(linkedList.remove(2)); // 2
console.log(linkedList.toString()); // 1,9,3,5
console.log(linkedList.removeAt(2)); // 3
console.log(linkedList.toString()); // 1,9,5
