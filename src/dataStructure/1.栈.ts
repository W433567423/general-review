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

export { StackByClass as Stack, StackByArray };
