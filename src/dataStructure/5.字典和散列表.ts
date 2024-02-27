import { defaultToString } from './utils/index';
// 基于类实现
interface IDictionary<T = any> {
	[key: string | number | symbol]: T;
}

class ValuePair {
	private key: string | number | symbol;
	private value: any;
	constructor(key: string | number | symbol, value: any) {
		this.key = key;
		this.value = value;
	}
	toString() {
		if (typeof this.key === 'symbol') {
			return `[#${String(this.key)}]: ${this.value}`;
		} else return `{#${this.key}}: ${this.value}`;
	}
}

class Dictionary {
	private toStrFn: (item: unknown) => string;
	private table: IDictionary;
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 向字典中添加新元素，如果key已经存在，那么已存在的value会被覆盖。
	set(key: string | number | symbol, value: any) {
		if (key != null && value != null) {
			const tableKey = this.toStrFn(key);
			this.table[tableKey] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 在字典中移除指定键的元素。
	remove(key: string | number | symbol) {
		if (this.hasKey(key)) {
			delete this.table[this.toStrFn(key)];
			return true;
		}
		return false;
	}
	// 在字典中判断是否存在指定键的元素。
	hasKey(key: string | number | symbol) {
		const value = this.table[this.toStrFn(key)];
		return value !== null && value != undefined;
	}
	// 在字典中获取指定键的元素。
	get(key: string | number | symbol) {
		const valuePair = this.table[this.toStrFn(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
	// 清空字典。
	clear() {
		this.table = {};
	}
	// 返回字典所包含元素的数量。
	size() {
		return this.keyValues().length;
	}
	// 判断字典是否为空。
	isEmpty() {
		return this.size() === 0;
	}
	// 将字典中所有的键以数组的形式返回。
	keys() {
		return this.keyValues().map((valuePair) => valuePair.key);
	}
	// 将字典中所有的值以数组的形式返回。
	values() {
		return this.keyValues().map((valuePair) => valuePair.value);
	}
	// 将字典中所有的[键， 值]对返回。
	keyValues() {
		return Object.values(this.table);
	}
	// 字典迭代方法。
	forEach(callback: (key: string | number | symbol, value: any) => any) {
		const valuePairs = this.keyValues();
		for (let index = 0; index < valuePairs.length; index++) {
			const result = callback(valuePairs?.[index].key, valuePairs?.[index].value);
			if (result === false) {
				break;
			}
		}
	}
	// 打印成字符串
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		const valuePairs = this.keyValues();
		let objStr = valuePairs[0].toString();
		for (let index = 1; index < valuePairs.length; index++) {
			objStr = `${objStr}, ${valuePairs[index].toString()}`;
		}
		return objStr;
	}
}
const dic = new Dictionary();
dic.set('AAA', 'AAA@qq.com');
dic.set('BBB', 'BBB@163.com');
dic.set('CCC', 'CCC@gmail.com');
console.log(dic.hasKey('AAA')); // true
console.log(dic.size()); // 3
console.log(dic.get('AAA')); // AAA@qq.com
console.log(dic.keys()); // ['AAA', 'BBB', 'CCC']
console.log(dic.values()); // ['AAA@qq.com', 'BBB@163.com', 'CCC@gmail.com']
console.log(dic.keyValues()); // [{key: 'AAA', value: 'AAA@qq.com'}， {key: 'BBB', value: 'BBB@qq.com'}， {key: 'CCC', value: 'CCC@qq.com'}]
dic.remove('BBB');
console.log(dic.keys()); // ['AAA', 'CCC']
console.log(dic.values()); // ['AAA@qq.com',  'CCC@gmail.com']
console.log(dic.keyValues()); // [{key: 'AAA', value: 'AAA@qq.com'}， {key: 'CCC', value: 'CCC@qq.com'}]
dic.forEach((key, value) => {
	if (typeof key === 'symbol') {
		return `[#${String(key)}]: ${value}`;
	} else return `{#${key}}: ${value}`;
}); // [forEach: key: AAA, value: AAA@qq.com, forEach: key: CCC, value: CCC@gmail.com]
