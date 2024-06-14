// 由于模拟类似类定义的代码会有各种问题，对应有各种解决方法，倒是代码冗余
// ECMAScript 6 新出炉了 class 语法糖（关键字）来解决这些问题
// 表面上是面向对象的编程，实际上还是构造函数和原型的概念

class Person { }

const Person = class { }

// 与函数区别
// 1. 不能变量提升
// 2. 收到块作用域的限制

// 类的构成
// 1. 空类定义
class Foo { }

// 2. 有构造函数类
class Bar {
  constructor() { }
}

// 3. 有获取函数类

class Baz {
  get myBaz() { }
}

// 4. 有静态方法类

class Qux {
  static myQux() { }
}
