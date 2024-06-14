/**
 * @param {*} self this指向 （基本类型会转成对象，null和undefined会指向全局）
 * @param {...any} args 参数
 * @returns {Function} 返回值
 */
function myBind(self, ...args) {
  if (
    (typeof self === 'object' && self === null) ||
    typeof self === 'undefined'
  ) {
    self = window || global
  } else {
    self = Object(self)
  }
  const fn = this
  return function () {
    const params = [...arguments]
    return fn.apply(self, args.concat(params))
  }
}

Function.prototype.myBind = myBind

