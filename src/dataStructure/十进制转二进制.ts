interface IStack<T> {
	[key: string]: T;
}

class Stack<T = any> {
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
		return this.count === 0;
	}
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		console.clear();
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

// 十进制转二进制
const decimalToBinary = (decNumber: number) => {
	const stack = new Stack<number>();
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

console.log(decimalToBinary(9991));
