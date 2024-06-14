/**
 * sort 方法 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
 * 参数1个（可选）
 * 如果省略该函数，数组元素会被转换为字符串，然后根据每个字符的 Unicode 码位值进行排序。
 * 传第一个函数
 *  参数2个
 *    参数a第一个用于比较的元素
 *    参数b第二个用于比较的元素
 *  返回值
 *    如果 a 小于 b，返回值为负数，如果 a 大于 b，返回值为正数，如果两个元素相等，返回值为 0。NaN 被视为 0。
 * 返回值
 *  经过排序的原始数组的引用。注意数组是就地排序的，不会进行复制。
 */

const arr1 = [2, 1, 4, 2, 5, 7, 3, 8, 4, -1, 2]

arr1.sort((a, b) => {
  // console.log(a, b)
  return a - b
})

/* const arr2 = ['f', 'h', 'a', 'v', 'g', 'b']
console.log(
  arr2,
  arr2.sort(),
  arr2.sort((a, b) => -a + b),
  arr2.sort((a, b) => a.charCodeAt() - b.charCodeAt())
)

const arr3 = [[1], [2], [4], [3], [6], [5]]
console.log(
  arr3,
  arr3.sort(),
  arr3.sort((a, b) => -a + b),
  arr3.sort((a, b) => a - b)
) */

/**
 * 手撕sort
 */
/**
 *
 * @param {Function} [callback]
 * @returns
 */
function mySort(callback) {
  const context = this
  const len = context.length
  callback =
    callback ||
    ((a, b) => {
      return a.toString().charCodeAt() - b.toString().charCodeAt()
    })

  for (let i = 0; ; ) {
    if (i >= context.length) break
    if (context[i] === undefined) {
      context.splice(i, 1)
    } else {
      i++
    }
  }
  /**冒泡排序
   * {@link https://www.runoob.com/w3cnote/bubble-sort.html}只看原理不要复制粘贴代码
   * 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
   * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
   * 针对所有的元素重复以上的步骤，除了最后一个。
   * 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
   */
  for (let m = 0; m < context.length; m++) {
    for (let n = 1; n < context.length - m; n++) {
      const sign = callback(context[n], context[n - 1])
      if (Number.isNaN(sign) || sign === 0 || sign > 0) {
      } else if (sign < 0) {
        const temp = context[n]
        context[n] = context[n - 1]
        context[n - 1] = temp
      }
    }
  }

  /**
   * 选择排序
   * 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
   * 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
   * 重复第二步，直到所有元素均排序完毕。
   */
  /* for (let m = 0; m < context.length; m++) {
    let min = { value: context[m], index: m }
    for (let n = m + 1; n < context.length; n++) {
      const current = context[n]
      const sign = callback(current, min.value)
      if (Number.isNaN(sign) || sign === 0 || sign > 0) {
      } else if (sign < 0) {
        min = { value: current, index: n }
      }
    }
    if (min.index !== m) {
      context[min.index] = context[m]
      context[m] = min.value
    }
  } */

  /**
   * 插入排序
   */
  /* for (let m = 1; m < context.length; m++) {
    for (n = m - 1; n >= 0; n--) {
      const sign = callback(context[m], context[n])
      if (Number.isNaN(sign) || sign === 0 || sign > 0) {
        const temp = context.splice(m, 1)[0]
        context.splice(n + 1, 0, temp)
        break
      } else {
        if (n === 0) {
          const temp = context.splice(m, 1)[0]
          context.splice(n, 0, temp)
        }
      }
    }
  } */
  /**
   *
   */
  context.length = len
  return context
}

Array.prototype.mySort = mySort

const arr3 = [2, 3, 1, 4, 9, 0]
console.log(arr3.mySort())

