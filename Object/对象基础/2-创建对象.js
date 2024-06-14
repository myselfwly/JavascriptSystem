//1. 工厂模式
function createPerson(name, age, job) {
  const o = new Object()
  o.age = age
  o.name = name
  o.job = job
  o.sayName = function () {
    console.log(o.name);
  }
  return o
}

// let p1 = createPerson('小明', 18, "学生")
// let p2 = createPerson("大明", 43, "爸爸")
// p1.sayName()
// p1.name = "小小明"
// p1.sayName()
// p2.sayName()
// console.log(p1);
// 无对象标识

// 2. 构造函数模式
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name);
  }
}

let p1 = new Person('小明', 18, "学生")
let p2 = new Person("大明", 43, "爸爸")


p1.sayName()
p1.name = "小小明"
p1.sayName()
p2.sayName()
console.log(p1);
// 这里手写个new关键字实现逻辑吧

let pn = new Person('dm', 22, "拔毛")
let pln = Object.create({})
Person.call(pln, 'dm', 22, "拔毛")
console.log(pn);
console.log(pln);
pn.sayName()
pln.sayName()
// sayName 本质一样，但是多次赋值，每声明一个对象就创建一次

// 3. 原型模式

function PersonProtoModule() { }
PersonProtoModule.prototype.name = "dd"
PersonProtoModule.prototype.age = 11
PersonProtoModule.prototype.job = "学生"
PersonProtoModule.prototype.friends = ['1', '2']
PersonProtoModule.prototype.sayName = function () {
  console.log(this.name);
}

const pp = new PersonProtoModule()
const pp1 = new PersonProtoModule()

console.log(pp);
console.log(pp1);
pp.sayName()
pp.name = "pp"
pp.sayName()
console.log(pp.friends);
console.log(pp1.friends);
pp.friends.push("5")
console.log(pp.friends);
console.log(pp1.friends);
// 引用类型会共享
