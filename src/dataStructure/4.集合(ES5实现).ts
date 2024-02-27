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
	// 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
	union(otherSet: CustomSet) {
		const result = new CustomSet();
		this.values().forEach((e) => {
			result.add(e);
		});
		otherSet.values().forEach((e) => {
			result.add(e);
		});
		return result;
	}
	// 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
	intersection(otherSet: CustomSet) {
		const result = new CustomSet();
		// 优化次数
		let smallerValues = this.values();
		let biggerValues = otherSet.values();
		if (biggerValues.length < smallerValues.length) {
			// 如果次数更小，交换
			smallerValues = otherSet.values();
			biggerValues = this.values();
		}
		smallerValues.forEach((e) => {
			if (biggerValues.includes(e)) result.add(e);
		});
		return result;
	}
	// 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
	difference(otherSet: CustomSet) {
		const result = new CustomSet();
		this.values().forEach((e) => {
			if (!otherSet.has(e)) result.add(e);
		});
		return result;
	}
	// 子集：验证一个给定的集合是否是另一个集合的子集
	isSubSetOf(otherSet: CustomSet) {
		if (this.size() > otherSet.size()) {
			return false;
		}
		return this.values().every((e) => otherSet.has(e));
	}
}
// const set = new CustomSet();
// set.add(1);
// console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [1]
// console.log('🚀 ~ set.has(1):', set.has(1)); // 🚀 ~ set.has(1): true
// console.log('🚀 ~ set.size():', set.size()); // 🚀 ~ set.size(): 1
// set.add(2);
// console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [1, 2]
// console.log('🚀 ~ set.has(2):', set.has(2)); // 🚀 ~ set.has(2): true
// console.log('🚀 ~ set.size():', set.size()); // 🚀 ~ set.size(): 2
// set.delete(1);
// console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): [2]
// set.delete(2);
// console.log('🚀 ~ set.values():', set.values()); // 🚀 ~ set.values(): []

const set1 = new CustomSet();
set1.add(1);
set1.add(3);
set1.add(5);
set1.add(6);
set1.add(7);
const set2 = new CustomSet();
set2.add(2);
set2.add(4);
set2.add(5);
set2.add(6);
set2.add(8);
console.log('🚀 ~ set1.values():', set1.values());
console.log('🚀 ~ set2.values():', set2.values());
console.log('🚀 ~ set1.union(set2).values():', set1.union(set2).values());
console.log('🚀 ~ set1.intersection(set2).values():', set1.intersection(set2).values());
console.log('🚀 ~ set1.difference(set2).values():', set1.difference(set2).values());
console.log('🚀 ~ set1.isSubSetOf(set2):', set1.isSubSetOf(set2));
