/**
 * Promise.withResolvers
 * 这个版本支持比较高 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers}
 * 无参数
 * 返回一个普通对象如下
 * @typedef ReturnType
 * @type {Object}
 * @property {Promise} promise 一个Promise
 * @property {(value: any) => void} resolve Promise 内的 resolve 方法
 * @property {(value: any) => void} reject Promise 内的 reject 方法
 */

// const promiseObj = Promise.withResolvers();

// console.log(promiseObj);

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
 * 手撕Promise.withResolvers
 */
function myWithResolvers() {
	let resolve, reject;
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return {
		promise,
		resolve,
		reject,
	};
}

Promise.__proto__.myWithResolvers = myWithResolvers;

const promiseObj = Promise.myWithResolvers();

console.log(promiseObj);
