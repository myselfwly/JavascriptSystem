/**
 * splice 方法
 */
/**
 * 参数
 * 1. start 开始下标
 * 2. deleteCount 可选值，要删除的个数 若不传或者超出剩余长度，删除后面所有元素
 * 3. item1 ... itemN 可选，在当前下标要插入的元素
 * 返回：
 * 删除的元素数组
 */

const arr1 = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems1 = arr1.splice(2)
console.log(arr1, deleteItems1)
const arr2 = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems2 = arr2.splice(2, 2)
console.log(arr2, deleteItems2)

const arr3 = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems3 = arr3.splice(2, 2, 'a', 'b', 'c')
console.log(arr3, deleteItems3)

/**
 * 手撕 splice
 */

/**
 *
 * @param {number} start
 * @param {number} [deleteCount]
 * @param  {...any} [inserts]
 * @returns
 */
function mySplice(start, deleteCount, ...inserts) {
  const context = this
  const res = []
  inserts = inserts ?? []
  deleteCount = deleteCount ?? context.length - start
  if (deleteCount + start > context.length) deleteCount = context.length - start
  function delItem(array, index) {
    for (let i = index; i < array.length - 1; i++) {
      let temp = array[i]
      array[i] = array[i + 1]
      array[i + 1] = temp
    }
    return array.pop()
  }
  let i = 0
  while (i < deleteCount) {
    res.push(delItem(context, start))
    i++
  }
  function addItem(array, index, item) {
    array.push(item)
    let i = array.length - 1
    while (i !== index) {
      const temp = array[i]
      array[i] = array[i - 1]
      array[i - 1] = temp
      i--
    }
  }
  for (let i = inserts.length - 1; i >= 0; i--) {
    addItem(context, start, inserts[i])
  }
  return res
}

Array.prototype.mySplice = mySplice

const arr1s = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems1s = arr1s.mySplice(2)
console.log(arr1s, deleteItems1s)
const arr2s = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems2s = arr2s.mySplice(2, 2)
console.log(arr2s, deleteItems2s)

const arr3s = [0, 1, 2, 3, 4, 5, 6, 7]
const deleteItems3s = arr3s.mySplice(2, 2, 'a', 'b', 'c')
console.log(arr3s, deleteItems3s)

