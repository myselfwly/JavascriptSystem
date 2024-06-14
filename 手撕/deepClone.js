/**
 * 第一版无法解决交叉引用
 * @param {object} obj
 * @returns
 */
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  let res = {}
  if (Array.isArray(obj)) {
    res = []
  }
  Object.keys(obj).forEach((item) => {
    res[item] = deepClone(obj[item])
  })
  return res
}

const obj = {
  a: 'a',
  b: {
    b_1: {
      b_1_1: 1
    },
    b_2: [{ name: 'b_2_1' }, 3]
  }
}

const cpObj = deepClone(obj)
console.log(cpObj)

const obj1 = { a: '4' }
const obj2 = { b: '3' }
obj1.c = obj2
obj2.d = obj1
// const cpJcObj = deepClone(obj1) // 交叉引用，爆栈，报错
/**
 *
 * @param {object} obj
 * @returns
 */
function deepClone2(obj) {
  // 使用Map来解决交叉引用问题
  const objMap = new WeakMap()
  function _deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    let res = {}
    if (Array.isArray(obj)) {
      res = []
    }
    //如果已经计算过当前obj
    if (objMap.has(obj)) {
      res = objMap.get(obj)
      // 直接返回计算过的obj
      return res
    } else {
      // 如果没有将 obj作为key ，res作为value，放到 map中（这里用的都是引用类型，所以放进去的res和外面的res指向同一个地址）
      objMap.set(obj, res)
    }
    Object.keys(obj).forEach((item) => {
      res[item] = _deepClone(obj[item])
    })
    return res
  }
  return _deepClone(obj)
}

const cpJcObj = deepClone2(obj1)
console.log(cpJcObj)

