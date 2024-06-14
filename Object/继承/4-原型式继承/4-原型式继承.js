// 原型式继承
// 以现有对象为原型创造一个新的实例
// 其实是浅复制一份对象

function object(o) {
  function F() { }
  F.prototype = o
  return new F()
}

let person = {
  name: 'name',
  age: 18,
  friends: [1, 2]
}

const anotherPerson = object(person)

console.log(anotherPerson.friends);

const anotherPerson1 = object(person)
anotherPerson1.friends.push(5)
console.log(anotherPerson.friends);

console.log(anotherPerson1.friends);

// 后来ES5 实现了原型式继承 Object.create()

const finallyPerson = Object.create(person)

console.log(finallyPerson);
console.log(finallyPerson.friends);

// 浅复制其实和原型链继承存在同样的问题 引用类型数据的共享问题，当然需要共享的时候就不是问题
// 同样原型式继承没有对象标识