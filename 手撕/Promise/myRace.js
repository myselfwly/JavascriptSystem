/**
 * Promise.race
 * @description race 相当于是 ｜ 关系 fulfilled 是 true，reject 是 true，pending 是待定。所以第一个 fulfilled 或者 reject 就返回 对应的reject或fulfilled的值的Promise
 * @param 可迭代对象
 * @return Promise 对象
 */
/* 
const pr = Promise.race([
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

pr.then((res) => {
	console.log('pr', res);
});

const pr1 = Promise.race([
	Promise.reject('rej'),
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

pr1
	.then((res) => {
		console.log('pr1  ', res);
	})
	.catch((err) => {
		console.log('prErr1  ', err);
	});
 */
const __proto__ = Object.getPrototypeOf(Promise);
/**
 * 手撕 Promise.myRace 只要已完成（settled）就返回
 * @param iterable 可迭代对象
 * @return {Promise}
 */
function myRace(iterableObj) {
	let raceResolve, raceReject;
	const resPromise = new Promise((resolve, reject) => {
		raceResolve = resolve;
		raceReject = reject;
	});
	let count = 0;
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
		Promise.resolve(iter)
			.then(
				(res) => {
					raceResolve(res);
				},
				(err) => {
					raceReject(err);
				}
			)
			.catch((err) => {
				raceReject(err);
			});
		// }
		count++;
	}
	if (count === 0) raceResolve();
	return resPromise;
}
__proto__.myRace = myRace;

const pmr = Promise.myRace([
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

pmr.then((res) => {
	console.log('pmr', res);
});

const pmr1 = Promise.myRace([
	Promise.reject('rej'),
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

pmr1
	.then((res) => {
		console.log('pmr1  ', res);
	})
	.catch((err) => {
		console.log('pmrErr1  ', err);
	});
