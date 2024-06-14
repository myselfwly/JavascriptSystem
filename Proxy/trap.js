/**
 * 捕获器
 * 使用代理的主要目的是使用捕获器
 * 捕获器就是之前提到的 拦截并向基本操作嵌入额外操作的能力 的实现
 */

/**
 * 每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对 象之前先调用捕获器函数，从而拦截并修改相应的行为
 */

const target = {
  foo: 'bar'
}
/**定义get捕获器 */
const trap = {
  get() {
    return 'aaaaaa'
  }
}
const px1 = new Proxy(target, trap)
// 捕获器只会捕获 代理对象的操作，不会影响目标对象的操作
console.log(target.foo, px1.foo)

const objt = Object.create(target)
const objp = Object.create(px1)
console.log(objt.foo, objp.foo)
objp.foo = 123
console.log(objt.foo, objp.foo, Object.getPrototypeOf(objp).foo)

/**
 * 捕获器和反射API
 * 所有的捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为
 */
/**
 * get 捕获器接收3个参数
 * 参数
 *  1. trapTarget 被代理的目标对象
 *  2. property 被捕获的属性
 *  3. receiver 代理对象
 */

const trap2 = {
  /**
   *
   * @param {Object} trapTarget
   * @param {string|Symbol} property
   * @param {Object} receiver
   */
  get(trapTarget, property, receiver) {
    console.log(trapTarget === target2)
    console.log(property)
    console.log(px2 === receiver)
    // 可以重建被捕获目标对象原始行为
    return trapTarget[property]
  }
}
const target2 = {
  foo: 'bar'
}
const px2 = new Proxy(target2, trap2)

console.log(px2.foo)
/**
 * 所有的捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为，但是并不是所有的捕获器都像get这么简单
 * 全局就出现了一个内置对象 Reflect （反射对象），反射对象包含了捕获器的同名方法
 */

const target3 = {
  foo: 'bar'
}

/* const px3 = new Proxy(target3, {
  get() {
    return Reflect.get(...arguments)
  }
}) */
// 进一步简写
/* const px3 = new Proxy(target3, {
  get: Reflect.get
})
console.log(px3.foo) */
//在简写
const px3 = new Proxy(target3, Reflect)
console.log(px3.foo)

/**
 * 捕获器不变式
 * 使用捕获器几乎可以改变所有基本方法的行为，但也不是没有限制。根据 ECMAScript 规范，每个 捕获的方法都知道目标对象上下文、捕获函数签名，而捕获处理程序的行为必须遵循“捕获器不变式”
 * (trap invariant)。捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为。 比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的
 * 值时，会抛出 TypeError:
 */

const t = {}
Object.defineProperty(t, 'foo', {
  configurable: false,
  value: 'bar',
  writable: false
})
const tp = {
  get() {
    return 'foo'
  }
}
const p = new Proxy(t, tp)

// console.log(p.foo) //throw error

/**
 * 可撤销代理
 * 使用 new Proxy() 创建的代理，无法撤销，这种代理关系，会在代理的生命周期中一直存在
 * 可以使用 Proxy.revocable 穿件可撤销的代理，但是撤销过程不可逆
 */

const t1 = { foo: 'bar' }
const tp1 = {
  get(trapTarget, property, receiver) {
    return trapTarget[property]
  }
}

const { proxy: p2, revoke: r2 } = Proxy.revocable(t1, tp1)

console.log(p2.foo)
r2()
// console.log(p2.foo)//throw error

/**
 * 实用的反射API
 * 某些情况下优先使用反射API是有原因的
 */
/**
 * 原因1:
 *  1. 反射API 不不限于捕获处理程序
 *  2. 大多数反射API方法在 Object 上有对应的方法
 * 通常 Object上的方法适用于通用程序，反射API的方法则适用于细粒度的对象控制与操作
 */

/**
 * 原因2：
 * 很多反射API方法的返回值是一个标记成功和失败的boolean值
 */
const o = {}
// try {
//   Object.defineProperty(o, foo, 'bar')
//   console.log('success')
// } catch (e) {
//   console.log('failed')
// }

// 重构
if (Reflect.defineProperty(o, 'foo', { value: 'bar' })) {
  console.log('success')
} else {
  console.log('failed')
}

/**
 * 以下反射方法都会提供状态标记:
 * Reflect.defineProperty()
 * Reflect.preventExtensions()
 * Reflect.setPrototypeOf()
 * Reflect.set()
 * Reflect.deleteProperty()
 */

/**
 * 原因3:
 * 用函数替代操作符
 * Reflect.get():可以替代对象属性访问操作符 （obj.name）。
 * Reflect.set():可以替代=赋值操作符 (obj.name = 'aa')。
 * Reflect.has():可以替代 in 操作符或 with() ('name' in obj)。
 * Reflect.deleteProperty():可以替代 delete 操作符 (delete obj.name)。
 * Reflect.construct():可以替代 new 操作符 (new Object())。
 */

/**
 * 原因4:
 * 安全地应用函数
 */
/**
 * 在通过 apply 方法调用函数时，被调用的函数可能也定义了自己的 apply 属性(虽然可能性极小)。 为绕过这个问题，可以使用定义在 Function 原型上的 apply 方法
 */
const thisVal = { thisVal: 'thisVal' }
function myFunc() {
  console.log(this)
}
myFunc.apply = function () {
  console.log(this)
}
myFunc.apply(thisVal, [1, 2, 3, 4])
Function.prototype.apply.call(myFunc, thisVal, [1, 2, 3, 4])
// 这种可怕的代码完全可以使用Reflect.apply 来避免:
Reflect.apply(myFunc, thisVal, [1, 2, 3, 4])
/**
 * 捕获器
 * get
 * set
 * defineProperty
 * has
 * constructor
 * deleteProperty
 * preventExtensions
 * isExtensible
 * ownKeys
 * getOwnPropertyDescriptor
 * getPrototypeOf
 * setPrototypeOf
 * apply
 */

