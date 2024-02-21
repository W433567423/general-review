// 深拷贝对象
const deepClone = (target: any) => {
	let newObj: any;
	if (typeof target === 'object') {
		if (Array.isArray(target)) {
			newObj = [];
			for (const i in target) {
				newObj.push(deepClone(target[i]));
			}
		} else if (target === null) {
			newObj = null;
		} else if (target.constructor === RegExp) {
			newObj = target;
		} else {
			newObj = {};
			for (const i in target) {
				newObj[i] = deepClone(target[i]);
			}
		}
	} else {
		newObj = target;
	}
	return newObj;
};

deepClone({});
