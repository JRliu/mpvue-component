<template>
  <div class="app">
    <div class="btns">
      <button  @tap="showToast('default')" :class='[{"guide": guide === 1}]'>default</button>
      <button  @tap="showToast('top')" :class='[{"guide": guide === 2}]'>top</button>
      <button  @tap="showToast('middle')" :class='[{"guide": guide === 3}]'>center</button>
      <button  @tap="showToast('bottom')" :class='[{"guide": guide === 4}]'>bottom</button>
    </div>
    <toast ref='toast'></toast>
    <div class="guide_mask" @click="guideNext" v-if="guide&&guide <= 4"></div>
    <div class="guide_msg"
      :style='{left:guideMsg.left+"px",top:guideMsg.top+"px"}'
      v-if="guide&&guide <= 4"
    >{{guideMsg.text}}</div>
  </div>
</template>

<script>
  import toast from '@/components/toast'

  export default {
    components: {
      toast
    },
    data () {
      return {
        guide: 0,
        text: '哈哈哈哈。再见',
        guideMsg: {
          text: '到哪看见电脑',
          left: 0,
          top: 0
        }
      }
    },
    methods: {
      guideNext () {
        this.guide ++
        this.$nextTick(() => {
          wx.createSelectorQuery().select('.guide').fields({
            rect: true
          }, (res) => {
            if (!res) {
              return
            }
            console.log(res)
            this.guideMsg.top = res.bottom
            this.guideMsg.left = res.left
          }).exec()
        })
      },
      showToast (position) {
        if (position === 'default') {
          this.$refs.toast.toast('hello') // 默认position为bottom,duration为3000
          return
        }
        this.$refs.toast.toast({
          text: this.text,
          position: position,
          duration: 3000
        })
      }
    },
    mounted () {
      // this.$nextTick(() => {
      //   this.guideNext()
      // })
      setTimeout(() => {
        this.guideNext()
      }, 1000)
    }
  }

</script>

<style scoped lang="scss">
  .btns{
    margin-top: 100rpx;
    button{
      position: relative;
      width: 600rpx;
      margin-top: 30rpx;
    }
  }
  p{
    padding: 10rpx 30rpx;
  }
  .guide{
    z-index: 10;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
  }
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
    background-color: #fff;
    transition: all 0.2s;
  }
</style>
