/**
 * new 操作符
 * new 操作符用于创建新的对象
 * new 操作符做了什么
 * 1. 创建 对象实例
 * 2. 将 对象实例 的原型设置为 constructor 的 prototype, 若 prototype 不是对象 则 对象实例 的原型为 Object.prototype
 * 3. 改变 constructor 的 this 指向 为创建的对象
 * 4. 执行 constructor
 * 5. 若 constructor 返回了非原始类型，那么返回值就是新的实例，否则第一步创建的实例对象就是新的实例
 */

function Person(name, age) {
  this.name = name
  this.age = age
  this.sayName = () => {
    console.log(this.name)
  }
  return 1
}

function Animal(sex) {
  this.sex = sex
  this.name = 'hha'
  return { animal: true }
}

const p1 = new Person('dd', 18)
const a1 = new Animal('aa')

console.log(p1, a1)

/**
 * 手撕 new
 */
/**
 *
 * @param {Function} constructor
 * @param  {...any} args
 */
function myNew(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new Error('constructor is not a Function')
  }
  const o = new Object()
  if (Object(constructor.prototype) === constructor.prototype) {
    Object.setPrototypeOf(o, constructor.prototype)
  }
  const res = constructor.apply(o, args)
  return Object(res) === res ? res : o
}

const p2 = myNew(Person, 'dd', 18)
const a2 = myNew(Animal, 'aa')

console.log(p2, a2)

