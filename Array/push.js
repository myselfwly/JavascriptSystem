/**
 * 1. push
 * 改变原来的数组，会向原数组末尾添加元素
 * @returns 插入后的数组长度
 * @param {...number} params
 */

const arr1 = [1, 2, 3]
const p1 = arr1.push(4, 5, 6, { 7: 7 }, 'a')
console.log(arr1, p1)
const p2 = arr1.push(8)
console.log(arr1, p2)
/**
 * 不传值不会插入任何元素
 * 并且返回数组长度
 */
const p3 = arr1.push()
console.log(arr1, p3)
/**
 * 传undefined
 * 会在尾部插入元素并返回数组长度
 */
const p4 = arr1.push(undefined)
console.log(arr1, p4)
console.log('=========')

/**
 * 手写push
 */

function myPush() {
  const context = this
  const args = [...arguments]
  for (let index = 0; index < args.length; index++) {
    const element = args[index]
    context[context.length] = element
  }
  return context.length
}
Array.prototype.myPush = myPush

const arr2 = new Array(1, 2, 3)
const p12 = arr2.myPush(4, 5, 6, { 7: 7 }, 'a')
console.log(arr2, p12)
const p22 = arr2.myPush(8)
console.log(arr2, p22)
/**
 * 不传值不会插入任何元素
 * 并且返回数组长度
 */
const p32 = arr2.myPush()
console.log(arr2, p32)
/**
 * 传undefined
 * 会在尾部插入元素并返回数组长度
 */
const p42 = arr2.myPush(undefined)
console.log(arr2, p42)

