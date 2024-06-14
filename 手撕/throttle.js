/**
 * 函数防抖
 * @param {Function} fn 需要节流的函数
 * @param {number} [wait = 800] 节流时间
 * @param {boolean} [immediate=true]
 * @param {boolean} [last=true] 最后一次是否执行
 * @returns 防抖过的函数
 */
function throttle(fn, wait = 800, immediate = true, last = true) {
  /**记录时间戳函数 */
  let timer = null
  /**记录上次执行时间 */
  let preTime = 0
  /**记录this */
  let self
  /**记录参数 */
  let args
  /** setTimeout 执行的函数 */
  function later() {
    /**最后一次执行完，若第一次不需要执行，把值设置成0 （跟第 31 行照应）*/
    preTime = immediate ? Date.now() : 0
    timer = null
    fn.apply(self, args)
    if (!timer) self = args = null
  }
  return function () {
    self = this
    args = arguments
    /**触发时间 */
    const nowTime = Date.now()
    //当第一次不执行， 并且 上一次执行时间为 0 ，把上次执行时间设置为当前时间，35行的remainTime 就是  wait
    if (!immediate && !preTime) {
      preTime = nowTime
    }
    // 计算剩余执行时间
    const remainTime = wait - (nowTime - preTime)
    // 剩余执行时间 大于 等待时间 说明现在时间比上一次执行时间要小，系统时间错误，剩余时间小于等于0就执行函数
    if (remainTime > wait || remainTime <= 0) {
      //计时器存在清除计时器
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      // 上一次执行时间设置为现在
      preTime = nowTime
      // 执行函数
      fn.apply(self, args)
    } else if (last && !timer && remainTime > 0) {
      // 若最后一次需要执行，并且timer不存在，并且剩余时间 大于 0 立即执行 later函数
      timer = setTimeout(later, remainTime)
    }
  }
}

