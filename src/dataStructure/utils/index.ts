/**
 * DONE
 * @description 比较两个元素是否相同
 * @author tutu
 * @time 2024-02-23 17:16:23
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean} 比较的结果
 */
const defaultEquals = <T>(a: T, b: T) => {
	return a === b;
};

export { defaultEquals };
