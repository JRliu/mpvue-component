<template>
  <p class="my_count_to" :class="className">{{showNum}}</p>
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
      },
      switch: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        activeNum: 0,  // 当前滚动中的数值
        countTimeout: 0
      }
    },
    methods: {
      start () {
        this.activeNum = this.startNum
        clearTimeout(this.countTimeout)

        this._countUp(this.startNum, this.endNum)
      },
      _countUp (ofrom, oto) {
        if (!this.switch) {
          return
        }
        let from = parseFloat(ofrom)
        let to = parseFloat(oto)
        if (from === to) {
          return
        }
        this.activeNum = from
        let diff = to - from // 开始与结束的差值
        let stepNum = parseInt(this.duration / 30) // 步数 = 总时间/每步时间
        let numInterval = diff / stepNum // 每步间隔数值
        let remain = diff % numInterval // 余数
        let maxMultiple = to - remain

        let tick = () => {
          this.activeNum += numInterval
          // 先忽视余数
          if ((this.activeNum < maxMultiple && from < to) ||
            (this.activeNum > maxMultiple && from > to)) {
            this.countTimeout = setTimeout(() => {
              tick()
            }, 30)
          } else if (remain !== 0) {
            // 不能整除的话增加一步
            // 最后一步直接将结束值赋值给activeNum
            this.countTimeout = setTimeout(() => {
              this.activeNum = to
            }, 30)
          }
        }
        tick()
      }
    },
    computed: {
      showNum () {
        if (!this.switch) { // 关闭动画的话，直接返回结束值
          return this.endNum
        }
        let result = 0
        let decimalLength = 0
        let origin = parseFloat(this.activeNum)
        let target = this.endNum
        if ((target + '').match(/\./)) {
          // 获取结束值小数位数
          decimalLength = target.toString().split('.')[1].length || 0
        }
        if (decimalLength === 0) {
          // 结束值没有小数
          result = parseInt(origin)
        } else {
          result = origin.toFixed(decimalLength) // 跟结束值一样的小数位数
        }
        return result
      }
    },
    watch: {
      endNum (val, oldVal) { // 多次设置endNum的情况
        if (this.switch) { // 已开启
          clearTimeout(this.countTimeout)
          this._countUp(this.activeNum, val)
        }
      }
    },
    created () {
      this.start()
    }
  }
</script>
