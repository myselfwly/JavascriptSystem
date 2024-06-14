/**
 * slice 方法用于截取数组
 * 参数：
 * 1. start 可选 默认值 0 ，截取开始位置 ,若为负数 为 array.length + start
 * 2. end 可选 默认值 array.length, 截取结束位置，若是负数 为 array.length + end
 * 返回：
 * 截取的数组
 */
const arr1 = [1, 2, 3, 4, 5]

console.log(
  arr1.slice(),
  arr1.slice(2),
  arr1.slice(2, 4),
  arr1.slice(-2),
  arr1.slice(2, -1)
)

/**
 *
 * @param {number} [start]
 * @param {number} [end]
 * @returns {...any}
 */
function mySlice(start, end) {
  const context = this
  start = start ?? 0
  end = end ?? context.length
  const res = []
  if (start < 0) start = context.length + start
  if (end < 0) end = context.length + end
  if (start > end) return res
  for (let i = start; i < end && i < context.length; i++) {
    res.push(context[i])
  }
  return res
}

Array.prototype.mySlice = mySlice
const arr2 = [1, 2, 3, 4, 5]

console.log(
  arr2.mySlice(),
  arr2.mySlice(2),
  arr2.mySlice(2, 4),
  arr2.mySlice(-2),
  arr2.mySlice(2, -1)
)

