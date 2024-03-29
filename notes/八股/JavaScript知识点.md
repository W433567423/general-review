# JavaScript知识点

## 闭包

### 作用域

变量的可用范围（scope）

JS作用域有两种：全局作用域、函数作用域

> 只有函数{}才是作用域(注意对象的{}不能形成作用域)

局部变量只有两种：函数内var定义、形参

全局作用域是一个名为window的对象，全局变量和全局函数均是该对象的成员

> 开发环境禁用全局变量（有雷，易被污染）

函数作用域即用即创建，用完即销毁，又名AO(Actived Object)

```js
// 作用域
var a = 10;
//function相当于 new Function
//此时并不进行调用
function f() {
	var a = 100;
	a++;
	console.log(a);
	// 函数执行完毕，销毁AO
}
f(); // 函数调用，创建AO
console.log(a); // 打印全局变量
```

### 作用域链

定义函数时确定作用域链

> 给未声明的变量赋值，会自动创建全局变量（严格模式报错）

### 函数执行过程

![image-20231118121155720](https://tutu-1313352375.cos.ap-nanjing.myqcloud.com/my/activationObject.png)

> 作用域的本质是一个对象，作用域链的本质是一个对象数组

### 闭包

即**可以重用变量又能不被污染**的编程方法

食用方法：

1. 用外层函数包裹
2. 在外层函数内部返回内层函数对象
3. 调用外层函数

闭包形成：

外层函数调用后，外层函数的作用域对象被内层函数引用，无法释放，形成闭包对象

闭包缺点：

内存泄漏（但是不要因噎废食，即使释放闭包就行）

## 面向对象

三大特性：封装、继承、多态、（抽象）

### 封装的方法

- new Object()
- 通过{}的形式封装属性/方法，用.访问
- 用.强行添加属性/方法（js数据底层是关联数组）
- 工厂函数
- 用new调用构造函数（用于创建相同结构的对象）
- 原型对象方式
- ES6中Class关键字
- 闭包

> new关键字进行构造时进行四件事
>
> 1. 创建一个新对象
> 2. 新对象继承构造函数的原型对象
> 3. 调用构造函数（进行this指向，并添加属性/方法）
> 4. 返回新对象地址

### 继承

实现继承的7种方式

- 原型链方式继承
- 构造函数继承
- 实例继承
- 拷贝继承
- 组合继承
- 寄生组合继承
- ES6中extends

### call、bind、aplly

- call() 立即调用，临时改变this，并且可以传参（实参）
- bind() **永久**绑定this，并且可以传参（实参）
- apply() 立即调用，临时改变this，并且可以传参（数组被拆散）

### 深克隆

自定义递归克隆

```ts
const deepClone = (target: any) => {
	let newObj: any;
	if (typeof target === 'object') {
		if (Array.isArray(target)) {
			newObj = [];
			for (let i in target) {
				newObj.push(deepClone(target[i]));
			}
		} else if (target === null) {
			newObj = null;
		} else if (target.constructor === RegExp) {
			newObj = target;
		} else {
			newObj = {};
			for (let i in target) {
				newObj[i] = deepClone(target[i]);
			}
		}
	} else {
		newObj = target;
	}
	return newObj;
};
```

## ES6

### 模板字符串

${}里可以放：

- 变量、算数计算、三目、对象属性、创建对象、调用函数、访问数组元素
- 有返回值的合法js表达式

不可以放：

- 没有返回值的js表达式
- 分支/判断、循环等程序结构

### let

- 没有声明提前
- 有"块级作用域"
- 相同作用域禁止重复声明(暂时性死区)

> 底层为匿名函数自调（从let之前包裹），形成了类似块级作用域，且在全局定义let变量，window对象中无该变量（存在匿名函数的AO中）

### let/var/const区别

| 区别                          | var | let | const |
| ----------------------------- | --- | --- | ----- |
| 是否产生“块级作用域”          | ×   | √   | √     |
| 是否会声明提前                | √   | ×   | ×     |
| 是否保存在window              | √   | ×   | ×     |
| 是否在同一作用域可重复声明    | √   | ×   | ×     |
| 是否必须设置初始值            | ×   | ×   | √     |
| 是否能修改原始类型值/引用地址 | √   | √   | ×     |
|                               |     |     |       |

### 箭头函数

- 箭头函数相对与普通函数只仅仅不绑定this（箭头函数底层相当于.bind()）
- 箭头函数没有arguments
- 没有原型(prototype),不能调用对象的方法
- 不能使用new构造

### 遍历数组

- 普通for循环
- forEach(无法遍历类数组)
- for of

|            | 普通for | forEach | for Of | for in |
| ---------- | ------- | ------- | ------ | ------ |
| 索引数组   | √       | √       | √      | ×      |
| 类数组对象 | √       | ×       | √      | ×      |
| 关联数组   | ×       | ×       | ×      | √      |
| 对象       | ×       | ×       | ×      | √      |

### 参数增强

- 参数默认值
- 剩余参数(rest) ...args

### 展开运算符

功能：

- 复制(浅拷贝)数组[...arr]
- 合并数组[...arr1,...arr2]
- 浅拷贝对象{...obj}
- 合并对象和属性{...obj1,...obj2}

### 解构

- 数组解构：const [,m,d]=[2023,11,9]
- 对象解构：const {name:newName}={name:tutu}

### Class&继承

### Promise

异步编程的方案

- 回调函数(ES5)
- Promise(ES6,消灭回调地狱)
  - 三大状态:pending->fulfilled/rejected
- Generators/yield(ES6)
- async/await(ES7，基于Promise/Generators,彻底消除嵌套)
- 发布订阅(其他)
- 时间监听(其他)
