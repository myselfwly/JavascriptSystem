/**
 * Promise
 * Promise 是ES6 推出的
 * 推出依据 Promise A+ 规范
 * Promise A+ 规范定义了 Promise的结构，主要是拥有 .then 方法的对象(通常称为 thenable)，规范了前段的回调方式
 * Promise 是由官方对Promise A+ 规范的实现
 * Promise A+ 规范是为了解决回调函数不规范，一定程度的规范了回调地狱，但并未解决
 */

const pro1 = new Promise((resolve, reject) => {
	console.log(1);
	resolve(2);
});

console.log(3);
pro1.then((res) => {
	console.log(4);
	console.log(res);
});
console.log(5);
console.log('========');

const promise = new Promise((resolve) => resolve(123));

const promise1 = new Promise((resolve) => {
	resolve(promise);
});

/**
 * 这里 promise1 的 then 会执行 2 步  
 * 注意 每一个resolve方法都必须执行 then 方法才能获取到 resolve 的值  
 * 所以第一步先去获取 resolve(promise) [Promise 内部实现]  
 * 伪代码  
 pt1 = promise1.then(res=>{
    res // promise
    return res
 })  
 * 执行完第一步后会将 promise 的resolve(123) 的 123 通过 then 方法取出 [Promise内部实现]  
pt2 = pt1.then(res=>{
  res // 123
  return 123
})
 * 然后进入真正在代码里写的 then 方法  
pt2.then(res=>{
  console.log(res - 1)
  return res - 1
})
 * 所以说最终 promise 写的then 方法会延迟执行2个事件循环  
 */

promise1
	.then((res) => {
		console.log(res - 1);
		return res - 1;
	})
	.then((res) => {
		console.log(res - 1);
		return res - 1;
	})
	.then((res) => {
		console.log(res - 1);
		return res - 1;
	});
/**
 * Promise.resolve 传递参数
 * 1. 非 thenable 对象 会返回一个 fulfilled 的 Promise
 * 2. thenable 对象 会直接返回 thenable 对象
 */
Promise.resolve(promise)
	.then((res) => {
		console.log(res);
		return res;
	})
	.then((res) => {
		console.log(res + 1);
		return res + 1;
	})
	.then((res) => {
		console.log(res + 1);
		return res + 1;
	});

/**
 * Promise 静态方法
 * all 相当于是 & 关系 fulfilled 代表是 true, reject 代表是 false , pending 是待定。所以有一个reject [false]就会返回 reject 信息，所有都resolve 就会返回所有的 fulfilled的值的Promise
 * race 相当于是 ｜ 关系 fulfilled 是 true，reject 是 true，pending 是待定。所以第一个 fulfilled 或者 reject 就返回 对应的reject或fulfilled的值的Promise
 * allSettled 相当于是 & 关系，fulfilled 是 true，reject 是 true，pending 是待定。所以当所有的Promise完成兑现（settled）以后才会返回所有fulfilled和reject的值的Promise
 * any  相当于 | 关系，fulfilled 是 true，reject 是 false，pending是待定。所以第一个 fulfilled 就返回 对应的fulfilled的值的Promise，但全部是reject的时候会返回所有reject信息的Promise
 * reject 返回一个立即reject的Promise对象
 * resolve 返回一个立即fulfilled的对象
 * withResolvers 返回一个对象，其包含一个新的 Promise 对象和两个函数
 */
