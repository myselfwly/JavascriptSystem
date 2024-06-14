/**
 * shift 方法
 * 无参数，在数组最前面删除一个一个元素
 * 返回删除的元素
 */

const arr1 = [1, 2, 3, 4]
let as = arr1.shift()
console.log(arr1, as)

/**
 * 手撕shift
 */

function myShift() {
  const context = this
  const delItem = context[0]
  context[0] = undefined
  for (let i = 1; i < context.length - 1; i++) {
    context[i - 1] = context[i]
  }
  context.length = context.length - 1
  return delItem
}
Array.prototype.myShift = myShift

const arr2 = [1, 2, 3, 4]
const as2 = arr2.myShift()
console.log(arr2, as2)

