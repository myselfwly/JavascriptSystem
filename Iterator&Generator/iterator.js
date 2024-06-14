/**
 * [@@iterator] 可迭代协议  
 * 通过 Symbol.iterator 可以访问和修改可迭代协议  
 * 可迭代协议方法会返回一个迭代器对象，迭代器对象必须满足迭代器协议  
 *   
 * 迭代器协议  
 * 迭代器协议规定  
 * 1. 迭代器对象必须有 next 方法  
 * 2. next 方法的返回值必须满足 {@link IteratorResult} 对象  
 * 3. return 方法可以存在于迭代器对象，表示终止迭代，必须满足{@link IteratorResult} 对象  
 * 4. throw 方法可以存在于迭代器对象，表示终止捕获异常，必须满足{@link IteratorResult} 对象  
 *   
 * IteratorResult 对象
 * @typedef IteratorResult
 * @type {object}
 * @property {boolean} done 迭代器完成状态 false 未完成，true 已完成  
 * @property {any} value  迭代器迭代值
 */

// 1. 一般情况反着来先创建一个 IteratorResult
/**@type {IteratorResult} */
let iteratorRes = {
  value: 1,
  done: false
}

// 2. 根据迭代器协议创建一个迭代器对象
var iteratorObj = {
  /**必须有next方法，并且返回值为 {@type {IteratorResult}} */
  next() {
    return iteratorRes
  }
}

// 3. 创建一个可迭代对象
var iteratorAbleObj = {
  /**可迭代对象必须返回一个迭代器 */
  [Symbol.iterator](){return iteratorObj}
}
/**
 * 可迭代对象可用于  
 * 1. 解构赋值  
 * 2. for of 循环  
 * 3. Set 参数  
 * 4. WeakMap 参数  
 * 5. WeakSet 参数  
 * 6. Promise.all 参数  
 * 7. Promise.race 参数  
 * 8. Promise.any 参数  
 * 9. Array.from 参数  
 * 10. Object.groupBy 参数
 * 11. Map.groupBy 参数
 */
const [a1, b1, c1] = iteratorAbleObj
console.log(a1, b1, c1)
/**
 * 使以下代码正常运行
const obj = { a: 1, b: 2 }
const [a, b] = obj
console.log(a) // 1
console.log(b) //2
 */
const obj = { a: 1, b: 2 }
obj[Symbol.iterator] = function () { 
  const that = this
  const keys = Object.keys(that)
  let index = 0
  return {
    next() {
      const value = that[keys[index]]
      const done = value === undefined
      index ++
      return {
        value,
        done
      }
    }
  }
}
const [a, b] = obj
console.log(a) // 1
console.log(b) //2