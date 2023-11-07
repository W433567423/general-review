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
    function pay(money:number){
        total-=money
        console.log(`花了${money}钱,剩余${total}钱`)
    }
    pay(100)
    pay(50)
}
main()

// 使用全局变量会不安全（易被污染），使用局部变量无法保存状态，故使用闭包来解决
