module.exports = function Queue() {
	let items = [];
	// 向队列的尾部添加新元素
	this.enqueue = function (element) {
		items.push(element);
	};
	// 遵循先进先出原则，从队列的头部移除元素
	this.dequeue = function () {
		return items.shift();
	};
	// 返回队列最前面的项
	this.front = function () {
		return items[0];
	};
	// 返回队列是否为空
	this.isEmpty = function () {
		return items.length === 0;
	};
	// 返回队列的长度
	this.size = function () {
		return items.length;
	};
	// 打印队列，方便观察
	this.print = function () {
		console.log(items.toString());
	};
};
