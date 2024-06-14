/**
 * Promise.all
 * @description all 相当于是 & 关系 fulfilled 代表是 true, reject 代表是 false , pending 是待定。所以有一个reject [false]就会返回 reject 信息，所有都resolve 就会返回所有的 fulfilled的值的Promise
 * @param 可迭代对象
 * @return Promise 对象
 */

/* const pa = Promise.all([
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
pa.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pa-' + i, result[i]);
	}
});
const pa1 = Promise.all([
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

pa1.then(
	(result) => {
		for (let i = 0; i < result.length; i++) {
			console.log('pa1-' + i, result[i]);
		}
	},
	(rej) => {
		console.log('pa1-rej', rej);
	}
);
 */
/**
 * all 方法手撕
 */
const __proto__ = Object.getPrototypeOf(Promise);

/**
 * myAll
 * 手撕all
 * @param pms 等待兑现列表 -- 可迭代对象
 * @return {Promise<Array>} 返回Promise
 */
function myAll(pms) {
	/**转存 resolve 和 reject 方法 */
	let allResolve, allReject;
	/**返回的Promise */
	const resPromise = new Promise((resolve, reject) => {
		allResolve = resolve;
		allReject = reject;
	});
	/**保存结果数据 */
	const resData = [];
	/**用来记录一共有多少个Promise */
	let count = 0;
	/**记录已经 fulfilled 的个数 */
	let fulfilledCount = 0;
	for (let iter of pms) {
		/**记录当前Promise的位置 */
		let index = count;
		count++;
		// 判断是否是thenable对象（Promise A+ 规范）,若是执行then方法，若不是一个以兑现的Promise
		if (Object.prototype.hasOwnProperty.call(iter, 'then') && typeof iter.then === 'function') {
			iter
				.then(
					(res) => {
						/**当解决一个就把解决数加一 */
						fulfilledCount++;
						/**把Promise的结果写到对应的位置【index 使用了“块级作用域”】 */
						resData[index] = res;
						/**由于count 加一是同步代码，所以count 一定在所有then方法之前基因获取所有Promise值，当已解决个数等于总数就输出 */
						if (fulfilledCount === count) allResolve(resData);
					},
					(rej) => {
						/**存在任意一个reject就输出错误 */
						allReject(rej);
					}
				)
				.catch((rej) => {
					/**存在任意一个reject就输出错误 */
					allReject(rej);
				});
		} else {
			/**把不是thenable的对象转换为一个已经兑现的Promise */
			/**根据Promise.resolve的特性，传入一个thenable对象就直接返回这个thenable对象，对于所有的值是可以统一使用Promise.resolve的，那么上面的判断就没有意义了，简写了一个版本（myAll1）在下面 */
			Promise.resolve(iter)
				.then(
					(res) => {
						fulfilledCount++;
						resData[index] = res;
						if (fulfilledCount === count) allResolve(resData);
					},
					(rej) => {
						/**存在任意一个reject就输出错误 */
						allReject(rej);
					}
				)
				.catch((rej) => {
					allReject(rej);
				});
		}
	}
	if (count === 0) allResolve(resData);
	return resPromise;
}
__proto__['myAll'] = myAll;

const pma = Promise.myAll([
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
pma.then((result) => {
	for (let i = 0; i < result.length; i++) {
		console.log('pma-' + i, result[i]);
	}
});
const pma1 = Promise.myAll([
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

pma1.then(
	(result) => {
		for (let i = 0; i < result.length; i++) {
			console.log('pma1-' + i, result[i]);
		}
	},
	(rej) => {
		console.log('pma1-rej', rej);
	}
);
