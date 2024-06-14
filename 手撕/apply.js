/**
 * apply 手撕
 * @param {*} self this指向 （基本类型会转成对象，null和undefined会指向全局）
 * @param {...any} args 参数
 * @returns {*} 返回值
 */
function myApply(self, ...args) {
  if (
    (typeof self === 'object' && self === null) ||
    typeof self === 'undefined'
  ) {
    self = window || global
  } else {
    self = Object(self)
  }
  const fnKey = Symbol('myApply')
  const fn = this
  self[fnKey] = fn
  const res = self[fnKey](...args)
  Reflect.deleteProperty(self, fnKey)
  return res
}

Function.prototype.myApply = myApply

