/**
 * Promise.allSettled
 * @param 可迭代对象
 * @return Promise 对象
 */
/* const pas = Promise.allSettled([
	1,
	2,
	3,
	new Promise((res) => {
		res(4);
	}),
	new Promise((res) => {
		setTimeout(() => {
			res(5);
		}, 1 * 1000);
	}),
]);
pas.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pas-' + i, result[i]);
	}
});
const pas1 = Promise.allSettled([
	1,
	2,
	3,
	new Promise((res) => {
		res(4);
	}),
	new Promise((res, rej) => {
		setTimeout(() => {
			rej(5);
		}, 1 * 1000);
	}),
]);

pas1.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pas1-' + i, result[i]);
	}
}); */

// 输出结果
/*
pas-0 {status: 'fulfilled', value: 1}
myAllSettled.js:21
pas-1 {status: 'fulfilled', value: 2}
myAllSettled.js:21
pas-2 {status: 'fulfilled', value: 3}
myAllSettled.js:21
pas-3 {status: 'fulfilled', value: 4}
myAllSettled.js:21
pas-4 {status: 'fulfilled', value: 5}
myAllSettled.js:21
pas1-0 {status: 'fulfilled', value: 1}
myAllSettled.js:41
pas1-1 {status: 'fulfilled', value: 2}
myAllSettled.js:41
pas1-2 {status: 'fulfilled', value: 3}
myAllSettled.js:41
pas1-3 {status: 'fulfilled', value: 4}
myAllSettled.js:41
pas1-4 {status: 'rejected', reason: 5}
*/

Object.defineProperty(Promise, '__proto__', {
	configurable: false,
	get() {
		return Object.getPrototypeOf(this);
	},
	set() {
		throw new Error('Promise property of "__proto__" is not allow set value');
	},
});

/**
 * 手撕 allSettled
 * @param iterable 可迭代对象
 * @return {Promise}
 */
function myAllSettled(iterable) {
	//1. 定义返回Promise，并将Promise 内的 resolve 方法和 reject 方法取出
	let allSettledResolve, allSettledReject;
	const resPromise = new Promise((resolve, reject) => {
		allSettledResolve = resolve;
		// 这个用不到，因为不管成功失败 allSettled 都是返回一个已解决的（fulfilled）Promise
		allSettledReject = reject;
	});
	//2. 记录一共有多少个任务
	let count = 0;
	//3. 记录已完成（settled）任务的个数
	let settledCount = 0;
	//4. 创建任务结果数组
	const resData = [];
	//4. 遍历迭代对象
	for (const iter of iterable) {
		//5. 记录当前任务下标，以便于插入结果数组的正确的位置，块级作用域
		const index = count;
		//6. 任务转化为标准任务模型（Promise）
		Promise.resolve(iter).then(
			(data) => {
				// 转化为标注数据
				const standardData = { status: 'fulfilled', value: data };
				// 放入任务结果数组
				resData[index] = standardData;
				// 已解决+1
				settledCount++;
				// 已解决的任务等于任务总数输出
				if (settledCount === count) {
					allSettledResolve(resData);
				}
			},
			(err) => {
				// 转化为标注数据
				const standardData = { status: 'rejected', reason: err };
				resData[index] = standardData;
				// 已解决+1
				settledCount++;
				// 已解决的任务等于任务总数输出
				if (settledCount === count) {
					allSettledResolve(resData);
				}
			}
		);
		// 任务总数 + 1
		count++;
	}
	// 任务总数为0 直接输出
	if (count === 0) allSettledResolve(resData);
	return resPromise;
}

Promise['__proto__'].myAllSettled = myAllSettled;

const pmas = Promise.myAllSettled([
	1,
	2,
	3,
	new Promise((res) => {
		res(4);
	}),
	new Promise((res) => {
		setTimeout(() => {
			res(5);
		}, 1 * 1000);
	}),
]);
pmas.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pmas-' + i, result[i]);
	}
});
const pmas1 = Promise.myAllSettled([
	1,
	2,
	3,
	new Promise((res) => {
		res(4);
	}),
	new Promise((res, rej) => {
		setTimeout(() => {
			rej(5);
		}, 1 * 1000);
	}),
]);

pmas1.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pmas1-' + i, result[i]);
	}
});
