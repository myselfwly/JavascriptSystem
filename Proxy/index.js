/**
 * 代理和反射
 * 出生： ECMAScript6
 * 作用：
 * 为开发者提供了 拦截并向基本操作嵌入额外操作的能力，代理对象可以被看作 抽象的目标对象
 */

/**
 * 创建代理
 * 创建代理的最简单方式是创建空代理
 * 代理使用的是 Proxy 构造函数创建的
 */
/**
 * Proxy构造函数
 * 参数：
 *  1. target 必选 代理目标对象
 *  2. trap 必选 处理程序对象
 * 返回：
 *  代理对象（代理目标对象的抽象对象）
 */
const target = {
  id: 'target'
}
const trap = {}
const px1 = new Proxy(target, trap)
// 两个对象会访问同一个值 目标对象
console.log(target.id, px1.id)

target.id = 'foo'
// 两个对象会访问同一个值 目标对象
console.log(target.id, px1.id)

px1.id = 'bar'
// 赋值操作会转移到目标对象
console.log(target.id, px1.id)

// hasOwnProperty 作用于同一个值 目标对象
console.log(target.hasOwnProperty('id'), px1.hasOwnProperty('id'))

// Proxy.prototype 是 undefined
// 因此不能使用 instanceof 操作符
// console.log(target instanceof Proxy) // TypeError: Function has non-object prototype 9 'undefined' in instanceof check
// console.log(px1 instanceof Proxy) // TypeError: Function has non-object prototype 'undefined' in instanceof check

// 严格相等可以用来区分代理和目标
console.log(target === px1) // false

