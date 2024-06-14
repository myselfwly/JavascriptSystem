/**
 * find方法 查找第一个符合条件的元素
 * 参数2个
 * 参数一：回调函数 函数有三个参数 1. item 当前遍历元素 2. 当前遍历下标 3. 遍历的目标数组 符合条件返回true否则返回false
 * 参数二：回调函数的this
 * 返回值：返回第一个查找到的元素，没找到返回undefined
 */
const arr1 = [1, 2, 3, 4, 5]
console.log(
  arr1.find((item) => item > 10),
  arr1.find((item) => item > 3)
)

/**
 * 手撕 find方法
 */
console.log('+++++')

/**
 *
 * @param {Function} callback
 * @param {Object} [thisObj]
 * @returns
 */
function myFind(callback, thisObj) {
  const context = this

  for (let i = 0; i < context.length; i++) {
    if (callback?.apply(thisObj, [context[i], i, context])) return context[i]
  }
  return undefined
}
Array.prototype.myFind = myFind
const arr2 = [1, 2, 3, 4, 5]
console.log(
  arr2.myFind((item) => item > 10),
  arr2.myFind((item) => item > 3)
)

