// Promise 化
function promisify (fn) {
  return function (arg = {}) {
    return new Promise((resolve, reject) => {
      fn(Object.assign({}, {
        success: resolve,
        fail: reject
      }, arg))
    })
  }
}
Promise.prototype.finally = function (callback) { // eslint-disable-line no-extend-native
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

// 正则匹配
function matchRegular (type, str) {
  let reg = ''
  if (type === 'chinese') { // 匹配中文字符
    reg = /[\u4e00-\u9fa5]/gm
  } else if (type === 'email') { // 匹配email地址
    reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  } else if (type === 'url') { // 匹配URL地址
    reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
  } else if (type === 'phoneNumber') { // 匹配手机号码
    reg = /^1\d{10}$/
  } else if (type === 'cardid') { // 匹配身份证号
    reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  } else if (type === 'mail') { // 匹配邮编号
    reg = /^[1-9]\d{5}(?!\d)$/
  }
  return reg.test(str)
}

function formatTime (ms, fmt) {
  let date = new Date(ms)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds(), // 毫秒
    'A': (function () {
      if (date.getHours() <= 12) {
        return '上午' + date.getHours()
      } else {
        return '下午' + (date.getHours() - 12)
      }
    })()
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

function isEmpty (value) {
  if (!value) {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (typeof value === 'object' && JSON.stringify(value) === '{}') {
    return true
  }
  return false
}

export {
  promisify,
  matchRegular,
  formatTime,
  isEmpty
}
