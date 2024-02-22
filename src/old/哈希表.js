//链地址法哈希表
function HashTab() {
	//属性
	this.storage = [];
	this.count = 0;
	this.limit = 7;
	//方法
	//哈希函数
	HashTab.prototype.hashFunc = function (str, size) {
		let hashCode = 0;
		for (let i = 0; i < str.length; i++) {
			hashCode = 37 * hashCode + str.charCodeAt(i);
		}
		let index = hashCode % size;
		return index;
	};

	//判断质数
	HashTab.prototype.isPrime = function (num) {
		let temp = parseInt(Math.sqrt(num));
		for (let i = 2; i <= temp; i++) if (num % i === 0) return false;
		return true;
	};
	HashTab.prototype.getPrime = function (num) {
		while (!this.isPrime(num)) num++;
		return num;
	};
	//插入&修改
	HashTab.prototype.put = function (key, value) {
		let index = this.hashFunc(key, this.limit);
		//取出当前操作的数组（链表）
		let bucket = this.storage[index];
		//插入数组
		if (bucket == null) {
			bucket = [];
			this.storage[index] = bucket;
		}
		//先判断修改
		let flow = true;
		bucket.forEach((element) => {
			if (element[0] === key) {
				element[1] = value;
				flow = false;
			}
			// console.log('[!]change...')
		});
		//新增
		if (flow) {
			// console.log('[!]add...')
			bucket.push([key, value]);
			this.count += 1;
			//扩容
			if (this.count / this.limit > 0.75) {
				this.resize(this.getPrime(this.limit * 2));
			}
		}
		return;
	};

	//获取哈希表数据
	HashTab.prototype.get = function (key) {
		let index = this.hashFunc(key, this.limit);
		let bucket = this.storage[index];
		let flow = true;
		let result = '';
		if (bucket == null) return null;
		bucket.some((element) => {
			if (element[0] === key) {
				// console.log('[!]get...')
				result = element[1];
				flow = false;
			}
		});
		if (!flow) return result;
		return null;
	};

	//删除
	HashTab.prototype.remove = function (key) {
		let index = this.hashFunc(key, this.limit);
		let bucket = this.storage[index];
		if (bucket == null) return;
		bucket.forEach((element, index) => {
			if (element[0] === key) {
				bucket.splice(index, 1);
				this.count--;
				// 缩小容量
				if (this.limit > 7 && this.count / this.limit < 0.25) {
					this.resize(this.getPrime(Math.floor(this.limit / 2)));
				}
			}
		});
		return;
	};

	//遍历
	HashTab.prototype.print = function () {
		// console.log('[!]print...')
		console.log(this.storage);
	};

	//isEmpty
	HashTab.prototype.isEmpty = function () {
		return this.count === 0;
	};

	//Size
	HashTab.prototype.size = function () {
		return this.count;
	};

	//易容
	HashTab.prototype.resize = function (newLimit) {
		let oldStorage = this.storage;
		this.storage = [];
		this.count = 0;
		this.limit = newLimit;
		oldStorage.forEach((element) => {
			element.forEach((e) => {
				this.put(e[0], e[1]);
			});
		});
	};
}

//测试
let A = new HashTab();
A.put('cat', 123);
A.put('pig', 7893);
A.put('red', 34563);
A.put('green', 1453);
A.put('asdfs', 77);
A.put('yes', 79893);
A.put('back', 3478563);
A.put('gun', 1446753);

// console.log(A.get('red'))
// A.put('red', 888888)
// A.remove('pig')
// A.print()
// A.put('abc', 123)
// console.log(A.size())
// console.log(A.isEmpty())
A.print();
console.log(A.limit);
// console.log(A.limit, A.count)
