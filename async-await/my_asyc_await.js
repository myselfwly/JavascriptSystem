/**
 * async 内部实现
 * @returns Promise
 */
function my_async() {
  function* test() {
    const res1 = yield new Promise((res, rej) => {
      setTimeout(() => {
        rej(2)
      }, 1000)
    })
    const res2 = yield new Promise((res) => {
      setTimeout(() => {
        res(res1 + 3)
      }, 1000)
    })
    return res2
  }
  const iterator = test()
  let resolveFun, rejectFun
  function doFoo(iterator, value) {
    const res = iterator.next(value)
    const resValue = Promise.resolve(res.value)
    resValue.then(
      (result) => {
        if (res.done) {
          resolveFun(result)
        } else {
          doFoo(iterator, result)
        }
      },
      (reject) => {
        rejectFun(reject)
      }
    )
  }
  doFoo(iterator, undefined)
  return new Promise((resolve, reject) => {
    resolveFun = resolve
    rejectFun = reject
  })
}

my_async().then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

