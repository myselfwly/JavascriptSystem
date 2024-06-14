/**
 * Promise.resolve
 * 1. 传一个非thenable对象则立即返回一个已经 fulfilled Promise
 * 2. 传一个thenable对象则返回该thenable 对象
 */

/* console.log(Promise.resolve(123));
console.log(
	Promise.resolve(
		new Promise((res) => {
			res(321);
		})
	)
); */

/* 
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: 123, Symbol(async_id_symbol): 5, Symbol(trigger_async_id_symbol): 1}
myResolve.js:7
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: 321, Symbol(async_id_symbol): 9, Symbol(trigger_async_id_symbol): 1}
*/

/**
 * 手撕Promise.resolve
 */

Object.defineProperty(Promise, '__proto__', {
	configurable: false,
	get() {
		return Object.getPrototypeOf(this);
	},
	set() {
		throw new Error('property of "__proto__" is not writable');
	},
});
/**
 * 手撕 Promise.resolve
 * @param value fulfilled 的结果
 * @return {Promise}
 */
function myResolve(value) {
	/**
	 * 1. 传一个非thenable对象则立即返回一个已经 fulfilled Promise
	 * 2. 传一个thenable对象则返回该thenable 对象
	 */
	if (value && typeof value.then === 'function') {
		return value;
	} else {
		return new Promise((res) => {
			res(value);
		});
	}
}

Promise.__proto__.myResolve = myResolve;
console.log(Promise.myResolve(123));
console.log(
	Promise.myResolve(
		new Promise((res) => {
			res(321);
		})
	)
);
