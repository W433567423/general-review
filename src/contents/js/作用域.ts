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
