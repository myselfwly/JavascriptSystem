/**
 *
 * @param {Function} ct
 * @param {*[]} args
 */
function myNew(ct, args) {
  if (typeof ct !== 'function') {
    throw new Error('ct must be a function')
  }
  const o = new Object()
  if (Object(ct.prototype) === ct.prototype) {
    Object.setPrototypeOf(o, ct.prototype)
  }
  const res = ct.apply(o, args)
  if (Object(res) === res) {
    return res
  } else {
    return o
  }
}

