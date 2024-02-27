# 数据结构

## 数组

### 创建和初始化数组

- 构造函数

  ```javascript
  let arr = new Array(); // 创建一个空数组
  let arr1 = new Array(6); // 创建一个长度为6的数组
  let arr2 = new Array(1, 2, 3); // 创建一个数组，其元素为1， 2， 3
  console.log(arr); // []
  console.log(arr1); // [empty*6]
  console.log(arr2); // [1, 2, 3]
  ```

- 字面量

  ```javascript
  let arr = []; // 创建一个空数组
  let arr2 = [1, 2, 3]; // 创建一个数组，其元素为1， 2， 3
  console.log(arr); // []
  console.log(arr2); // [1, 2, 3]
  ```

### 对数组的操作

- 添加元素

  ```ts
  // 1.在数组首位添加
  Array.prototype.unshift;
  // 在数组的开头添加一个元素，需要我们依次把数组中的每一个元素往后移动一位，最后把待添加的元素放置到最前面。

  // 2.在数组末尾添加
  Array.prototype.push;
  ```

- 删除元素

  ```ts
  // 1.在数组首位删除
  Array.prototype.shift;
  // 如果要从数组开头删除元素，其逻辑和在数组开头添加元素相反，需要把每一个元素向前挪动一位

  // 2.在数组末尾删除
  Array.prototype.pop;
  ```

- 在任意位置添加和删除元素

  ```ts
  // 使用splice()方法可以让我们在数组中的任意位置删除或添加元素，其参数为：
  
  //第一个参数：表示想要删除或插入的元素的索引。
  // 第二个参数：表示删除元素的格式。
  // 第三个参数：表示添加到数组中的值。
  ```

### 数组方法列表

| 方法        | 描述                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| concat      | 连接2个或者更多数组，并返回结果                                                      |
| every       | 对数组中的每一个元素运行给定的函数，如果该函数对每一个元素都返回`true`，则返回`true` |
| filter      | 对数组中的每一个元素运行给定的函数，返回该函数会返回`true`的元素组成的数组           |
| forEach     | 对数组中的每一个元素运行给定的函数                                                   |
| join        | 将所有的数组元素以指定的字符链接成一个字符串                                         |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1                           |
| lastIndexOf | 从数组末尾开始搜索，并返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1     |
| map         | 对数组中的每一个元素运行给定的函数，返回每次函数调用的结果组成的数组                 |
| reverse     | 颠倒数组中元素的顺序                                                                 |
| slice       | 传入索引值，将数组里对应索引范围内的元素作为新数组返回                               |
| some        | 对数组中的每个元素运行给定的函数，如果任一元素返回`true`，则返回`true`               |
| sort        | 按照元素的`ASCII`值进行排序                                                          |
| reduce      | 返回数组中所以元素值的合计                                                           |
| toString    | 将数组作为字符串返回                                                                 |
| valueOf     | 和`toString`类似，将数组作为字符串返回                                               |
|             | **以下是ES6新增的方法**                                                              |
| @@iterator  | 返回一个包含数组键值对的迭代器对象，可以通过同步调用的方式得到数组元素的键值对       |
| copyWhthin  | 复制数组中的一系列元素到同一数组指定的起始位置                                       |
| entries     | 返回包含数组所有键值对的`@@iterator`                                                 |
| find        | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素                         |
| findIndex   | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素的索引                   |
| fill        | 用静态值填充数组                                                                     |
| from        | 将一个类数组转换为一个真正的数组                                                     |
| of          | 根据传入的参数创建一个新数组                                                         |
| values      | 返回包含数组中所以值的`@@iterator`                                                   |
|             | **以下是ES7新增的方法**                                                              |
| includes    | 如果数组中存在某个元素，则返回`true`，否则返回`false`                                |

## 栈

栈是一种遵从后进先出(`LIFO`)原则的有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。

### 实现栈(基于数组)

