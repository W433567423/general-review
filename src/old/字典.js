module.exports = function Dictionary() {
	this.items = {};
	Dictionary.prototype.set = function (key, value) {
		//向字典中添加新的元素
		this.items[key] = value;
	};
	Dictionary.prototype.delete = function (key) {
		//删除字典中某个指定元素
		if (this.has(key)) {
			delete this.items[key];
			return true;
		}
		return false;
	};
	Dictionary.prototype.has = function (key) {
		//如果某个键值存在于这个字典中，则返回true，否则返回false
		return this.items.hasOwnProperty(key);
	};
	Dictionary.prototype.get = function (key) {
		//通过键值查找特定的数值并返回。
		return this.has(key) ? this.items[key] : undefined;
	};
	Dictionary.prototype.clear = function () {
		//将这个字典中的所有元素全部删除。
		this.items = {};
	};
	Dictionary.prototype.size = function () {
		//返回字典所包含元素的数量。
		return Object.keys(this.items).length;
	};
	Dictionary.prototype.keys = function () {
		//将字典所包含的所有键名以数组形式返回。
		return Object.keys(this.items);
	};
	Dictionary.prototype.values = function () {
		//将字典所包含的所有数值以数组形式返回。
		var values = [];
		for (var k in this.items) {
			if (this.has(k)) {
				values.push(this.items[k]);
			}
		}
		return values;
	};
	Dictionary.prototype.each = function (fn) {
		//遍历每个元素并且执行方法
		for (var k in this.items) {
			if (this.has(k)) {
				fn(k, this.items[k]);
			}
		}
	};
	Dictionary.prototype.getitems = function () {
		//返回字典
		return this.items;
	};
};
