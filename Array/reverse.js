/**
 * reverse 方法可以直接反转数组
 */

const arr1 = [1, 2, 3, 4, 5]
console.log(arr1.reverse(), arr1)

/**
 * 手撕 reverse
 */
function myReverse() {
  const context = this
  const length = context.length
  for (let i = 0; i < Math.floor(length / 2); i++) {
    let temp = context[i]
    context[i] = context[length - 1 - i]
    context[length - 1 - i] = temp
  }
  return context
}
Array.prototype.myReverse = myReverse
const arr2 = [1, 2, 3, 4, 5]
console.log(arr2.myReverse(), arr2)

