/**
 * 防抖函数
 * @param {Function} fn 防抖需要执行函数
 * @param {number} wait 防抖时间
 * @param {boolean} [immediate] 默认值true
 * @returns {Function} 生成的防抖函数
 */
function debounce(fn, wait = 800, immediate = true, last = true) {
  /**定时器 */
  let timer = null
  /**上一次触发的时间 */
  let preTime = 0
  return function () {
    /**参数 */
    const args = arguments
    /**this指向 */
    const self = this
    /**触发时间更新 */
    preTime = Date.now()
    //每次执行前都需要将timer清除，注意此处timer不为null 仅清除
    if (timer) clearTimeout(timer)
    /**首次立即执行的情况 */
    if (immediate) {
      // 下一次进来若时间在0 - wait之间timer都没有变成null 那么callNow就是false
      //若定时器不存在就是可以执行
      const callNow = !timer
      // 给timer赋值 等待 wait 时间后 timer会变成null
      timer = setTimeout(() => {
        timer = null
        //若 最后一次需要执行 并且上次执行时间和当前时间相差大于等于 wait 时间 就执行最后一次
        if (last && wait - (Date.now() - preTime) <= 0) {
          fn.apply(self, args)
        }
      }, wait)
      // 若callNow 为true则立即执行
      if (callNow) {
        fn.apply(self, args)
      }
    } else {
      // 非首次立即执行就普通定时器函数
      timer = setTimeout(() => {
        fn.apply(self, args)
      }, wait)
    }
  }
}

