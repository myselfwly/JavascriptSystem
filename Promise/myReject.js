/**
 * Promise.reject
 * 返回一个reject 的Promise reject内容就是穿的参数
 */

/* console.log(Promise.reject(123));
console.log(Promise.reject(new Promise((res) => 321))); */
/* 
Process exited with code 1
Promise {[[PromiseState]]: 'rejected', [[PromiseResult]]: 123, Symbol(async_id_symbol): 5, Symbol(trigger_async_id_symbol): 1}
myReject.js:6
Promise {[[PromiseState]]: 'rejected', [[PromiseResult]]: Promise, Symbol(async_id_symbol): 10, Symbol(trigger_async_id_symbol): 1}
myReject.js:7
Uncaught Error UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "123".
    at getErrorWithoutStack (internal/process/promises:321:15)
    at generateUnhandledRejectionError (internal/process/promises:341:15)
    at processPromiseRejections (internal/process/promises:287:24)
    at processTicksAndRejections (internal/process/task_queues:96:32)
*/

Object.defineProperty(Promise, '__proto__', {
	configurable: false,
	get() {
		return Object.getPrototypeOf(this);
	},
	set() {
		throw new Error('property of "__proto__" is not writeable');
	},
});
function myReject(reason) {
	let myRejectReject;
	const resPromise = new Promise((_resolve, reject) => {
		myRejectReject = reject;
	});
	myRejectReject(reason);
	return resPromise;
}

Promise.__proto__.myReject = myReject;
console.log(Promise.myReject(123));
console.log(Promise.myReject(new Promise((res) => 321)));
