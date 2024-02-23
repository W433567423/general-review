# 数据结构

## 数组

### 创建和初始化数组

- 构造函数

  ```javascript
  let arr = new Array(); // 创建一个空数组
  let arr1 = new Array(6); // 创建一个长度为6的数组
  let arr2 = new Array(1, 2, 3); // 创建一个数组，其元素为1， 2， 3
  console.log(arr); // []
  console.log(arr1); // [empty*6]
  console.log(arr2); // [1, 2, 3]
  ```

- 字面量

  ```javascript
  let arr = []; // 创建一个空数组
  let arr2 = [1, 2, 3]; // 创建一个数组，其元素为1， 2， 3
  console.log(arr); // []
  console.log(arr2); // [1, 2, 3]
  ```

### 对数组的操作

- 添加元素

  ```ts
  // 1.在数组首位添加
  Array.prototype.unshift;
  // 在数组的开头添加一个元素，需要我们依次把数组中的每一个元素往后移动一位，最后把待添加的元素放置到最前面。

  // 2.在数组末尾添加
  Array.prototype.push;
  ```

- 删除元素

  ```ts
  // 1.在数组首位删除
  Array.prototype.shift;
  // 如果要从数组开头删除元素，其逻辑和在数组开头添加元素相反，需要把每一个元素向前挪动一位

  // 2.在数组末尾删除
  Array.prototype.pop;
  ```

- 在任意位置添加和删除元素

  ```ts
  // 使用splice()方法可以让我们在数组中的任意位置删除或添加元素，其参数为：

  //第一个参数：表示想要删除或插入的元素的索引。
  // 第二个参数：表示删除元素的格式。
  // 第三个参数：表示添加到数组中的值。
  ```

### 数组方法列表

| 方法        | 描述                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| concat      | 连接2个或者更多数组，并返回结果                                                      |
| every       | 对数组中的每一个元素运行给定的函数，如果该函数对每一个元素都返回`true`，则返回`true` |
| filter      | 对数组中的每一个元素运行给定的函数，返回该函数会返回`true`的元素组成的数组           |
| forEach     | 对数组中的每一个元素运行给定的函数                                                   |
| join        | 将所有的数组元素以指定的字符链接成一个字符串                                         |
| indexOf     | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1                           |
| lastIndexOf | 从数组末尾开始搜索，并返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1     |
| map         | 对数组中的每一个元素运行给定的函数，返回每次函数调用的结果组成的数组                 |
| reverse     | 颠倒数组中元素的顺序                                                                 |
| slice       | 传入索引值，将数组里对应索引范围内的元素作为新数组返回                               |
| some        | 对数组中的每个元素运行给定的函数，如果任一元素返回`true`，则返回`true`               |
| sort        | 按照元素的`ASCII`值进行排序                                                          |
| reduce      | 返回数组中所以元素值的合计                                                           |
| toString    | 将数组作为字符串返回                                                                 |
| valueOf     | 和`toString`类似，将数组作为字符串返回                                               |
|             | **以下是ES6新增的方法**                                                              |
| @@iterator  | 返回一个包含数组键值对的迭代器对象，可以通过同步调用的方式得到数组元素的键值对       |
| copyWhthin  | 复制数组中的一系列元素到同一数组指定的起始位置                                       |
| entries     | 返回包含数组所有键值对的`@@iterator`                                                 |
| find        | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素                         |
| findIndex   | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素的索引                   |
| fill        | 用静态值填充数组                                                                     |
| from        | 将一个类数组转换为一个真正的数组                                                     |
| of          | 根据传入的参数创建一个新数组                                                         |
| values      | 返回包含数组中所以值的`@@iterator`                                                   |
|             | **以下是ES7新增的方法**                                                              |
| includes    | 如果数组中存在某个元素，则返回`true`，否则返回`false`                                |

## 栈

栈是一种遵从后进先出(`LIFO`)原则的有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。

### 实现栈(基于数组)

```ts
// 基于数组实现
class StackByArray<T = any> {
  private items: Array<T>;
  constructor() {
    this.items = [];
  }
  // 添加末尾元素
  push(element: T) {
    this.items.push(element);
  }
  // 删除末尾元素
  pop() {
    return this.items.pop();
  }
  // 获取末尾元素
  peek() {
    return this.items[this.size() - 1];
  }
  // 是否为空
  isEmpty() {
    return !this.size();
  }
  // 清空栈
  clear() {
    return (this.items = []);
  }
  // 获取栈元素数量
  size() {
    return this.items.length;
  }
}
```

### 实现栈(基于对象)

```ts
// 基于类实现
interface IStack<T> {
  [key: string]: T;
}
class StackByClass<T = any> {
  private count: number;
  private items: IStack<T>;
  constructor() {
    this.count = 0;
    this.items = {};
  }
  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return !this.count;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    return this.items[this.count - 1];
  }
  clear() {
    this.count = 0;
    this.items = {};
  }
  // 打印栈
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let result: string = String(this.items["0"]);
    for (let i = 1; i < this.count; i++) {
      result = `${result},${this.items[i]}`;
    }
    return result;
  }
}
```

### 栈的应用

#### 十进制二进制

```ts
// 十进制转二进制
const convertBinary = (decNumber: number) => {
  const stack = new Stack<number>(); // 存放进制的栈
  let number = decNumber;
  let rem: number;
  let binaryString = ""; // 转换后的二进制
  while (number > 0) {
    rem = Math.floor(number % 2); // 获取余数
    number = Math.floor(number / 2); // 获取商
    stack.push(rem); // 入栈
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop()!.toString();
  }
  return binaryString;
};
```

#### 十进制转任意进制

```ts
// 进制转化
const ConversionBase = (decNumber: number, base: number) => {
  if (base < 2 || base > 36) {
    return "";
  }
  const stack = new Stack<number>(); // 存放进制的栈
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 被除数|进制
  let number = decNumber;
  let rem: number; // 余数
  let baseString = ""; // 转换后的进制结果
  while (number > 0) {
    rem = Math.floor(number % base);
    number = Math.floor(number / base);
    stack.push(rem);
  }
  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()!];
  }
  return baseString;
};
```
