<template>
  <div class="app">
    <div class="btns">
      <button  @tap="showToast('default')"  hover-class="none">default</button>
      <button  @tap="showToast('top')"  hover-class="none">top</button>
      <button  @tap="showToast('middle')"  hover-class="none">center</button>
      <button  @tap="showToast('bottom')"  hover-class="none">bottom</button>
      <button  @tap="showToast('', 'loading')"  hover-class="none">loading</button>
      <button  @tap="showToast('', 'success')"  hover-class="none">成功</button>
      <button  @tap="showToast('', 'error')"  hover-class="none">失败</button>
      <button  @tap="showToast('', 'warn')"  hover-class="none">警告</button>
      <button  @tap="hideLoading()"  hover-class="none">hide</button>
    </div>
    <toast ref='toast'></toast>
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
        text: '加载中'
      }
    },
    methods: {
      showToast (position, type) {
        if (position === 'default') {
          this.$refs['toast'].toast('hello') // 默认position为bottom,duration为3000
          return
        }
        this.$refs.toast.toast({
          text: this.text,
          position: position,
          type: type || '',
          duration: 3000
        })
      },
      hideLoading () {
        this.$refs.toast.hide()
      }
    }
  }

</script>

<style scoped lang="scss">
  .btns{
    margin-top: 100rpx;
    button{
      width: 600rpx;
      margin-top: 30rpx;
    }
  }
  p{
    padding: 10rpx 30rpx;
  }
</style>
