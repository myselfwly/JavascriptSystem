/**
 * indexOf 方法
 * 使用的是全等运算符，空槽并不会转化为undefined
 * 参数：
 *  1. searchElement 需要查找的值
 *  2.fromIndex 查找的开始下标，可选默认为0
 * 返回值 若找到元素立即返回元素下标，若找不到返回-1
 */
const arr1 = [1, 'aa', , 'a' - 'b']
console.log(
  'undefined',
  arr1.indexOf(undefined),
  '\n',
  '1',
  arr1.indexOf(1),
  '\n',
  'aa',
  arr1.indexOf('aa'),
  '\n',
  'NaN',
  arr1.indexOf(NaN),
  '\n'
)

/**
 * 手撕 indexOf
 * 这里处理不了空槽
 */

function myIndexOf(searchElement, fromIndex) {
  fromIndex = fromIndex || 0
  const context = this

  for (let i = fromIndex; i < context.length; i++) {
    if (searchElement === context[i]) return i
  }
  return -1
}
Array.prototype.myIndexOf = myIndexOf
const arr2 = [1, 'aa', , 'a' - 'b']
console.log(
  'undefined',
  arr2.myIndexOf(undefined),
  '\n',
  '1',
  arr2.myIndexOf(1),
  '\n',
  'aa',
  arr2.myIndexOf('aa'),
  '\n',
  'NaN',
  arr2.myIndexOf(NaN),
  '\n'
)

