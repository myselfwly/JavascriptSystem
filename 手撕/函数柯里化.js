/**
 * 函数柯里化
 * 函数柯里化是将函数参数并非一次性传入
 * 首先需要知道函数参数的长度
 * 那么函数不能存在可选项
 */
/**
 * 求三个数的和
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns 三数之和
 */
function sum3(a, b, c) {
  return a + b + c
}

console.log(sum3(2, 3, 4))

/**
 * 柯里化
 */

/**
 * 函数转柯里化
 * @param {Function} fn 需要柯里化的函数
 * @returns {*|Function}
 */
function curry(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn must be a Function')
  }
  const allCount = fn.length
  return function backFn() {
    const self = this
    const params = [...arguments]

    if (params.length >= allCount) {
      return fn.apply(self, params)
    } else {
      return function () {
        const args = [...arguments]
        return backFn.apply(self, args.concat(params))
      }
    }
  }
}

const currySum3 = curry(sum3)

console.log(currySum3(2)(3)(4))
console.log(currySum3(2, 3)(4))
console.log(currySum3(2, 3, 4))
console.log(currySum3()()()(2, 3)(4))

