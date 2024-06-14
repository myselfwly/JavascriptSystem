// //组合继承
// function SuperType() {
//   this.property = true
//   this.colors = ['1', '2',]
// }

// //SuperType的原型上添加getSuperValue方法
// SuperType.prototype.getSuperValue = function () {
//   return this.property
// }
// function SubType() {
//   SuperType.call(this)//第一次执行
//   // this 上存在 colors属性和property属性
//   this.subProperty = false
// }
// SubType.prototype = new SuperType()//第二次执行
// // 原型上存在colors属性和property属性
// // 属性重复
// SubType.prototype.getSubProperty = function () {
//   return this.subProperty
// }
// let instance = new SubType()

//寄生式组合继承
// 为了解决被继承类型执行两次
/**
 * 思路：
 * 1. 使用原型式承，新对象（newInstance）继承Super的prototype
 * 2. 使用寄生继承，将 newInstance 增强，设置constructor为SubType
 * 3. 将SubType的prototype设置为newInstance
 * 4. 使用盗用构造函数继承将SuperType的属性继承 // 只执行一次
 */

function SuperType() {
  this.property = true
  this.colors = ['1', '2']
}

//SuperType的原型上添加getSuperValue方法
SuperType.prototype.getSuperValue = function () {
  return this.property
}

function F(o) {
  const newInstance = Object.create(o)
  return newInstance
}

function createAnother(o, enhance, target) {
  // 1 增强
  for (const key in enhance) {
    const element = enhance[key]
    o[key] = element
  }
  // 2 原型式继承 创建原型对象
  const prototype = F(o)

  //3
  target.prototype = prototype
}

function SubType() {
  //4
  SuperType.call(this) //第一次执行
  // this 上存在 colors属性和property属性
  this.subProperty = false
}
SubType.prototype.getSubProperty = function () {
  return this.subProperty
}
createAnother(
  SuperType.prototype,
  {
    constructor: SubType
  },
  SubType
)

const instance = new SubType()
console.log(instance)
console.log(instance instanceof SubType)

