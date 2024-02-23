// 双端队列
interface IDQueue<T> {
	[key: string]: T;
}
class DQueue<T = any> {
	private lastIndex: number;
	private firstIndex: number;
	private items: IDQueue<T>;
	constructor() {
		this.lastIndex = 0;
		this.firstIndex = 0;
		this.items = {};
	} // 在双端队列的前端添加新元素。
	addFront(e: T) {
		this.items[--this.firstIndex] = e;
	}
	// 在双端队列的后端添加新元素。
	addBack(e: T) {
		this.items[this.lastIndex] = e;
		this.lastIndex++;
	}
	// 在双端队列的前端移除新元素。
	removeFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.firstIndex];
		delete this.items[this.firstIndex];
		this.firstIndex++;
		return result;
	}
	// 在双端队列的后端移除新元素。
	removeBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.lastIndex--;
		const result = this.items[this.lastIndex];
		delete this.items[this.lastIndex];
		return result;
	}
	// 返回双端队列前端的第一个元素。
	peekFront() {
		return this.items[this.firstIndex];
	}
	// 返回双端队列后端的第一个元素。
	peekBack() {
		return this.items[this.lastIndex - 1];
	}
	// 判断队列是否为空
	isEmpty() {
		return !this.size();
	}
	// 返回队列包含元素的个数
	size() {
		return this.lastIndex - this.firstIndex;
	}
	// 清空队列
	clear() {
		this.firstIndex = 0;
		this.lastIndex = 0;
		this.items = {};
	}
	// 将队列转换成字符串格式
	toString() {
		if (this.isEmpty()) {
			return undefined;
		}
		let result = '';
		for (let i = this.firstIndex; i < this.lastIndex; i++) result += `${this.items[i]},`;
		return result.slice(0, -1);
	}
}

export { DQueue };

// const dQueue = new DQueue<string>();
// dQueue.addFront('BBB');
// dQueue.addFront('AAA');
// dQueue.addBack('CCC');
// dQueue.addBack('DDD');
// console.log('🚀 ~ dQueue.isEmpty():', dQueue.isEmpty()); // false
// console.log('🚀 ~ dQueue.size():', dQueue.size()); // 4
// console.log('🚀 ~ dQueue.toString():', dQueue.toString()); // AAA,BBB,CCC,DDD
// console.log('🚀 ~ dQueue.peekBack():', dQueue.peekBack()); // DDD
// console.log('🚀 ~ dQueue.peekFront:', dQueue.peekFront()); // AAA
// dQueue.removeBack();
// console.log('🚀 ~ dQueue.removeBack():', dQueue.toString()); // AAA,BBB,CCC
// dQueue.removeFront();
// console.log('🚀 ~ dQueue.removeFront():', dQueue.toString()); // BBB,CCC
// dQueue.clear();
// console.log('🚀 ~ dQueue.isEmpty():', dQueue.isEmpty()); // true
