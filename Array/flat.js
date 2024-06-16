/**
 * flat 方法
 * 创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。
 * 参数：
 *  1. depth 深度 需要降维的层级，可选，默认为1
 */

const arr1 = [[1, 2, 3, [4, 5]], 6]

console.log(arr1.flat(2), arr1.flat(), arr1)

/**
 * 手撕 flat方法
 */

/**
 *
 * @param {number} [depth] 降维层级 默认值为1
 * @returns 降维后的数组
 */
function myFlat(depth) {
  depth = typeof depth === 'number' ? depth : 1
  const context = this
  let res = [].concat(context)
  const insertsArray = (context, index, inserts) => {
    const fun = Array.prototype.splice.bind(context, index, 0)
    fun.apply(context, inserts)
  }
  const lowerLevel = (array, callback) => {
    let count = 0
    for (let i = 0; i < array.length; ) {
      if (Array.isArray(array[i])) {
        count++
        const temp = array.splice(i, 1)[0]
        insertsArray(array, i, temp)
        i = i + temp.length
      } else {
        i++
      }
    }
    if (callback(count)) {
      lowerLevel(array, callback)
    }
  }
  lowerLevel(res, (count) => {
    if (count === 0) {
      depth = 0
    } else {
      depth--
    }
    return depth > 0
  })
  return res
}

Array.prototype.myFlat = myFlat
const arr2 = [[1, 2, 3, [4, 5]], 6]
console.log('======')
console.log(arr2.myFlat(2), arr2.myFlat(), arr2)

