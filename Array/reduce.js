/**
 * reduce 方法
 * 参数2个
 * 参数一：回调函数 函数有4个参数
 *    1. accumulator 首次执行（有初始值则是初始值，无初始值则是数组第一项，所以无初始值空数组使用会报错）
 *    2. currentValue 当前遍历元素
 *    3. currentIndex 当前遍历元素下标
 *    4. 遍历的目标数组
 *    返回值：返回的值 作为下次回调函数的accumulator
 * 参数二：初始值（可选值），若传值则作为首次遍历的初始值，首次遍历从下标0开始，若不传值，则初始值为数组的第一项元素，首次遍历从下标1开始
 * 返回值：返回最后一次回调函数的返回值
 */

const arr1 = [1, 2, 3, 4]
const am1 = arr1.reduce(
  function (accumulator, currentValue, currentIndex, array) {
    console.log(accumulator, currentValue, currentIndex, array)
    return accumulator + currentValue
  }
)

console.log(arr1, am1)

/**
 * 手撕 reduce
 */
/**
 *
 * @param {Function} callback
 * @param {*} [initValue]
 * @returns {any}
 */
function myReduce(callback, initValue) {
  const context = this
  let startIndex = 1
  let accumulator = context[0]
  if (arguments.length > 1) {
    startIndex = 0
    accumulator = arguments[1]
  } else {
    if (context.length === 0) {
      throw new Error('empty Array must set initValue')
    }
  }

  for (let i = startIndex; i < context.length; i++) {
    accumulator = callback(accumulator, context[i], i, context)
  }
  return accumulator
}
Array.prototype.myReduce = myReduce
const arr2 = [1, 2, 3, 4]
const am2 = arr2.myReduce(
  function (accumulator, currentValue, currentIndex, array) {
    console.log(accumulator, currentValue, currentIndex, array)
    return accumulator + currentValue
  }
)
console.log(arr2, am2)

