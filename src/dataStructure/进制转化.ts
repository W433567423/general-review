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

// 进制转化
const decimalToConvertery = (decNumber: number, base: number) => {
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

const num = 99916;
console.log('转化为2进制: ', decimalToBinary(num));
console.log('转化为16进制:', decimalToConvertery(num, 16));
