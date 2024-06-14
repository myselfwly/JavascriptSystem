/**声明 */
var str1 = 'str1'
var str2 = 'str2'
var str3 = `str3`
var str4 = new String('str4')

/**方法 */
// 1. 迭代协议([@@iterator]())
// 可迭代
var [s1, s2] = str1
console.log(s1, s2)
for (const iterator of str2) {
  console.log(iterator)
}

// 2. at
var tempFoo = function (...args) {
  console.dir(args[0])
  return '123'
}
var tempStr = tempFoo`abcdefg${str1}  ${str2}hijk${str3}${str4}`
console.log(tempStr)
