function ArrayList() {
	this.array = [];
	ArrayList.prototype.insert = function (item) {
		this.array.push(item);
	};
	ArrayList.prototype.toString = function () {
		return this.array.join(' ');
	};
	ArrayList.prototype.swap = function (m, n) {
		let temp = this.array[m];
		this.array[m] = this.array[n];
		this.array[n] = temp;
	};
	//冒泡排序
	ArrayList.prototype.bubbleSort = function () {
		console.log('【!】bubbleSort:');
		let time_old = new Date();
		for (let j = this.array.length - 1; j >= 0; j--)
			for (let i = 0; i < j; i++) if (this.array[i] > this.array[i + 1]) this.swap(i, i + 1);
		let time_new = new Date();
		console.log('Bubble用时:', time_new - time_old, '毫秒');
	};
	//选择排序
	ArrayList.prototype.selectionSort = function () {
		console.log('\n\n');
		console.log('*********************************************');
		console.log('【!】selectionSort:');
		console.log('---------------------------------------------');
		let time_old = new Date();
		for (let j = 0; j < this.array.length - 1; j++) {
			let min = j;
			for (let i = min + 1; i < this.array.length; i++) {
				if (this.array[min] > this.array[i]) min = i;
				this.swap(min, j);
			}
		}
		let time_new = new Date();
		console.log('selection用时:', time_new - time_old, '毫秒');
	};

	//插入排序

	//快速排序

	//希尔排序
}
let list1 = new ArrayList();
for (let x = 0; x < 9999; x++) list1.insert(Math.ceil(Math.random() * 9999));
list1.bubbleSort();
// console.log(list1.toString())

let list2 = new ArrayList();
for (let x = 0; x < 9999; x++) list2.insert(Math.ceil(Math.random() * 9999));
list2.selectionSort();
// console.log(list2.toString())
