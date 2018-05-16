<template>
  <p class="num" :class="className">{{showNum}}</p>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      startNum: {
        type: Number
      },
      endNum: {
        type: Number
      },
      duration: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        activeNum: 0,  // 当前滚动中的数值
        countTimeout: 0,
        isCounting: false
      }
    },
    methods: {
      start () {
        this.isCounting = true
        this.activeNum = this.startNum
        let to = parseFloat(this.endNum)
        let from = parseFloat(this.startNum)
        clearTimeout(this.countTimeout)

        if (to === from) {
          return
        }
        this._countUp(from, to)
      },
      _countUp (from, to) {
        this.endNum = to
        let diff = to - from

        this.activeNum = from
        let timeInterval = parseInt(this.duration / 30)
        let numInterval = diff / timeInterval
        let remain = diff % numInterval

        let tick = () => {
          this.activeNum += numInterval
          if (remain !== 0) {
            // 有余数的情况
            if ((this.activeNum < to - remain && from < to) ||
              (this.activeNum > to - remain && from > to)) {
              this.countTimeout = setTimeout(() => {
                tick()
              }, 30)
            } else {
              this.countTimeout = setTimeout(() => {
                this.activeNum = to
              }, 30)
            }
            return
          }
          if (this.activeNum < to) {
            this.countTimeout = setTimeout(() => {
              tick()
            }, 30)
          }
        }
        tick()
      }
    },
    computed: {
      showNum () {
        if (!this.isCounting) {
          return this.startNum
        }
        let result = 0
        let origin = this.activeNum
        let target = this.endNum
        let decimalLength = 0
        if ((target + '').match(/\./)) {
          // 获取目标值小数位数
          decimalLength = target.toString().split('.')[1].length || 0
        }
        if (decimalLength === 0) {
          // 目标数字没有小数
          result = parseInt(origin)
        } else {
          result = origin.toFixed(decimalLength)
        }
        return result
      }
    },
    created () {

    }
  }
</script>

<style lang="scss" scoped>

</style>
