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
