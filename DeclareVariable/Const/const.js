/**
 * const 关键字
 * 1. const 关键字生命的变量不会绑定到全局对象
 * 2. const 声明的变量不会产生声明提升，会出现暂时性死区(TDZ)
 * 3. const 声明的变量具有块级作用域，全局作用域，函数作用域
 * 4. const 声明的变量不可重复声明
 * 5. const 声明的变量不可重新赋值
 */

/**
 * 1. const 关键字生命的变量不会绑定到全局对象
 */
const lv1 = 1
console.log(lv1) // 1
// console.log(window.lv1) // undefined

/**
 * 2. const 声明的变量不会产生声明提升，会出现暂时性死区
 */

// console.log(lv2) // Uncaught ReferenceError: lv2 is not defined
const lv2 = 'lv2'

/**
 * 3. const 声明的变量具有块级作用域，全局作用域，函数作用域
 */

const lv3 = 'lv3'

function foo1() {
  const lv4 = 'lv4'
  console.log(lv3, lv4)
}

{
  const lv4 = 'lv4'
  console.log('inner block', lv4)
}
// console.log('outer block', lv4)//Uncaught ReferenceError ReferenceError: lv4 is not defined

/**
 * 4. const 声明的变量不可重复声明
 */
const lv5 = 'lv5'
// var lv5 = 'lv5-var' //SyntaxError: Identifier 'lv5' has already been declared
// const lv5 = 'lv5-const' //SyntaxError: Identifier 'lv5' has already been declared
// let lv5 = 'lv5-let' //SyntaxError: Identifier 'lv5' has already been declared

/**
 * 5. const 声明的变量不可重新赋值
 */

const lv6 = 'lv6'
// lv6 = 'lv6-1' //Uncaught TypeError TypeError: Assignment to constant variable.
// 但是引用类型只要不改变引用地址可赋值
const lv7 = {}
lv7.a = 'lv7.a'
console.log(lv7)
