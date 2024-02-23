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
