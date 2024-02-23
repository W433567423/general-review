import { Stack } from './1.栈';

/**
 * DONE
 * @description 十进制转二进制
 * @author tutu
 * @time 2024-02-23 16:25:24"
 * @param {number} decNumber
 * @returns {string} 转化后的进制
 */
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
	// 取出转化后的结果
	while (!stack.isEmpty()) {
		binaryString += stack.pop()!.toString();
	}
	return binaryString;
};

/**
 * DONE
 * @description 进制转化
 * @author tutu
 * @time 2024-02-23 16:31:27
 * @param {number} decNumber
 * @param {number} base
 * @returns {string} 转化后的进制
 */
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
	// 取出转化后的结果
	while (!stack.isEmpty()) {
		baseString += digits[stack.pop()!];
	}
	return baseString;
};

const num = 99916;
console.log('转化为2进制: ', convertBinary(num));
console.log('转化为16进制:', ConversionBase(num, 16));
