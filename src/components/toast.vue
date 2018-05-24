<template>
  <div class="my-toast"
    :class="[showClass, positionClass, className]">
    {{text}}
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        text: '',
        position: '',
        show: false
      }
    },

    computed: {
      showClass () {
        if (this.show) {
          return 'show'
        }
        return ''
      },
      positionClass () {
        let p = this.position
        if (p === 'middle' || p === 'top' || p === 'bottom') {
          return p
        }
        // 默认position为bottom
        return 'bottom'
      }
    },

    methods: {
      toast (text) {
        // 重置position
        this.position = ''
        let duration = 3000
        if (typeof (text) === 'string') {
          this.text = text
        }
        if (typeof (text) === 'object') {
          this.text = text.text
          if (typeof (text.duration) === 'number') {
            duration = text.duration
          }
          if (typeof (text.position) === 'string') {
            this.position = text.position
          }
        }
        this.show = true
        // 清除上次toast的定时关闭
        clearTimeout(this.timeout || 0)

        this.timeout = setTimeout(() => {
          this.show = false
        }, duration)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-toast{
    position: fixed;
    display: none;
    top: 45%;
    left: 50%;
    padding: 6rpx 26rpx;
    max-width: 70%;
    font-size: 24rpx;
    line-height: 1.6;
    text-align: center;
    word-wrap:break-word;
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10rpx;
    transform: translate(-50%, -50%);
    animation: toast-middle 500ms;
    z-index: 9;
    &.show{
      display: block;
    }
    &.top{
      top: 3%;
      transform: translate(-50%, 0);
      animation: toast 500ms;
    }
    &.bottom{
      bottom: 5%;
      top: auto;
      transform: translate(-50%, 0);
      animation: toast-bottom 500ms;
    }
  }

  @keyframes toast-middle {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes toast {
    from {
      opacity: 0;
      transform: translate(-50%, -10%);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes toast-bottom {
    from {
      opacity: 0;
      transform: translate(-50%, 10%);
    }
    to {
      opacity: 1;
    }
  }
</style>
