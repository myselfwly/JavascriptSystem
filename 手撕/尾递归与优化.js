/**
 * 尾递归
 * 尾递归就是函数在执行时的最后一步调用自身
 */
/**
 * 尾递归求阶乘
 * @param {number} num
 * @returns {number} num的阶乘
 */
function factorial(num) {
  if (num <= 0) return 1
  return num * factorial(num - 1)
}

console.log(factorial(4))
/**
 * 问题分析：
 * 由于 factorial 依赖 num
 * 那么外层的 factorial 就不会出栈，层级过深会出现爆栈的情况
 */
/**
 * 解决问题：
 * 那么可以让 factorial 不依赖任何变量
 * 使得上层函数执行完就出栈
 */

function newFactorial(num, preRes = 1) {
  if (num <= 0) return preRes
  return newFactorial(num - 1, preRes * num)
}
console.log(newFactorial(4))