```ts
// 基于数组实现
class StackByArray<T = any> {
	private items: Array<T>;
	constructor() {
		this.items = [];
	}
	// 添加末尾元素
	push(element: T) {
		this.items.push(element);
	}
	// 删除末尾元素
	pop() {
		return this.items.pop();
	}
	// 获取末尾元素
	peek() {
		return this.items[this.size() - 1];
	}
	// 是否为空
	isEmpty() {
		return !this.size();
	}
	// 清空栈
	clear() {
		return (this.items = []);
	}
	// 获取栈元素数量
	size() {
		return this.items.length;
	}
}
```

### 实现栈(基于对象)

```ts
// 基于类实现
interface IStack<T> {
	[key: string]: T;
}
class StackByClass<T = any> {
	private count: number;
	private items: IStack<T>;
	constructor() {
		this.count = 0;
		this.items = {};
	}
	push(element: T) {
		this.items[this.count] = element;
		this.count++;
	}
	size() {
		return this.count;
	}
	isEmpty() {
		return !this.count;
	}
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--;
		const result = this.items[this.count];
		delete this.items[this.count];
		return result;
	}
	peek() {
		return this.items[this.count - 1];
	}
	clear() {
		this.count = 0;
		this.items = {};
	}
	// 打印栈
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		let result: string = String(this.items['0']);
		for (let i = 1; i < this.count; i++) {
			result = `${result},${this.items[i]}`;
		}
		return result;
	}
}
```

### 栈的应用

#### 十进制二进制

```ts
// 十进制转二进制
const convertBinary = (decNumber: number) => {
	const stack = new Stack<number>(); // 存放进制的栈
	let number = decNumber;
	let rem: number;
	let binaryString = ''; // 转换后的二进制
	while (number > 0) {
		rem = Math.floor(number % 2); // 获取余数
		number = Math.floor(number / 2); // 获取商
		stack.push(rem); // 入栈
	}

	while (!stack.isEmpty()) {
		binaryString += stack.pop()!.toString();
	}
	return binaryString;
};
```

#### 十进制转任意进制

```ts
// 进制转化
const ConversionBase = (decNumber: number, base: number) => {
	if (base < 2 || base > 36) {
		return '';
	}
	const stack = new Stack<number>(); // 存放进制的栈
	const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 被除数|进制
	let number = decNumber;
	let rem: number; // 余数
	let baseString = ''; // 转换后的进制结果
	while (number > 0) {
		rem = Math.floor(number % base);
		number = Math.floor(number / base);
		stack.push(rem);
	}
	while (!stack.isEmpty()) {
		baseString += digits[stack.pop()!];
	}
	return baseString;
};
```

## 队列和双端队列

队列是一种遵循先进先出(FIFO)原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，而双端队列是一种将栈的原则和队列的原则混合在一起的数据结构。

### 实现队列(基于对象)

```ts
// 队列
interface IQueue<T> {
	[key: string]: T;
}
class Queue<T = any> {
	private lastIndex: number;
	private firstIndex: number;
	private items: IQueue<T>;
	constructor() {
		this.lastIndex = 0;
		this.firstIndex = 0;
		this.items = {};
	}
	//向队列的尾部添加元素
	enqueue(e: T) {
		this.items[this.lastIndex] = e;
		this.lastIndex++;
	}
	// 在队列的开头移除第一个元素，并返回被移除的元素
	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.firstIndex];
		delete this.items[this.firstIndex];
		this.firstIndex++;
		return result;
	}
	// 返回队列的第一个元素
	peek() {
		return this.items[this.firstIndex];
	}
	// 判断队列是否为空
	isEmpty() {
		return !this.size();
	}
	// 返回队列包含元素的个数
	size() {
		return this.lastIndex - this.firstIndex;
	}
	// 清空队列
	clear() {
		this.firstIndex = 0;
		this.lastIndex = 0;
		this.items = {};
	}
	// 将队列转换成字符串格式
	toString() {
		if (this.isEmpty()) {
			return undefined;
		}
		let result = '';
		for (let i = this.firstIndex; i < this.lastIndex; i++) result += `${this.items[i]},`;
		return result.slice(0, -1);
	}
}

export { Queue };

const queue = new Queue<string>();
queue.enqueue('AAA');
queue.enqueue('BBB');
queue.enqueue('CCC');
queue.enqueue('DDD');
console.log(queue.isEmpty()); // false
console.log(queue.size()); // 4
console.log(queue.toString()); // AAA,BBB,CCC,DDD
console.log(queue.peek()); // AAA
queue.dequeue();
queue.clear();
console.log(queue.isEmpty()); // true
```

