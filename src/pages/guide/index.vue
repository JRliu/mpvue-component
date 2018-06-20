<template>
  <div class="app">
    <div class="btns">
      <button  @tap="showToast('default')"
        :class='[{"app-guide_item": guideIndex === 2}]'
        >default</button>
      <button  @tap="showToast('top')"
        :class='[{"app-guide_item": guideIndex === 5}]'
        >top</button>
      <button  @tap="showToast('middle')"
        :class='[{"app-guide_item": guideIndex === 3}]'
        >center</button>
      <button  @tap="showToast('bottom')" :class='[{"app-guide_item": guideIndex === 4}]'>bottom</button>
    </div>
    <button :class='[{"app-guide_item": guideIndex === 1}]'
      size=mini
      @click="startGuide">开始</button>
    <toast ref='toast'></toast>
    <guide ref='guide' :index.sync='guideIndex' :msg='guideText'>
    </guide>
  </div>
</template>

<script>
  import guide from '@/components/guide'
  import toast from '@/components/toast'

  export default {
    components: {
      guide,
      toast
    },
    data () {
      return {
        guideIndex: 0,
        text: '哈哈哈哈。再见',
        guideMsg: {
          text: '到哪看见电脑',
          left: 0,
          top: 0
        },
        guideText: ['default',
          {
            position: 'bottom-right',
            src: 'http://img2015.zdface.com/20180509/726dd112f07705186da69d790eaf1f5a.jpg'
          }, {
            text: 'top-left',
            position: 'top-left'
          }, {
            text: 'bottom-right',
            position: 'bottom-right'
          }, '1企鹅去温泉']
      }
    },
    methods: {
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
      },
      startGuide () {
        this.$refs.guide.start()
      }
    },
    mounted () {
      // setTimeout(() => {
      //   this.$refs.guide.start()
      // }, 300)
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
</style>
<style>
  .app-guide_img{
    width: 50px;
    height: 30px;
  }
</style>

