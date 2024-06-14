/**
 * unshift
 * 与Push方法类似只不过在数组前面添加元素
 */
const arr1 = [1, 2, 3, 4]
const s1 = arr1.unshift(-2, -1, 0)
console.log(arr1, s1)

/**
 * 手撕unshift
 */
function myUnshift() {
  const context = this
  const args = [...arguments]
  const preLen = context.length
  const argLen = args.length
  context.length = preLen + argLen
  for (let i = preLen - 1; i >= 0; i--) {
    context[i + argLen] = context[i]
    context[i] = undefined
  }
  for (let a = 0; a < argLen; a++) {
    context[a] = args[a]
  }
  return context.length
}
Array.prototype.myUnshift = myUnshift

const arr2 = [1, 2, 3, 4]
const s2 = arr2.myUnshift(-2, -1, 0)
console.log(arr2, s2)