### 双端队列数据结构

双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列，在计算机科学中，双端队列的一个常见应用是存储一系列撤销操作，每当用户在软件中进行了一个操作，该操作被存在一个双端队列中，当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行预先定义的一定数量的操作后，最新进行的操作会被从双端队列的前端移除。

```ts
// 双端队列
interface IDQueue<T> {
	[key: string]: T;
}
class DQueue<T = any> {
	private lastIndex: number;
	private firstIndex: number;
	private items: IDQueue<T>;
	constructor() {
		this.lastIndex = 0;
		this.firstIndex = 0;
		this.items = {};
	} // 在双端队列的前端添加新元素。
	addFront(e: T) {
		this.items[--this.firstIndex] = e;
	}
	// 在双端队列的后端添加新元素。
	addBack(e: T) {
		this.items[this.lastIndex] = e;
		this.lastIndex++;
	}
	// 在双端队列的前端移除新元素。
	removeFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.firstIndex];
		delete this.items[this.firstIndex];
		this.firstIndex++;
		return result;
	}
	// 在双端队列的后端移除新元素。
	removeBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.lastIndex--;
		const result = this.items[this.lastIndex];
		delete this.items[this.lastIndex];
		return result;
	}
	// 返回双端队列前端的第一个元素。
	peekFront() {
		return this.items[this.firstIndex];
	}
	// 返回双端队列后端的第一个元素。
	peekBack() {
		return this.items[this.lastIndex - 1];
	}
	// 判断队列是否为空
	isEmpty() {
		return !this.size();
	}
	// 返回队列包含元素的个数
	size() {
		return this.lastIndex - this.firstIndex;
	}
	// 清空队列
	clear() {
		this.firstIndex = 0;
		this.lastIndex = 0;
		this.items = {};
	}
	// 将队列转换成字符串格式
	toString() {
		if (this.isEmpty()) {
			return undefined;
		}
		let result = '';
		for (let i = this.firstIndex; i < this.lastIndex; i++) result += `${this.items[i]},`;
		return result.slice(0, -1);
	}
}

export { DQueue };

const dQueue = new DQueue<string>();
dQueue.addFront('BBB');
dQueue.addFront('AAA');
dQueue.addBack('CCC');
dQueue.addBack('DDD');
console.log('🚀 ~ dQueue.isEmpty():', dQueue.isEmpty()); // false
console.log('🚀 ~ dQueue.size():', dQueue.size()); // 4
console.log('🚀 ~ dQueue.toString():', dQueue.toString()); // AAA,BBB,CCC,DDD
console.log('🚀 ~ dQueue.peekBack():', dQueue.peekBack()); // DDD
console.log('🚀 ~ dQueue.peekFront:', dQueue.peekFront()); // AAA
dQueue.removeBack();
console.log('🚀 ~ dQueue.removeBack():', dQueue.toString()); // AAA,BBB,CCC
dQueue.removeFront();
console.log('🚀 ~ dQueue.removeFront():', dQueue.toString()); // BBB,CCC
dQueue.clear();
console.log('🚀 ~ dQueue.isEmpty():', dQueue.isEmpty()); // true
```

### 队列的应用

#### 击鼓传花

```ts
import { Queue } from './2.队列';
/**
 * DONE
 * @description 击鼓传花
 * @author tutu
 * @time 2024-02-23 16:34:39
 * @param {T[]} list 参赛者列表
 * @param {number} num 击鼓传花的次数
 * @returns {}
 */
const hotPotato = <T>(list: T[], num: number) => {
	const queue = new Queue();
	const eliminatedList = [];
	// 将参赛者放入队列
	list.forEach((e) => queue.enqueue(e));
	console.log('🚀 ~ 游戏开始:', list);

	while (queue.size() > 1) {
		for (let i = 0; i < num; i++) {
			// console.log('🚀 ~ hotPotato ~ i:', i, queue.peek());
			queue.enqueue(queue.dequeue());
		}
		console.log('🚀 ~ 击鼓到,淘汰一位:', queue.peek());

		eliminatedList.push(queue.dequeue());
		console.log('🚀 ~ 击鼓队列:', [queue.toString()]);
	}

	return {
		eliminated: eliminatedList,
		winner: queue.dequeue()
	};
};

const names = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
const result = hotPotato(names, 7);
console.log(`胜利者：${result.winner}`);
```

