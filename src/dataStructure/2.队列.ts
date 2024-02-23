// 队列
interface IQueue<T> {
	[key: string]: T;
}
class Queue<T = any> {
	private lastIndex: number;
	private firstIndex: number;
	private items: IQueue<T>;
	constructor() {
		this.lastIndex = 0;
		this.firstIndex = 0;
		this.items = {};
	}
	//向队列的尾部添加元素
	enqueue(e: T) {
		this.items[this.lastIndex] = e;
		this.lastIndex++;
	}
	// 在队列的开头移除第一个元素，并返回被移除的元素
	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}
		const result = this.items[this.firstIndex];
		delete this.items[this.firstIndex];
		this.firstIndex++;
		return result;
	}
	// 返回队列的第一个元素
	peek() {
		return this.items[this.firstIndex];
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

export { Queue };

// const queue = new Queue<string>();
// queue.enqueue('AAA');
// queue.enqueue('BBB');
// queue.enqueue('CCC');
// queue.enqueue('DDD');
// console.log(queue.isEmpty()); // false
// console.log(queue.size()); // 4
// console.log(queue.toString()); // AAA,BBB,CCC,DDD
// console.log(queue.peek()); // AAA
// queue.dequeue();
// queue.clear();
// console.log(queue.isEmpty()); // true
