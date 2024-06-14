/**
 * join方法
 * 将一个数组连接成字符串
 * 参数：
 *  separator 连接符(可选值，默认,字符串)
 */

const arr1 = [
  1,
  2,
  3,
  4,
  5,
  false,
  true,
  {
    [Symbol.toPrimitive]() {
      return 'obj'
    }
  }
]

console.log(arr1.join('_'))

/**
 * 手撕 join方法
 */

/**
 *
 * @param {string} [separator]
 * @returns {string}
 */
function myJoin(separator) {
  separator = separator || ','
  const context = this
  let res = ''
  for (let i = 0; i < context.length; i++) {
    res = res + context[i] + (i === context.length - 1 ? '' : separator)
  }
  return res
}

Array.prototype.myJoin = myJoin

const arr2 = [
  1,
  2,
  3,
  4,
  5,
  false,
  true,
  {
    [Symbol.toPrimitive]() {
      return 'obj'
    }
  }
]

console.log(arr2.myJoin('_'))

