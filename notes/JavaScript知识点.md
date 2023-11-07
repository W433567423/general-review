# JavaScript知识点

## 作用域

变量的可用范围（scope）

JS作用域有两种：全局作用域、函数作用域

> 只有函数{}才是作用域(注意对象的{}不能形成作用域)

局部变量只有两种：函数内var定义、形参

全局作用域是一个名为window的对象，全局变量和全局函数均是该对象的成员

> 开发环境禁用全局变量（有雷，易被污染）

函数作用域即用即创建，用完即销毁，又名AO(Actived Object)

![image-20231107125416953](C:\Users\t4335\AppData\Roaming\Typora\typora-user-images\image-20231107125416953.png)

## 作用域链

定义函数时确定作用域链

> 给未声明的变量赋值，会自动创建全局变量（严格模式报错）

## 函数执行过程

![image-20231107130037399](C:\Users\t4335\AppData\Roaming\Typora\typora-user-images\image-20231107130037399.png)

### 闭包

> 作用域的本质是一个对象，作用域链的本质是一个对象数组
