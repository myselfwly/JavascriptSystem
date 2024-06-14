/**
 * 数据类型
 * 1. 基本数据类型
 *  a. String 
 *  b. Number
 *  c. Boolean
 *  d. Undefined
 *  f. Null
 *  g. Symbol
 *  h. BigInt
 * 2. 引用类型（数据结构，严格意义来说引用类型只有Object）
 *  a. Object
 *  b. Function
 *  c. Array
 *  d. Map
 *  e. Set
 *  f. WeakMap
 *  g. WeakSet
 */
// 1-a String
const str1 = 'string1'
const str2 = "string2"
const str3 = `string3`
const str4 = new String("")

console.log("str1  ",typeof str1) // string
console.log("str2  ",typeof str2) // string
console.log("str3  ",typeof str3) // string
console.log("str4  ", typeof str4) // object

// 1-b Number
const num1 = 123
const num2 = new Number(123)

console.log("num1  ",typeof num1) // number
console.log("num2  ", typeof num2) // object

// 1-c Boolean
const boo1 = false
const boo2 = true
const boo3 = new Boolean(true)
const boo4 = new Boolean(false)

console.log("boo1  ",typeof boo1); // boolean
console.log("boo2  ",typeof boo2); // boolean
console.log("boo3  ",typeof boo3); // object
console.log("boo4  ", typeof boo4); // object

// 1-d Undefined
const und1 = undefined
const und2 = void 0

console.log("und1  ", typeof und1); // undefined
console.log("und2  ", typeof und2); // undefined

// 1-e Null
const nul1 = null

console.log("nul1  ", typeof nul1); // object

// 1-f Symbol
const sym1 = Symbol('sym')

console.log("sym1  ", typeof sym1) // symbol

// 1-g Bigint
const big1 = BigInt(123)
const big2 = 10n

console.log("big1  ", typeof big1) // bigint
console.log("big2  ", typeof big2) // bigint

// 2-a Object
const obj1 = {}
const obj2 = new Object()
const obj3 = Object.create(obj1)

console.dir("obj1  ", obj1);
console.dir("obj2  ", obj2)
console.dir("obj3  ", obj3)

// 2-b Function
const fun1 = new Function("b", 'const a = 123; return a + b',)
const fun2 = function () { }
function fun3() { }
const fun4 = () => { }

console.dir("fun1  ",fun1)
console.dir("fun2  ",fun2)
console.dir("fun3  ",fun3)
console.dir("fun4  ", fun4)

// 2-c Array
const arr1 = []
const arr2 = new Array(10)

console.dir("arr1  ", arr1)
console.dir("arr2  ", arr2)

// 2-d Map
const map1 = new Map([[obj1, "obj1"]])
const map2 = new Map()
map2.set(2, "obj2")

console.dir("map1  ", map1)
console.dir("map2 ", map2)

// 2-e Set
const set1 = new Set([1, '2', obj1])
const set2 = new Set()
set2.add(obj2)

console.dir("set1  ", set1)
console.dir("set2  ", set2)

// 2-f WeakMap
const wem1 = new WeakMap([[obj1, obj2]])
const wem2 = new WeakMap()
wem2.set(obj2, obj1)

console.dir("wem1  ", wem1)
console.dir("wem2  ", wem2)

// 2-g WeakSet
const wes1 = new WeakSet([obj1, obj2])
const wes2 = new WeakSet()
wes2.add(obj2)

console.dir("wes1  ", wes1)
console.dir("wes2  ", wes2)


