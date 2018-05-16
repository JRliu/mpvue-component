<template>
  <div class="my-popup"
    :style="{'display': componentDisplay}">
    <div class="content"
        :class="contentClass"
        @transitionend="transitionEnd">
      <slot></slot>
    </div>
    <div class="mask"
      @tap="toggle('hide')"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :class="maskClass"></div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'center'
      }
    },
    data () {
      return {
        text: '',
        show: false,
        componentDisplay: 'none',
        contentClass: '',
        maskClass: '',
        touchDotX: '',
        touchDotY: '',
        touchInterval: '',
        touchTime: ''
      }
    },
    computed: {

    },
    watch: {
      show (val, oldVal) {
        let classList = [this.type]
        this.contentClass = this.type
        this.maskClass = ''
        if (val) {
          // 为了与组件的display（componentDisplay）的赋值异步
          this.$nextTick(() => {
            classList.push('active')
            this.contentClass = classList.join(' ')
            this.maskClass = 'active'
          })
        }
      }
    },
    methods: {
      transitionEnd () {
        if (!this.show) {
          this.componentDisplay = 'none'
        }
      },
      toggle (type) {
        if (type === 'hide') {
          this.show = false
        } else if (type === 'show') {
          this.show = true
        } else {
          this.show = !this.show
        }

        if (this.show) {
          this.componentDisplay = 'block'
        }
      },
      touchStart: function (e) {
        // 记录touchstart的点坐标（左上角未原点）
        this.touchDotX = e.touches[0].pageX
        this.touchDotY = e.touches[0].pageY

        // 使用js计时器记录时间
        this.touchInterval = setInterval(function () {
          this.touchTime++
        }, 100)
      },
      // 触摸移动事件
      touchMove: function (e) {
        let touchMoveX = e.touches[0].pageX
        let touchMoveY = e.touches[0].pageY
        // 向左滑动
        if (touchMoveX - this.touchDotX <= -40 && this.touchTime < 10) {
          console.log('向左滑动')
          if (this.type === 'left') {
            this.toggle('hide')
          }
        }
        // 向右滑动
        if (touchMoveX - this.touchDotX >= 40 && this.touchTime < 10) {
          console.log('向右滑动')
          if (this.type === 'right') {
            this.toggle('hide')
          }
        }
        // 向上滑动
        if (this.touchDotY - touchMoveY >= 40 && this.touchTime < 10) {
          console.log('向上滑动')
          if (this.type === 'top') {
            this.toggle('hide')
          }
        }
        // 向下滑动
        if (touchMoveY - this.touchDotY >= 40 && this.touchTime < 10) {
          console.log('向下滑动')
          if (this.type === 'bottom') {
            this.toggle('hide')
          }
        }
      },
      // 触摸结束事件
      touchEnd: function (e) {
        clearInterval(this.touchInterval) // 清除setInterval
        this.touchTime = 0
      }

    }
  }
</script>

<style lang="scss" scoped>
  .my-popup{
    display: none;
  }
  .content{
    position: fixed;
    background-color: #fff;
    transition: all 0.3s ease;
    z-index: 99;
    &.center{
      top: 50%;
      left: 50%;
      transition: all 0.3s cubic-bezier(0,.39,.56,.58);
      transform: translate(-50%, -50%);
      opacity: 0;
      &.active{
        opacity: 1;
      }
    }
    &.top{
      top: 0;
      left: 0;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.active{
        transform: translate3d(0, 0, 0);
      }
    }
    &.bottom{
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translate3d(0, 100%, 0);
      &.active{
        transform: translate3d(0, 0, 0);
      }
    }
    &.left{
      top: 0;
      left: 0;
      height: 100%;
      transform: translate3d(-100%, 0, 0);
      &.active{
        transform: translate3d(0, 0, 0);
      }
    }
    &.right{
      top: 0;
      right: 0;
      height: 100%;
      transform: translate3d(100%, 0, 0);
      &.active{
        transform: translate3d(0, 0, 0);
      }
    }
  }
  .mask{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0,0,0,0.7);
    transition: all 0.3s ease;
    z-index: 98;
    &.active{
      opacity: 1;
    }
  }
</style>
