/**
 * DONE
 * @description: 事件:  给小孩存零花钱
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023-11-07 13:18
 */
function  main(){
    var total= 1000
    return function (money:number){
        total-=money
        console.log(`花了${money}钱,剩余${total}钱`)
    }
}
var pay =main()
console.dir(pay)  // 输出存储状态
pay(200)
pay(50)

pay=null // 释放闭包
// 使用全局变量会不安全（易被污染），使用局部变量无法保存状态，故使用闭包来解决


/**
 * DONE
 * @description: 事件: 闭包笔试题1
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023-11-07 13:56
 */

function fun(){
    var i=999
    // @ts-ignore 此处为赋值，会默认创建全局变量Add
    Add=function (){
        i++
    }
    return function (){
        console.log(i)
    }
}
var get=fun()
get()
// @ts-ignore
Add() //该处i是闭包变量
get()
