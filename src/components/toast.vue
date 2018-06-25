<template>
  <div class="app-toast">
    <div class="text"  v-if="type===''"
      :class="[showClass, positionClass, className]">
      {{text}}
    </div>
    <div class="text_icon"  v-else
      :class="[showClass, positionClass, className]">
      <div class="loader" v-if="type==='loading'"></div>
      <icon type='success' size='26' v-if="type==='success'" class='icon'></icon>
      <icon type='clear' size='26' v-if="type==='error'" color="#f14545" class='icon'></icon>
      <icon type='warn' size='26' v-if="type==='warn'" class='icon'></icon>
      {{text}}
    </div>
    <!-- <div class="text_icon"  v-if="type==='success'||type==='error'"
      :class="[showClass, positionClass, className]">
      <div class="loader"></div>
      {{text}}
    </div> -->
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
      type: '',
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
      if (typeof text === 'string') {
        this.text = text
      }
      if (typeof text === 'object') {
        this.text = text.text
        if (typeof text.duration === 'number') {
          duration = text.duration
        }
        if (typeof text.position === 'string') {
          this.position = text.position
        }
        this.type = text.type
        if (text.type && typeof text.type === 'string') {
          this.position = 'middle'
        }
      }
      this.show = true
      // 清除上次toast的定时关闭
      clearTimeout(this.timeout || 0)
      if (duration > 0) {
        this.timeout = setTimeout(() => {
          this.show = false
        }, duration)
      }
    },
    hide () {
      clearTimeout(this.timeout || 0)
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-toast {
  .text,
  .text_icon {
    position: fixed;
    display: none;
    top: 45%;
    left: 50%;
    padding: 6rpx 26rpx;
    max-width: 70%;
    font-size: 24rpx;
    line-height: 1.6;
    text-align: center;
    word-wrap: break-word;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10rpx;
    transform: translate(-50%, -50%);
    animation: toast-middle 500ms;
    z-index: 9;
    &.show {
      display: block;
    }
    &.top {
      top: 3%;
      transform: translate(-50%, 0);
      animation: toast 500ms;
    }
    &.bottom {
      bottom: 5%;
      top: auto;
      transform: translate(-50%, 0);
      animation: toast-bottom 500ms;
    }
  }
  .text_icon{
    max-width: 200rpx;
    padding: 14rpx  20rpx;
    animation: none;
    .loader{
      width: 50rpx;
      height: 50rpx;
      margin: 0rpx auto 10rpx;
      border: 6rpx solid #fff;
      border-top-color: #ff3366;
      border-radius: 50%;
      animation: btn-spin 0.8s linear  infinite;
    }
    .icon{
      display: block;
    }
  }
  @keyframes btn-spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
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
}
</style>
