/**
 * let 关键字
 * 1. let 关键字生命的变量不会绑定到全局对象
 * 2. let 声明的变量不会产生声明提升，会出现暂时性死区(TDZ)
 * 3. let 声明的变量具有块级作用域，全局作用域，函数作用域
 * 4. let 声明的变量不可重复声明
 */

/**
 * 1. let 关键字生命的变量不会绑定到全局对象
 */
let lv1 = 1
console.log(lv1) // 1
// console.log(window.lv1) // undefined

/**
 * 2. let 声明的变量不会产生声明提升，会出现暂时性死区
 */

// console.log(lv2) // Uncaught ReferenceError: lv2 is not defined
let lv2 = 'lv2'

/**
 * 3. let 声明的变量具有块级作用域，全局作用域，函数作用域
 */

let lv3 = 'lv3'

function foo1() {
  let lv4 = 'lv4'
  console.log(lv3, lv4)
}

{
  let lv4 = 'lv4'
  console.log('inner block', lv4)
}
// console.log('outer block', lv4)//Uncaught ReferenceError ReferenceError: lv4 is not defined

/**
 * 4. let 声明的变量不可重复声明
 */
let lv5 = 'lv5'
// var lv5 = 'lv5-var' //SyntaxError: Identifier 'lv5' has already been declared
// let lv5 = 'lv5-let' //SyntaxError: Identifier 'lv5' has already been declared
// const lv5 = 'lv5-const' //SyntaxError: Identifier 'lv5' has already been declared

