//盗用构造函数又称对象伪装或经典继承
// 在原型链继承中最后存在一个问题，应用类型属性的共享问题无法解决，就出现了盗用构造函数的继承方法解决这个问题
// 问题分析
/* function SuperType() {
  this.property = true
  this.colors = ['1', '2',]
}

//SuperType的原型上添加getSuperValue方法 
 SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  this.subProperty = false
}
const subPrototype = new SuperType()
SubType.prototype = subPrototype
SubType.prototype.getSubProperty = function () {
  return this.subProperty
}
let instance = new SubType()
let instance1 = new SubType()
instance1.colors.push('black')
console.log(instance.colors);
console.log(instance1.colors); */
// SubType 的原型是 subPrototype 是一个内存单元的地址
// 实例instance的原型是SubType的原型 subPrototype
// 实例instance1 的原型是SubType的原型 subPrototype
// 实例都指向同一内存单元操作的也是同一个对象造成医用类型的共享

//解决，让每一个实例的原型指向不同内存单元，即，每一个实例都会创建一个原型

function SuperType() {
  this.property = true
  this.colors = ['1', '2',]
}

//SuperType的原型上添加getSuperValue方法 
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  SuperType.call(this)
  this.subProperty = false
}
SubType.prototype.getSubProperty = function () {
  return this.subProperty
}
let instance = new SubType()
let instance1 = new SubType()
instance1.colors.push('black')
console.log(instance.colors);
console.log(instance1.colors);
console.log(instance.getSuperValue());//访问不到SuperType的prototype的属性
console.log(instance instanceof SubType);
console.log(instance instanceof SuperType);
console.log(instance instanceof Object);
console.log(SuperType.prototype.isPrototypeOf(instance));
console.log(SubType.prototype.isPrototypeOf(instance));
console.log(Object.prototype.isPrototypeOf(instance));

// 问题：盗用构造函数存在无法继承被继承属性的原型