<template>
  <div class="my-popup"
    :style="{'display': componentDisplay}"
    :class="className">
    <div class="content"
        :class="contentClass"
        @transitionend="transitionEnd">
      <slot></slot>
      <!-- 由于mpvue的问题，slot的作用域还是在这个组件内。所以暂时不支持动态渲染。 -->
    </div>
    <div class="mask"
      @tap="toggle('hide')"
      :class="maskClass"
      :style="{backgroundColor: maskColor}"></div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'center'
      },
      maskColor: {
        type: String,
        default: 'rgba(0,0,0,0.7)'
      },
      duration: {
        type: Number,
        default: 0
      },
      className: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        text: '',
        show: false,
        componentDisplay: 'none',
        contentClass: '',
        maskClass: ''
      }
    },

    watch: {
      show (val, oldVal) {
        let classList = [this.type]
        this.contentClass = this.type
        this.maskClass = ''
        let hasDuration = typeof (this.duration) === 'number' && this.duration > 0
        if (val) {
          // 为了与组件的display（componentDisplay）的赋值异步
          this.$nextTick(() => {
            classList.push('active')
            this.contentClass = classList.join(' ')  // 设置内容的class
            this.maskClass = 'active'           // 设置Mask的class
            if (hasDuration) {
              this.maskClass = 'none'
            }
          })
          // 设置duration，一段时间后自动关闭
          if (hasDuration) {
            if (this.hideTimeout) {
              clearTimeout(this.hideTimeout)
            }
            this.hideTimeout = setTimeout(() => {
              this.toggle('hide')
            }, this.duration)
          }
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './popup.scss';
</style>
