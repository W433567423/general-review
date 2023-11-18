// 作用域
var a = 10
//function相当于 new Function
//此时并不进行调用
function f() {
    var a = 100
    a++
    console.log(a);
    // 函数执行完毕，销毁AO
}

f()  // 函数调用，创建AO
console.log(a); // 打印全局变量
// js无堆/栈的概念
var b = 100
// 解释：定义一个全局变量b（Number）理论上应该是栈，可实际上该变量在全局对象里（window.b）,而全局对象理论上在堆里，故自相矛盾。
// 结论：JS底层只有一种类型---关联数组
