/**
 * map 方法
 * 参数2个
 * 参数一：回调函数 函数有三个参数 1. item 当前遍历元素 2. 当前遍历下标 3. 遍历的目标数组 返回值处理后的元素
 * 参数二：回调函数的this
 * 返回值：返回一个新的数组，由回调函数的返回值组成
 */

const arr1 = [1, 2, 3, 4, 5]
const am1 = arr1.map(
  function (item, index, array) {
    return this.self + item + '_' + index
  },
  { self: 'this' }
)

console.log(arr1, am1)

/**
 * 手撕map
 */
/**
 *
 * @param {Function} callback
 * @param {Object} [thisObj]
 * @returns {any}
 */
function myMap(callback, thisObj) {
  thisObj = thisObj || undefined
  const context = this
  const resArr = []
  for (let i = 0; i < context.length; i++) {
    resArr[i] = callback.apply(thisObj, [context[i], i, context]) || undefined
  }
  return resArr
}
Array.prototype.myMap = myMap
const arr2 = [1, 2, 3, 4, 5]
const am2 = arr2.myMap(
  function (item, index, array) {
    return this.self + item + '_' + index
  },
  { self: 'this' }
)
console.log(arr2, am2)

