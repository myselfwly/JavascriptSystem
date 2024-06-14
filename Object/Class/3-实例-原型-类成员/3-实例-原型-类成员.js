// 1. 实例成员
class Person {
  constructor() {
    // 实例成员name 
    this.name = new String('Jack')
    // 实例成员 age 
    this.age = new Number(18)
    // 实例成员 friends
    this.friends = ['LiLei', 'WangGang']
    // 实例成员 sayName
    this.sayName = function () {
      console.log(this.name)
    }
  }
}

const p1 = new Person()

const p2 = new Person()

p1.sayName()
p2.sayName()

console.log(p1.name === p2.name);
console.log(p1.age === p2.age);
console.log(p1.friends === p2.friends);
p1.name = "QiQi"
p1.sayName()
p2.sayName()

console.log('-----Animal-----');
// 2. 原型成员

class Animal {
  constructor() {
    this.name_ = "Dog"
    // 构造器函数的this制定的属性会直接作用在实例上，实例成员
    this.locate = () => console.log('instance');
  }
  // 在构造器外，类块内定义的方法和属性会绑定在原型上
  locate() {
    console.log('prototype');
  }
  // 不能把数据作为值绑定给原型
  // sex: { woman: true }
  // 可定义getter 和 setter 
  get name() {
    return 'Animal--' + this.name_
  }
  set name(name) {
    return this.name_ = name
  }
}

let a = new Animal()
console.log(a);
console.log(Object.getPrototypeOf(a) === Animal.prototype);
a.locate()
Animal.prototype.locate()
console.log(a.name);

console.log('------Lei--------');
// 类成员
class Lei {
  constructor() {
    this.name = "Lei"
    this._name = this.name
    this.locate = () => console.log('instance', this);
  }
  locate() {
    console.log('prototype', this);
  }
  get name() {
    return "This is " + this._name
  }
  set name(name) {
    this._name = name
  }
  // 类成员--静态方法
  static locate() {
    console.log("class", this);
  }
  static a = 1
}

Lei.name = "Class--Lei"

let l = new Lei()

l.locate()

Lei.prototype.locate()

Lei.locate()

console.log(Lei.a, Lei.name);

console.log('----NewLei----');
// 迭代器与生成器方法
class NewLei {
  constructor() {
    this.names = ['a', 'b', 'c', 'd']
  }
  // 原型上的生成器
  *createNameList() {
    yield 'prototype 1'
    yield 'prototype 2'
    yield 'prototype 3'
  }
  // 类上的生成器
  static *createNameList() {
    yield 'NewLei 1'
    yield 'NewLei 2'
    yield 'NewLei 3'
  }
  // 迭代器，满足@iteratorable协议
  *[Symbol.iterator]() {
    yield* this.names.entries()
  }
}

let nl = new NewLei()
const iter = NewLei.createNameList()
console.log(iter.next().value);
console.log(iter.next().value);
console.log(iter.next().value);

const prototypeIter = NewLei.prototype.createNameList()

console.log(prototypeIter.next().value);
console.log(prototypeIter.next().value);
console.log(prototypeIter.next().value);

for (const [index, element] of nl) {
  console.log(index, element);
}
