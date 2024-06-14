/**
 * Promise.any
 * @description any  相当于 | 关系，fulfilled 是 true，reject 是 false，pending是待定。所以第一个 fulfilled 就返回 对应的fulfilled的值的Promise，但全部是reject的时候会返回所有reject信息的Promise
 * @param 可迭代对象
 * @return Promise 对象
 */

/* const pan = Promise.any([
	new Promise((res) => {
		setTimeout(() => {
			res(1);
		}, 1 * 1000);
	}),
	Promise.reject(2),
	Promise.reject(3),
]);

pan.then(console.log, console.log);
const pan1 = Promise.any([
	new Promise((res, rej) => {
		setTimeOut(() => {
			rej(1);
		}, 1 * 1000);
	}),
	Promise.reject(2),
	Promise.reject(3),
]);
pan1.then(console.log, console.log); */
/* 
AggregateError: All promises were rejected {stack: 'AggregateError: All promises were rejected', message: 'All promises were rejected', errors: Array(3)}
*/

Object.defineProperty(Promise, '__proto__', {
  configurable: false,
  get() {
    return Object.getPrototypeOf(this)
  },
  set() {
    throw new Error('Can not set property of __proto__')
  }
})

function myAny(iterable) {
  let anyResolve, anyReject
  const resPromise = new Promise((resolve, reject) => {
    anyResolve = resolve
    anyReject = reject
  })
  let count = 0
  let rejectCount = 0
  const rejectArr = []
  for (const iter of iterable) {
    let index = count
    Promise.resolve(iter).then(
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
Promise.__proto__.myAny = myAny
const pan = Promise.myAny([
  new Promise((res) => {
    setTimeout(() => {
      res(1)
    }, 1 * 1000)
  }),
  Promise.reject(2),
  Promise.reject(3)
])

pan.then(console.log, console.log)
const pan1 = Promise.myAny([
  new Promise((res, rej) => {
    setTimeOut(() => {
      rej(1)
    }, 1 * 1000)
  }),
  Promise.reject(2),
  Promise.reject(3)
])
pan1.then(console.log, console.log)

