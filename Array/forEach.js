/**
 * forEach 方法
 * 参数有2个 第一个是一个函数，第二个是一个对象（调用第一个函数的this，箭头函数没有this），无返回值
 *
 * 这个函数有三个参数
 * 无返回值
 * @param {*} item 当前遍历的的元素
 * @param {number} index 当前遍历的下标
 * @param {*[]} array 当前遍历的数组
 */

const arr1 = [1, 2, 3, 4]
const af1 = arr1.forEach(
  function (item, index, array) {
    console.log(item, index, array, this)
  },
  { name: 'nnn' }
)
console.log(arr1, af1)
/**
 * 手撕forEach
 * 处理不了空槽
 */
/**
 *
 * @param {Function} callback
 * @param {Object} [thisObj]
 */
function myForEach(callback, thisObj) {
  thisObj = thisObj || undefined
  const context = this
  for (let i = 0; i < context.length; i++) {
    callback.apply(thisObj, [context[i], i, context])
  }
}
Array.prototype.myForEach = myForEach
const arr2 = [1, 2, 3, 4]

const af2 = arr2.myForEach(
  function (item, index, array) {
    console.log(item, index, array, this)
  },
  { name: 'nnn' }
)

