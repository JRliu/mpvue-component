<template>
  <div class="app-count_down">{{text}}</div>
</template>
<script>
export default {
  props: {
    start: {
      type: Number
    }
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    text () {
      return this.formatRemainTime(this.active)
    }
  },
  methods: {
    countDown () {
      if (this.active === 0) {
        this.active = this.start
      }
      let _this = this
      ;(function tick () {
        setTimeout(() => {
          if (_this.active > 1000) {
            _this.active -= 1000
          } else {
            _this.active = 0
            _this.complete()
          }
          if (_this.active > 0) {
            tick()
          }
        }, 1000)
      })()
    },
    // 倒计时完成的回调
    complete () {
      console.log('complete')
    },
    formatRemainTime (ms) {
      var t = ms // 时间差
      var d = 0
      var h = 0
      var m = 0
      var s = 0
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24)
        h = Math.floor(t / 1000 / 60 / 60 % 24)
        m = Math.floor(t / 1000 / 60 % 60)
        s = Math.floor(t / 1000 % 60)
      };
      return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒'
    }
  },
  mounted () {
    this.countDown()
  }
}

class Animal {
  constructor (name) {
    this.name = name
    this.stomach = []
  }
  eat (o) {
    console.log(this.name + ' eat ' + o)
    this.stomach.push(o)
  }
}
console.log(Animal)
</script>
<style lang="scss" scoped>

</style>
