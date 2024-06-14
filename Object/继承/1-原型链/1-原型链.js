/**
 * 祖先构造函数
 * 属性 property = true
 */
function SuperType() {
  this.property = true
  this.colors = ['1', '2',]
}

/**SuperType的原型上添加getSuperValue方法 */
SuperType.prototype.getSuperValue = function () {
  return this.property
}

function SubType() {
  this.subProperty = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubProperty = function () {
  return this.subProperty
}
SubType.prototype.constructor = SubType
let instance = new SubType()
console.log('instance', instance);
console.log('super', instance.getSuperValue())
console.log('sub', instance.getSubProperty())
console.log(instance.constructor);

let instance1 = new SubType()

instance1.colors.push('black')
console.log(instance);
console.log(instance.colors);
console.log(instance1.colors);
console.log(instance instanceof SubType);
console.log(instance instanceof Object);
console.log(instance instanceof SuperType);
console.log(SuperType.prototype.isPrototypeOf(instance));
console.log(SubType.prototype.isPrototypeOf(instance));
console.log(Object.prototype.isPrototypeOf(instance));
// 问题：引用属性共享





function Root() {
  this.r = "0"
}

function Ch1() {
  this.c = "1_1"
}
Ch1.prototype = new Root()
Ch1.constructor = Ch1
function Ch1Ch1() {
  this.chch = "1_1-1"
}
Ch1Ch1.prototype = new Ch1()
Ch1Ch1.constructor = Ch1Ch1
function Ch2() {
  this.c = "1_2"
}
Ch2.prototype = new Root()
Ch2.constructor = Ch2

var ch1 = new Ch1()
var ch2 = new Ch2()