const PENDING = 'pending'
const Resolved = 'fulfilled'
const Rejected = 'rejected'
/**
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise}
 */
class MyPromise {
  #status = PENDING
  #resolveQueen = []
  #rejectQueen = []
  /**成功兑现值，不能是thenable对象，在resolve方法中处理过 */
  #value = undefined
  /**错误值 */
  #reason = undefined
  /**调用回调方法 */
  #run = () => {
    /**pending 状态直接返回 */
    if (this.#status === PENDING) return
    /**根据 成功和失败取出相应的任务队列和新颖的结果 */
    const data =
      this.#status === Rejected
        ? { value: this.#reason, queen: this.#rejectQueen }
        : { value: this.#value, queen: this.#resolveQueen }
    /**微队列执行任务 */
    queueMicrotask(() => {
      while (true) {
        /**拿出最前面的任务 */
        const item = data.queen.shift()
        /**任务拿完以后跳出循环 */
        if (item === undefined) break
        const { fn, resolve, reject } = item
        /**若传入的是函数直接执行 */
        if (typeof fn === 'function') {
          try {
            /**执行函数并将返回值作为 then 返回的Promise的 fulfilled 的值 */
            const res = fn(data.value)
            resolve(res)
          } catch (error) {
            // 报错 将 error 作为 then 返回的Promise的 rejected 的值
            reject(error)
          }
        } else {
          // 若传递的不是函数 那么 直接返回当前值作为 then 返回的Promise的 fulfilled 的值
          resolve(data.value)
        }
      }
    })
  }
  /**改变Promise状态 */
  #changeState = (state, value) => {
    if (this.#status !== PENDING) return
    this.#status = state
    if (state === Rejected) {
      this.#reason = value
    } else {
      this.#value = value
    }
    this.#run()
  }
  constructor(executor) {
    // 依据官方文档
    /**
     * 1. 如果它被调用时传入了新建的 Promise 对象本身（即它所“绑定”的 Promise 对象），则 Promise 对象会被拒绝并抛出一个 TypeError 错误。
     */
    if (value === this) throw new Error('Chaining cycle detected for promise ')
    const resolve = (res) => {
      /**
       * 2.如果它被调用时传入了一个 thenable 对象（包括另一个 Promise 实例），则该 thenable 对象的 then 方法将被保存并在未来被调用（它总是异步调用）。
       * then 方法将被调用并传入两个回调函数，这两个函数的行为与传递给 executor 函数的 resolveFunc 和 rejectFunc 函数完全相同。如果调用 then 方法时出现错误，
       * 则当前的 Promise 对象会被拒绝并抛出这个错误。
       */
      if (typeof res?.then === 'function') {
        /**
         * 但是在 resolve(thenable) 的情况中，有如下区别：
         *  a. resolve 函数是同步调用的，因此再次调用 resolve 或 reject 函数没有任何影响，即使通过 anotherPromise.then() 绑定的处理程序尚未被调用。
         *  b. then 方法是异步调用的，因此如果传入 thenable 对象，则该 Promise 对象不会被立即解决。
         * 因为 resolve 函数再次调用时使用 thenable.then() 传递给它的任何值作为 value 参数，所以解决函数能够展开嵌套的 thenable 对象，
         * 其中一个 thenable 对象调用其 onFulfilled 处理程序并返回另一个 thenable 对象。这样做的效果是，
         * 真实的 Promise 对象的兑现处理器永远不会接收到 thenable 对象作为其兑现值。
         * 仔细理解官方文档
         */
        queueMicrotask(() => {
          try {
            res.then(resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        /**
         * 3. 如果它使用一个非 thenable 的值（基本类型，或一个没有 then 属性或 then 属性不可调用的对象），则该 Promise 对象会被立即以该值兑现。
         */
        this.#changeState(Resolved, res)
      }
    }
    const reject = (err) => {
      this.#changeState(Rejected, err)
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(resolveFn, rejectFn) {
    /**返回一个Promise */
    return new MyPromise((resolve, reject) => {
      if (this.#status === PENDING) {
        /**pending 状态直接放入队列（成功和失败） */
        this.#resolveQueen.push({ fn: resolveFn, resolve, reject })
        this.#rejectQueen.push({ fn: rejectFn, resolve, reject })
      } else if (this.#status === Resolved) {
        /**放入成功队列 */
        this.#resolveQueen.push({ fn: resolveFn, resolve, reject })
      } else if (this.#status === Rejected) {
        /**放入失败队列 */
        this.#rejectQueen.push({ fn: rejectFn, resolve, reject })
      }
      /**调用运行函数 */
      this.#run()
    })
  }
  catch(fn) {
    this.then(null, fn)
  }
  finally(res, rej) {
    this.then(res, rej)
  }
  static myResolve(value) {
    /**
     * 1. 传一个非thenable对象则立即返回一个已经 fulfilled Promise
     * 2. 传一个thenable对象则返回该thenable 对象
     */
    if (value && typeof value.then === 'function') {
      return value
    } else {
      return new MyPromise((res) => {
        res(value)
      })
    }
  }
  static myReject(reason) {
    let myRejectReject
    const resPromise = new MyPromise((_resolve, reject) => {
      myRejectReject = reject
    })
    myRejectReject(reason)
    return resPromise
  }
  static myAll(pms) {
    /**转存 resolve 和 reject 方法 */
    let allResolve, allReject
    /**返回的Promise */
    const resPromise = new MyPromise((resolve, reject) => {
      allResolve = resolve
      allReject = reject
    })
    /**保存结果数据 */
    const resData = []
    /**用来记录一共有多少个Promise */
    let count = 0
    /**记录已经 fulfilled 的个数 */
    let fulfilledCount = 0
    for (let iter of pms) {
      /**记录当前Promise的位置 */
      let index = count
      count++
      // 判断是否是thenable对象（Promise A+ 规范）,若是执行then方法，若不是一个以兑现的Promise
      if (
        Object.prototype.hasOwnProperty.call(iter, 'then') &&
        typeof iter.then === 'function'
      ) {
        iter
          .then(
            (res) => {
              /**当解决一个就把解决数加一 */
              fulfilledCount++
              /**把Promise的结果写到对应的位置【index 使用了“块级作用域”】 */
              resData[index] = res
              /**由于count 加一是同步代码，所以count 一定在所有then方法之前基因获取所有Promise值，当已解决个数等于总数就输出 */
              if (fulfilledCount === count) allResolve(resData)
            },
            (rej) => {
              /**存在任意一个reject就输出错误 */
              allReject(rej)
            }
          )
          .catch((rej) => {
            /**存在任意一个reject就输出错误 */
            allReject(rej)
          })
      } else {
        /**把不是thenable的对象转换为一个已经兑现的Promise */
        /**根据Promise.resolve的特性，传入一个thenable对象就直接返回这个thenable对象，对于所有的值是可以统一使用Promise.resolve的，那么上面的判断就没有意义了，简写了一个版本（myAll1）在下面 */
        MyPromise.myResolve(iter)
          .then(
            (res) => {
              fulfilledCount++
              resData[index] = res
              if (fulfilledCount === count) allResolve(resData)
            },
            (rej) => {
              /**存在任意一个reject就输出错误 */
              allReject(rej)
            }
          )
          .catch((rej) => {
            allReject(rej)
          })
      }
    }
    if (count === 0) allResolve(resData)
    return resPromise
  }
  static myRace(iterableObj) {
    let raceResolve, raceReject
    const resPromise = new MyPromise((resolve, reject) => {
      raceResolve = resolve
      raceReject = reject
    })
    let count = 0
    for (const iter of iterableObj) {
      // if (Object.prototype.hasOwnProperty.call(iter, "then") && typeof iter.then === "function") {
      //   iter.then((res) => {
      //     raceResolve(res)
      //   },(err) => {
      //     raceReject(err)
      //   }).catch((err) => {
      //     raceReject(err)
      //   })
      // }else{
      MyPromise.myResolve(iter)
        .then(
          (res) => {
            raceResolve(res)
          },
          (err) => {
            raceReject(err)
          }
        )
        .catch((err) => {
          raceReject(err)
        })
      // }
      count++
    }
    if (count === 0) raceResolve()
    return resPromise
  }
  static myAllSettled(iterable) {
    //1. 定义返回Promise，并将Promise 内的 resolve 方法和 reject 方法取出
    let allSettledResolve, allSettledReject
    const resPromise = new MyPromise((resolve, reject) => {
      allSettledResolve = resolve
      // 这个用不到，因为不管成功失败 allSettled 都是返回一个已解决的（fulfilled）Promise
      allSettledReject = reject
    })
    //2. 记录一共有多少个任务
    let count = 0
    //3. 记录已完成（settled）任务的个数
    let settledCount = 0
    //4. 创建任务结果数组
    const resData = []
    //4. 遍历迭代对象
    for (const iter of iterable) {
      //5. 记录当前任务下标，以便于插入结果数组的正确的位置，块级作用域
      const index = count
      //6. 任务转化为标准任务模型（Promise）
      MyPromise.myResolve(iter).then(
        (data) => {
          // 转化为标注数据
          const standardData = { status: 'fulfilled', value: data }
          // 放入任务结果数组
          resData[index] = standardData
          // 已解决+1
          settledCount++
          // 已解决的任务等于任务总数输出
          if (settledCount === count) {
            allSettledResolve(resData)
          }
        },
        (err) => {
          // 转化为标注数据
          const standardData = { status: 'rejected', reason: err }
          resData[index] = standardData
          // 已解决+1
          settledCount++
          // 已解决的任务等于任务总数输出
          if (settledCount === count) {
            allSettledResolve(resData)
          }
        }
      )
      // 任务总数 + 1
      count++
    }
    // 任务总数为0 直接输出
    if (count === 0) allSettledResolve(resData)
    return resPromise
  }
  static myAny(iterable) {
    let anyResolve, anyReject
    const resPromise = new MyPromise((resolve, reject) => {
      anyResolve = resolve
      anyReject = reject
    })
    let count = 0
    let rejectCount = 0
    const rejectArr = []
    for (const iter of iterable) {
      let index = count
      MyPromise.myResolve(iter).then(
        (data) => {
          anyResolve(data)
        },
        (err) => {
          rejectArr[index] = err
          rejectCount++
          if (rejectCount === count) {
            const resErr = new AggregateError(
              rejectArr,
              'All promises were rejected'
            )
            anyReject(resErr)
          }
        }
      )
      count++
    }
    if (count === 0) anyResolve()
    return resPromise
  }
  static myWithResolvers() {
    let resolve, reject
    const promise = new MyPromise((res, rej) => {
      resolve = res
      reject = rej
    })
    return {
      promise,
      resolve,
      reject
    }
  }
}

const myPromise = new MyPromise((resolve) => resolve(123))

const myPromise1 = new MyPromise((resolve) => {
  resolve(myPromise)
})

myPromise1
  .then((res) => {
    console.log(res - 1)
    return res - 1
  })
  .then((res) => {
    console.log(res - 1)
    return res - 1
  })
  .then((res) => {
    console.log(res - 1)
    return res - 1
  })

MyPromise.myResolve(myPromise)
  .then((res) => {
    console.log(res)
    return res
  })
  .then((res) => {
    console.log(res + 1)
    return MyPromise.myResolve(res + 1)
  })
  .then((res) => {
    console.log(res + 1)
    return res + 1
  })

// const promise = new Promise((resolve) => resolve(123))

// const promise1 = new Promise((resolve) => {
//   resolve(promise)
// })

// promise1
//   .then((res) => {
//     console.log(res - 1)
//     return res - 1
//   })
//   .then((res) => {
//     console.log(res - 1)
//     return res - 1
//   })
//   .then((res) => {
//     console.log(res - 1)
//     return res - 1
//   })

// Promise.resolve(promise)
//   .then((res) => {
//     console.log(res)
//     return res
//   })
//   .then((res) => {
//     console.log(res + 1)
//     return Promise.resolve(res + 1)
//   })
//   .then((res) => {
//     console.log(res + 1)
//     return res + 1
//   })

