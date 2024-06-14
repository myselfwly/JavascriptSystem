/**
 *
 * @param {Object} instance
 * @param {Function} constructor
 */
function myInstanceOf(instance, constructor) {
  if (typeof constructor !== 'function') {
    throw new Error('constructor must be a function')
  }
  const targetPrototype = constructor.prototype
  let sourceProtoType = Reflect.getPrototypeOf(instance)
  while (true) {
    //找到头了
    if (sourceProtoType === null) return false
    // 命中
    if (sourceProtoType === targetPrototype) return true
    // 未命中
    sourceProtoType = Reflect.getPrototypeOf(sourceProtoType)
  }
}

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log(this.name)
}
/** Man 继承自 Person */
function Man(name, age) {
  Person.call(this, name, age)
  this.sex = 1
}

const manPrototype = Object.create(Person.prototype)
manPrototype.constructor = Man
Man.prototype = manPrototype

/**WorkerMan 继承自 Man */
function WorkerMan(name, age, job) {
  Man.call(this, name, age)
  this.job = job
}

const workerPrototype = Object.create(Man.prototype)
workerPrototype.constructor = WorkerMan
WorkerMan.prototype = workerPrototype

/** Woman 继承自 Person */
function WoMan(name, age) {
  Person.call(this, name, age)
  this.sex = 0
}

const womanPrototype = Object.create(Person.prototype)
womanPrototype.constructor = WoMan
WoMan.prototype = womanPrototype
/**
 * 继承关系图
 *           Person
 *          /       \
 *         /         \
 *        Man       WoMan
 *         |
 *         |
 *      WorkerMan
 */

const w1 = new WorkerMan('w1', 24, '程序员')
const m1 = new Man('m1', 18)
const wm1 = new WoMan('wm1', 19)
const p1 = new Person('p1', 43)

console.log(w1, m1, wm1, p1)
w1.sayName()
m1.sayName()
wm1.sayName()
p1.sayName()

console.log('w1 myInstanceof WorkerMan', myInstanceOf(w1, WorkerMan))
console.log('w1 instanceof WorkerMan', w1 instanceof WorkerMan)
console.log('w1 myInstanceof WoMan', myInstanceOf(w1, WoMan))
console.log('w1 instanceof WoMan', w1 instanceof WoMan)
console.log('w1 myInstanceof Man', myInstanceOf(w1, Man))
console.log('w1 instanceof Man', w1 instanceof Man)
console.log('w1 myInstanceof Person', myInstanceOf(w1, Person))
console.log('w1 instanceof Person', w1 instanceof Person)
console.log('wm1 myInstanceof WorkerMan', myInstanceOf(wm1, WorkerMan))
console.log('wm1 instanceof WorkerMan', wm1 instanceof WorkerMan)
console.log('wm1 myInstanceof WoMan', myInstanceOf(wm1, WoMan))
console.log('wm1 instanceof WoMan', wm1 instanceof WoMan)
console.log('wm1 myInstanceof Man', myInstanceOf(wm1, Man))
console.log('wm1 instanceof Man', wm1 instanceof Man)
console.log('wm1 myInstanceof Person', myInstanceOf(wm1, Person))
console.log('wm1 instanceof Person', wm1 instanceof Person)
console.log('m1 myInstanceof WorkerMan', myInstanceOf(m1, WorkerMan))
console.log('m1 instanceof WorkerMan', m1 instanceof WorkerMan)
console.log('m1 myInstanceof WoMan', myInstanceOf(m1, WoMan))
console.log('m1 instanceof WoMan', m1 instanceof WoMan)
console.log('m1 myInstanceof Man', myInstanceOf(m1, Man))
console.log('m1 instanceof Man', m1 instanceof Man)
console.log('m1 myInstanceof Person', myInstanceOf(m1, Person))
console.log('m1 instanceof Person', m1 instanceof Person)
console.log('p1 myInstanceof WorkerMan', myInstanceOf(p1, WorkerMan))
console.log('p1 instanceof WorkerMan', p1 instanceof WorkerMan)
console.log('p1 myInstanceof WoMan', myInstanceOf(p1, WoMan))
console.log('p1 instanceof WoMan', p1 instanceof WoMan)
console.log('p1 myInstanceof Man', myInstanceOf(p1, Man))
console.log('p1 instanceof Man', p1 instanceof Man)
console.log('p1 myInstanceof Person', myInstanceOf(p1, Person))
console.log('p1 instanceof Person', p1 instanceof Person)

