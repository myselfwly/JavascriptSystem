function new_instanceof(L, R) {
  const voidR = R.prototype
  let curPrototype = L.__proto__
  while (true) {
    if (curPrototype === voidR) return true
    if (curPrototype === null) return false
    curPrototype = curPrototype.__proto__
  }
}
