function myCall(self, ...args) {
  if (
    (typeof self === 'object' && self === null) ||
    typeof self === 'undefined'
  ) {
    self = window || global
  } else {
    self = Object(self)
  }
  const fn = this
  const fnKey = Symbol('myCall')
  self[fnKey] = fn
  const res = self[fnKey](...args)
  Reflect.deleteProperty(self, fnKey)
  return res
}

Function.prototype.myCall = myCall

