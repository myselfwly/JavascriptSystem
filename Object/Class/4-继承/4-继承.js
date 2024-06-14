// 1. 继承基础
class Vehicle { }
// 继承类
class Bus extends Vehicle { }
let b = new Bus()
console.log(b instanceof Bus);
console.log(b instanceof Vehicle);
// 继承普通的构造函数
function Person() { }
class Engineer extends Person { }
let e = new Engineer()

console.log(e instanceof Person);
console.log(e instanceof Engineer);

class Animal {
  sayPrototype(name) {
    console.log(name, this);
  }
  static sayClassProperty(name) {
    console.log(name, this);
  }
}

class Pig extends Animal {
  constructor() {
    super()
  }
}

let a = new Animal()
let p = new Pig()

a.sayPrototype('a')
p.sayPrototype('p')
Animal.sayClassProperty('aa')
Pig.sayClassProperty('pp')
// super 关键字
// 不能在非继承类中使用
class Book {
  constructor() {
    this.pageSize = 'A4'
  }
  static readBook() {
    console.log('read book');
  }
}
class HistoryBook extends Book {
  constructor() {
    // 在super之前不能使用this
    super(); // 相当于super.constructor()
    console.log(this instanceof Book);
    console.log(this);
  }
  static readBook() {
    // 调用父类的readBook
    super.readBook()
  }
}

let hb = new HistoryBook()
HistoryBook.readBook()
/**
 * 1. super 只能在构造函数和静态方法中使用
 * 2. 不能单独使用super 要么super() 要么super.foo()
 * 3. super() 可传参
 * 4. super() 使用之前不可使用this
 * 5. 无构造函数自动执行super
 * 6. 派生类显示定义了 constructor 要么使用super() 要么不使用super() 返回 一个对象
 */

// 抽象基类
// 抽象基类是什么，就是可以用来继承但不能用来实例化的类
class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error("Abstract 不能用来实例化")
    }
    if (!this.foo) {
      throw new Error("实例对象必须存在 foo() 方法")
    }
    this.isAbstract = true
  }
}



class ClassNew extends Abstract {
  constructor() {
    super();
    this.boo = true
  }
  foo() { }
}
let cn = new ClassNew()
console.log(cn);
class NewClass extends Abstract {
  constructor() {
    super()
    this.isObj = true
  }
}
// let nc = new NewClass()
// console.log(nc);

// let ab = new Abstract()

// 继承内置类型
class SuperArray extends Array {
  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]
    }
  }
}

let sa = new SuperArray(1, 2, 3, 4, 5, 6)
console.log(sa);
sa.shuffle()
console.log(sa);
let sa2 = sa.filter(it => !!(it % 2))
console.log(sa2);
console.log(sa instanceof SuperArray);
console.log(sa2 instanceof SuperArray);

class AnotherArray extends Array {
  static get [Symbol.species]() {
    return Array
  }
}

let aa = new AnotherArray(1, 2, 3, 4, 5, 6)
let aa1 = aa.filter(it => !!(it % 2))

console.log(aa);
console.log(aa1);
console.log(aa instanceof AnotherArray);
console.log(aa1 instanceof AnotherArray);
//混入类

class RootClass {
  root() {
    console.log('root');
  }
}

function grandClass(rootClass) {
  return class extends rootClass {
    grand() {
      console.log('grand');
    }
  }
}
function fatherClass(grandClass) {
  return class extends grandClass {
    fath() {
      console.log('father');
    }
  }
}
function selfClass(fatherClass) {
  return class extends fatherClass {
    self() {
      console.log('self');
    }
  }
}

class SonClass extends selfClass(fatherClass(grandClass(RootClass))) {
  son() {
    console.log('son');
  }
}

let son = new SonClass()

console.log(son instanceof RootClass);
console.log(son);
son.son()
son.self()
son.fath()
son.grand()
son.root()