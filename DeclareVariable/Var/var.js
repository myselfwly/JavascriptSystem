/**
 * var 关键字
 * 1. var 在全局定义的对象会制定绑定到全局对象（window)
 * 2. var 定义的变量不存在块级作用域，只有全局作用域和函数作用域
 * 3. var 声明的变量可以重复声明
 * 4. var 声明的变量存在变量“声明”（赋值不会被提升）提升
 */

/**
 * 1. var 在全局定义的对象会制定绑定到全局对象（window)
 */

var var1 = 1
console.log(typeof window !== 'undefined' && window.var1)

/**
 * 2. var 定义的变量不存在块级作用域，只有全局作用域和函数作用域
 */
var v2 = 'v2'
if (true) {
  var v3 = 'v3'
  // 不存在块级作用域
  v2 = 'v2-2'
  console.log(v2)
}
// 不存在块级作用域
console.log(v3)
function foo() {
  //存在函数作用域
  var v4 = 'v4'
}
foo()
// 函数租用域的东西不可访问
// console.log(v4) // 报错

/**
 * 3. var 声明的变量可以重复声明
 */

var v5 = 'v5'
var v5 = 'v5-1'
var v5 = 5
console.log(v5)

/**
 * 4. var 声明的变量存在变量“声明”（赋值不会被提升）提升
 */
//
console.log(v6) // 不报错输出 undefined
var v6 = 'v6'

/*
伪代码
等同于
// 所有的 var的声明的会被提升
var v6
console.log(v6)
v6 = 'v6'
*/

