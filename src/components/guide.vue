<template>
  <div class="app-guide"
    :class="[className]">
    <div class="guide_mask" @click="guideNext" v-if="index <= msg.length"></div>
    <div class="guide_msg"
      :style='{left:guideMsgPos.l+"px",top:guideMsgPos.t+"px",right:guideMsgPos.r+"px",bottom:guideMsgPos.b+"px"}'
      v-if="index <= msg.length"
    >
      <p v-if='text'  class='app-guide_text'>{{text}}</p>
      <img :src='src' alt="" v-if='src' class='app-guide_img'>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      index: {
        type: Number
      },
      msg: {
        type: Array
      }
    },
    data () {
      return {
        text: '',
        src: '',
        guideMsgP: {
          l: 0,
          t: 0,
          b: 0,
          r: 0,
          w: 0,
          h: 0
        },
        position: 'bottom-left',
        positionO: 'bottom-left'
      }
    },
    computed: {
      guideMsgPos () {
        let origin = this.guideMsgP
        let winW = wx.getSystemInfoSync().windowWidth
        let result = {
          t: 0,
          l: 0
        }
        let p = this.position.split('-')
        let vertical = p[0]
        let horizontal = p[1]
        if (vertical === 'top') {
          result.t = origin.t - origin.h
        } else {
          result.t = origin.b
        }
        if (horizontal === 'left') {
          result.l = origin.l
        } else {
          result.l = 'auto'
          result.r = winW - origin.r
        }
        return result
      }
    },
    methods: {
      start () {
        this.index = 0
        this.$emit('update:index', this.index)
        this.guideNext()
      },
      guideNext () {
        this.index ++
        this.$emit('update:index', this.index)
        this.$nextTick(() => {
          wx.createSelectorQuery().select('.app-guide_item').fields({
            rect: true
          }, (res) => {
            if (!res) {
              return
            }
            console.log(res)
            this.guideMsgP.t = res.top
            this.guideMsgP.l = res.left
            this.guideMsgP.b = res.bottom
            this.guideMsgP.r = res.right
            this.guideMsgP.w = res.right - res.left
            this.guideMsgP.h = res.bottom - res.top
          }).exec()
        })
      }
    },
    watch: {
      index (val, oldVal) {
        this.text = ''
        this.src = ''
        let active = this.msg[val - 1]
        if (typeof (active) === 'object') {
          if (active.position) {
            this.position = active.position
          } else {
            this.position = this.positionO
          }
          if (active.text) {
            this.text = active.text
          }
          if (active.src) {
            this.src = active.src
          }
          return
        }
        this.position = this.positionO
        this.text = active
      }
    },
    mounted () {
      console.log('ok')
    }
  }
</script>

<style lang="scss" scoped>
  .app-guide{
    .guide_mask{
      position: fixed;
      z-index: 9;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0);
    }
    .guide_msg{
      position: fixed;
      z-index: 10;
      font-size: 14px;
      p{
        margin: 10px;
        padding: 5px 10px;
        background-color: #fff;
        border-radius: 3px;
      }
    }
  }
</style>
<style lang="scss">
  .app-guide_item{
    z-index: 10;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
  }
</style>
