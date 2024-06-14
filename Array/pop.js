/**
 * pop方法
 * 该方法五参数，会删除该数组最后一个元素并返回 删除元素
 */
const arr1 = [1, 2, 3, 4]

const pp1 = arr1.pop()
console.log(pp1)

/**
 * 手撕pop
 */

function myPop() {
  const context = this
  const delItem = context[context.length - 1]
  context.length = context.length - 1
  return delItem
}

Array.prototype.myPop = myPop

const arr2 = [1, 2, 3, 4]

const pp2 = arr2.myPop()
console.log(arr2, pp2)

