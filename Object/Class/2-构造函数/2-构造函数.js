// 类中的构造函数

class Animal {

}

class Person {
  constructor() {
    console.log('person ctor');
  }
}

class Vegetable {
  constructor() {
    this.color = 'blue'
  }
}

let a = new Animal()

let p = new Person

let v = new Vegetable()

console.log(a, p, v);
console.log(v.color);

// new 操作符在 3-组合继承 中所描述执行一样

class Person1 {
  constructor(overwrite) {
    this.name = "hhhh"
    if (overwrite) {
      return {
        baz: overwrite
      }
    }
  }
}

const p1 = new Person1()
const p2 = new Person1(true)

console.log(p1)
console.log(p2);
console.log(p1 instanceof Person1);
console.log(p2 instanceof Person1); // 和Person1 无关联

function Test() {
  this.aaa = "Test"
}

class TestClass {
  constructor() {
    this.aaa = "Test"
  }
}

let tf = Test()
// let tc = TestClass() // 必须使用new

// class 内部实现
function Test2() {
  if (!new.target) {
    throw Error("TypeError: Class constructor TestClass cannot be invoked without 'new'")
  }

  this.aaa = "Test"
}

let tf2 = Test2()

