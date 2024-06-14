/**
 * async/await 是ES8出现的一个异步调用的语法糖
 * async/await 的原理是Promise和generator
 * async 函数 等同于 Promise.resolve
 * 即使异步函数的返回值看起来像是被包装在了一个 Promise.resolve 中，但它们不是等价的。
 * 如果给定的值是一个 promise，异步函数会返回一个不同的引用，而 Promise.resolve 会返回相同的引用，
 * 当你想要检查一个 promise 和一个异步函数的返回值是否等价时，这可能是一个麻烦。
const p = new Promise((res, rej) => {
  res(1);
  * Promise和生成器函数解决了一部分的回调地狱问题，但是碰见复杂场景时，还是略有不足。async/await的出现，让我们在解决复杂的异步回调问题时，代码能够更加的优雅，并且面对错误处理时，可以结合try...catch完美的捕获异常，总的来说，它能够让我们的代码在处理异步问题时更加的清晰明了，书写更加规范整齐，增强阅读性。
});

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false
 */

/**
 * async 声明一个异步函数 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function}
 * async 声明的函数返回值会包裹一层Promise对象
 * async 声明的函数如果返回一个普通值，会得到一个fulfilled状态的Promise
 * async 声明的函数如果返回一个thenable对象或Promise，会得到一个pending状态的Promise
 */
async function as1() {
  return '123'
}

console.log(as1())

async function as2() {
  const p = Promise.resolve('asd')
  return p
}

console.log(as2())

/**
 * await 表示的是等待，等待的是右侧的表达式结果
 * await 只能在async标记的函数内部使用，在外部使用时会报错
 * await 的格式 返回值 = await 表达式
 * await 后面的表达式可以是一个promise对象或任何要等待的值
 *  1. await Promise:
 *    a. Promise 为 fulfilled 返回resolve的值
 *    b. Promise 为 reject 抛出异常
 *    c. Promise 为 pending 继续等待
 *  2. await thenable 对象:
 *    a. thenable 的最终状态
 *  3. await 普通值
 *    a. 返回表达式的结果
 * await 会暂停当前async函数的运行直到右侧表达式执行完毕，在async函数中，await下面的代码会被放到异步队列
 * await 有车表达式的执行不受await影响
 * await 等同于 Promise.resolve
 async function foo() {
  await 1;
}

等价于

function foo() {
  return Promise.resolve(1).then(() => undefined);
}

 */

console.log('==========')
console.log(1)
async function g1() {
  console.log(2)
  await (function () {
    console.log(3)
  })()
  console.log(4)
  await console.log(5)
}

const ig1 = g1()
console.log(6)

async function g2() {
  console.log('g2 start')
  try {
    await Promise.reject(123)
  } catch (e) {
    console.log('err', e)
  }
  console.log('g2 end')
}

g2()

