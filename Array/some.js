/**
 * some 方法
 * 参数2个
 * 参数一：回调函数 函数有三个参数 1. item 当前遍历元素 2. 当前遍历下标 3. 遍历的目标数组 返回true/false
 * 参数二：回调函数的this
 * 返回值：true/false 若回调函数全部返回false则返回false，否则返回true
 */

const arr1 = [1, 2, 3, 4, 5]
const am1 = arr1.some(
  function (item, index, array) {
    console.log(item, index, array, this)
    return item > 2
  },
  { self: 'this' }
)

console.log(arr1, am1)

/**
 * 手撕some
 */
/**
 *
 * @param {Function} callback
 * @param {Object} [thisObj]
 * @returns {any}
 */
function mySome(callback, thisObj) {
  thisObj = thisObj || undefined
  const context = this
  const resArr = []
  for (let i = 0; i < context.length; i++) {
    if (callback.apply(thisObj, [context[i], i, context])) {
      return true
    }
  }
  return false
}
Array.prototype.mySome = mySome
const arr2 = [1, 2, 3, 4, 5]
const am2 = arr2.mySome(
  function (item, index, array) {
    console.log(item, index, array, this)
    return item > 2
  },
  { self: 'this' }
)
console.log(arr2, am2)

