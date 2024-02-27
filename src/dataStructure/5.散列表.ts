import { ValuePair, defaultToString } from './utils/index';
// 基于类实现
interface IDictionary<T = any> {
	[key: string | number | symbol]: T;
}

class HashTable {
	private toStrFn: (item: unknown) => string;
	private table: IDictionary;
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 散列函数
	hashCode(key: any) {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 0;
		for (let index = 0; index < tableKey.length; index++) {
			hash += tableKey.charCodeAt(index);
		}
		return hash % 37;
	}
	// 向散列表中添加一个新的项
	put(key: string | number | symbol, value: any) {
		if (key != null && value != null) {
			const hashCode = this.hashCode(key);
			this.table[hashCode] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 根据键值从散列表中移除值
	remove(key: string | number | symbol) {
		const hashCode = this.hashCode(key);
		const valuePair = this.table[hashCode];
		if (valuePair != null) {
			delete this.table[hashCode];
			return true;
		}
		return false;
	}
	// 返回根据键值检索到的特定的值
	get(key: string | number | symbol) {
		const valuePair = this.table[this.hashCode(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
}
const hash = new HashTable();
hash.put('AAA', 'AAA@qq.com');
hash.put('BBB', 'BBB@163.com');
hash.put('CCC', 'CCC@gmail.com');
console.log(hash.hashCode('AAA') + '- AAA'); // 10- AAA
console.log(hash.hashCode('BBB') + '- BBB'); // 13- BBB
console.log(hash.hashCode('CCC') + '- CCC'); // 16- CCC
console.log(hash.get('AAA')); // AAA@qq.com
console.log(hash.get('BBB')); // BBB@163.com
console.log(hash.get('CCC')); // CCC@gmail.com
hash.remove('BBB');
console.log(hash.get('AAA')); // AAA@qq.com
console.log(hash.get('BBB')); // undefined
console.log(hash.get('CCC')); // CCC@gmail.com
