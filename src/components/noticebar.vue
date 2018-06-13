<template>
  <div class="my-noticebar" :class='[className, id]' :style='{display: display}'>
    <div class="wrap"  :style='{textAlign: textAlign}'>
      <p class="text" :style='{marginLeft: -textMarginLeft + "px"}'>{{msg}}</p>
      <p class="text" :style='{display: shadowTextDisplay}'>{{msg}}</p>
    </div>
    <div class="close"  @click="close"  v-if="canClose">
      <icon type="clear" size="15"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String
      },
      className: {
        type: String
      },
      canClose: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        textMarginLeft: 0,
        shadowTextDisplay: 'none',
        textAlign: 'center',
        id: 'noticebar-' + parseInt(Math.random() * 100000000),
        display: 'block'
      }
    },
    methods: {
      startScroll (arg) {
        setInterval(this.scrollTick.bind(this, arg), 40)
      },
      scrollTick (arg) {
        let textWidth = arg.textWidth
        let marginLeft = this.textMarginLeft || 0
        if (marginLeft >= textWidth) {
          marginLeft = 0
        } else {
          marginLeft++
        }
        this.textMarginLeft = marginLeft
      },
      close () {
        this.display = 'none'
      }
    },
    async mounted () {
      let textWidth = 0
      let wrapWidth = 0
      let _this = this
      let getSize = (selector) => {
        return new Promise((resolve) => {
          wx.createSelectorQuery().select(selector).fields({
            size: true
          }, function (res) {
            resolve(res)
          }).exec()
        })
      }
      let textSizeP = getSize('.' + _this.id + ' .text')
      let wrapSizeP = getSize('.' + _this.id + ' .wrap')
      textWidth = (await textSizeP).width
      wrapWidth = (await wrapSizeP).width

      if (wrapWidth < textWidth) { // 文字超出容器的情况
        _this.shadowTextDisplay = 'inline'
        _this.textAlign = 'left'
        _this.startScroll({
          textWidth: textWidth
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .my-noticebar{
    position: relative;
    .wrap{
      background-color: #ff3666;
    }
    p{
      display: inline;
      padding: 0 40px;
      font-size: 24rpx;
      color: #fff;
      white-space: nowrap;
      vertical-align: 4rpx;
    }
    .close{
      position: absolute;
      top: 0;
      right: 10rpx;
    }
  }
</style>
