//创建对象
const obj = { a: 1 }
const obj1 = new Object({ a: 1 })
const obj2 = new Object()
obj2.a = 1

//对象属性描述符
console.log(Object.getOwnPropertyDescriptors(obj));

//设置属性描述符
//1. 设置属性值
Object.defineProperty(obj, 'a', {
  value: 3
})
console.log(obj);
//2. 设置属性可写状态
Object.defineProperty(obj, 'a', { writable: false })
obj.a = 4;
//直接使用点的方法不可更改
console.log('a=4', obj);
Object.defineProperty(obj, 'a', { value: 5 })
//使用属性描述福方法可以修改
console.log('a=5', obj);

//3. 涉足属性的可枚举状态
// 可枚举时
console.log('可枚举');
console.log(obj)
console.log(Object.keys(obj))
for (const key in obj) {
  console.log(key);
}

Object.defineProperty(obj, 'a', { enumerable: false })
// 不可枚举时
console.log('不可枚举');
console.log(obj)
console.log(Object.keys(obj))
for (const key in obj) {
  console.log(key);
}
//4. 设置可配置属性
// 可设置
Object.defineProperty(obj, 'a', { enumerable: true })
console.log("可设置", Object.keys(obj))
// 不可设置
/* Object.defineProperty(obj, 'a', { enumerable: false })
Object.defineProperty(obj, 'a', { configurable: false })
Object.defineProperty(obj, 'a', { enumerable: true })
console.log("不可设置", Object.keys(obj)) */

//5. 设置get方法
console.log(obj1, obj1.a)
Object.defineProperty(obj1, 'a', {
  get() {
    return 'aaaaa'
  }
})
console.log(obj1, obj1.a);
//6。 设置set方法
let a = 1
Object.defineProperty(obj2, 'a', {
  get() {
    return a
  },
  set() {
    a = 123
  }
})
obj2.a = 1234
console.log(obj2, obj2.a);

// 合并对象
const obj_cur = {}
const obj_pre = { a: 1, b: 2, c: 3 }

const res = Object.assign(obj_cur, obj_pre)
console.log('res', res);
console.log("obj_cur", obj_cur);
console.log("obj_pre", obj_pre);
console.log('res === obj_cur', res === obj_cur);
console.log('res === obj_pre', res === obj_pre);
console.log("obj_cur === obj_pre", obj_cur === obj_pre);

const testObj = {
  /**
   * @param {number} x
   */
  set id(x) {
    console.log(x);
  },
  get id() {
    return "7788"
  }
}
testObj.id = 5
console.log(testObj.id);