/**
 * concat方法
 * 合并数组返回新的已合并的数组
 */

const arr1 = [1, 2, 3, 4]
const arr2 = [5, 6]
const arr3 = [7]

const arr4 = arr1.concat(arr2, arr3, arr3, arr2)
console.log(arr1, arr2, arr3, arr4)

/**
 * 手写 concat方法
 */
/**
 *
 * @param  {...any[]} args
 * @returns
 */
function myConcat(...args) {
  const res = []
  const context = this
  Array.prototype.push.apply(res, context)
  for (let i = 0; i < args.length; i++) {
    Array.prototype.push.apply(res, args[i])
  }
  return res
}

Array.prototype.myConcat = myConcat

const arrm1 = [1, 2, 3, 4]
const arrm2 = [5, 6]
const arrm3 = [7]

const arrm4 = arrm1.myConcat(arrm2, arrm3, arrm3, arrm2)
console.log(arrm1, arrm2, arrm3, arrm4)

