/**
 * generator
 * Generator 对象由生成器函数返回并且它符合可迭代协议和迭代器协议
 */

/**
 * 生成器函数 {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*}
 * 表达式 function*
 * 生成器函数可以退出，并在稍后重新进入，其上下文会在重新进入时保存
 */

function* generator(i) {
  yield i
  yield i + 10
}

const gen = generator(10)
console.log(gen)
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

function* generator1(i) {
  for (let s = 0; s < i; s++) {
    yield s
  }
}
const gen1 = generator1(10)
for (const iter of gen1) {
  console.log(iter)
}

function* anotherGenerator(i) {
  yield i + 1
  yield i + 1
  yield i + 1
}

function* generator2(i) {
  yield i
  yield* anotherGenerator(i)
  yield i + 10
}

const gen2 = generator2(1)

console.log(gen2.next())
console.log(gen2.next())
console.log(gen2.next())
console.log(gen2.next())
console.log(gen2.next())

