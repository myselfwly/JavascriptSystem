// 组合继承又叫伪经典继承
// 由于原型链继承存在引用属性的共享问题
// 派生了盗用构造器函数的继承模式
// 但是盗用构造器函数模式的继承，又丢失了继承类型的原型属性
// 那么可以扬长避短，组合两者优点就有了组合继承
function SuperType() {
  this.property = true
  this.colors = ['1', '2',]
}

//SuperType的原型上添加getSuperValue方法 
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  SuperType.call(this)//第一次执行
  this.subProperty = false
}
SubType.prototype = new SuperType()//第二次执行
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

//
function SuperType() {
  this.property = true
  this.colors = ['1', '2',]
}

//SuperType的原型上添加getSuperValue方法 
SuperType.prototype.getSuperValue = function () {
  return this.property
}
function SubType() {
  SuperType.call(this)//第一次执行
  this.subProperty = false
}
SubType.prototype = new SuperType()//第二次执行
SubType.prototype.getSubProperty = function () {
  return this.subProperty
}

let i1 = new SubType()
// new 执行过程
// 1. 创建空对象 newInstance
// 2. newInstance的[[Prototype]] 指向 SubType.prototype
// 3. 执行SubType.call(newInstance)
//    3.1 若无返回值则之行结束
//    3.2 若有返回值
//      3.2.1 若返回值为原始类型则执行结束
//      3.2.2 若返回值为非原始类型则将返回值赋值给newInstance