#### 回文检测

```ts
import { DQueue } from './2.双端队列';

/**
 * DONE
 * @description 检测回文
 * @author tutu
 * @time 2024-02-23 16:44:17
 * @param {string} str 检测的字符串
 * @returns {boolean} 是否是回文
 */
const palindromeChecker = (str: string) => {
	if (!str.length) return false;

	const dequeue = new DQueue();
	const lowerStr = str.toLowerCase().replaceAll(/s/g, '');

	let firstStr: string, lastStr: string;
	let isEqual = true;

	for (const e of lowerStr) dequeue.addBack(e.charAt);

	while (dequeue.size() > 1 && isEqual) {
		firstStr = dequeue.removeFront();
		lastStr = dequeue.removeBack();
		if (firstStr !== lastStr) isEqual = false;
	}
	return isEqual;
};

console.log("🚀 ~ palindromeChecker('kayak'):", palindromeChecker('kayak'));
console.log("🚀 ~ palindromeChecker('level'):", palindromeChecker('level'));
console.log("🚀 ~ palindromeChecker('ABBC'):", palindromeChecker('ABBC'));
```

## 链表(单，双向，循环)

### 实现单向链表

```ts	
import { defaultEquals } from './utils/index';

// 定义节点
export class LinkNode<T = any> {
	public element: T;
	public next: LinkNode | null;

	constructor(e: T) {
		this.element = e;
	}
}

// 定义列表
export class LinkedList<T> {
	protected count: number;
	protected head: LinkNode | null;
	protected equalsFn: (a: T, b: T) => boolean;
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
				const cur = this.getElementAt(index - 1) || null;
				node.next = cur?.next || null;
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
				this.head = cur?.next || null;
			} else {
				const prev = this.getElementAt(index - 1) || null;
				cur = prev?.next || null;
				prev!.next = cur?.next || null;
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
const link = new LinkedList();
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
```

### 实现双向链表

```ts	
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
```

### 实现循环链表

```ts
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
```

## 集合

### 实现集合

```ts	
// 基于类实现
interface ISet<T = any> {
	[key: string | number | symbol]: T;
}
class CustomSet {
	private items: ISet;
	constructor() {
		this.items = {};
	}
	// 向集合中添加新元素。
	add(element: string | number | symbol) {
		if (!this.has(element)) {
			this.items[element] = element;
			return true;
		}
		return false;
	}
	// 从集合移除一个元素。
	delete(element: string | number | symbol) {
		if (this.has(element)) {
			delete this.items[element];
			return true;
		}
		return false;
	}
	// 判断元素是否在集合中，如果是则返回true，否则返回false。
	has(element: string | number | symbol) {
		return element in this.items;
	}
	// 清空集合。
	clear() {
		this.items = {};
	}
	// 返回集合所包含元素的数量。
	size() {
		return Object.keys(this.items).length;
	}
	// 返回一个包含集合中所有值的数组。
	values() {
		return Object.values(this.items);
	}
}
const set = new CustomSet();
set.add(1);
console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [1]
console.log('🚀 ~ set.has(1):', set.has(1)); // 🚀 ~ set.has(1): true
console.log('🚀 ~ set.size():', set.size()); // 🚀 ~ set.size(): 1
set.add(2);
console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [1, 2]
console.log('🚀 ~ set.has(2):', set.has(2)); // 🚀 ~ set.has(2): true
console.log('🚀 ~ set.size():', set.size()); // 🚀 ~ set.size(): 2
set.delete(1);
console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [2]
set.delete(2);
console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): []
```

