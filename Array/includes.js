/**
 * includes 方法会判断数组是否包含该元素，包含返回true，否则返回true
 * 和indexOf不同的是 includes 使用的是 SameValueZero（零值相等） 进行比较
 * indexOf 则是使用 === 比较 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness}
 * 参数：
 *  1. searchElement 需要查找的值
 *  2.fromIndex 查找的开始下标，可选默认为0
 */

const arr1 = [1, 'aa', , 'a' - 'b']
console.log(
  'undefined',
  arr1.includes(undefined),
  '\n',
  '1',
  arr1.includes(1),
  '\n',
  'aa',
  arr1.includes('aa'),
  '\n',
  'NaN',
  arr1.includes(NaN),
  '\n'
)

/**
 * 手撕 includes
 */

/**
 *
 * @param {*} searchElement
 * @param {number} [fromIndex]
 * @returns {boolean}
 */
function myIncludes(searchElement, fromIndex) {
  fromIndex = fromIndex || 0
  const context = this
  function sameValueZero(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      if (a !== b && a !== a && b !== b) {
        return true
      }
      return a === b
    }
    return a === b
  }
  for (let i = fromIndex; i < context.length; i++) {
    if (sameValueZero(searchElement, context[i])) return true
  }
  return false
}

Array.prototype.myIncludes = myIncludes

const arr2 = [1, 'aa', , 'a' - 'b']
console.log('====')
console.log(
  'undefined',
  arr2.myIncludes(undefined),
  '\n',
  '1',
  arr2.myIncludes(1),
  '\n',
  'aa',
  arr2.myIncludes('aa'),
  '\n',
  'NaN',
  arr2.myIncludes(NaN),
  '\n'
)

