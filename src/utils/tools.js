function promisify (fn) {
  return function (arg = {}) {
    return new Promise((resolve, reject) => {
      arg.success = function (res) {
        resolve(res)
      }
      arg.fail = function (err) {
        reject(err)
      }
      fn(arg)
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

export {
  promisify
}
