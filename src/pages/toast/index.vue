<template>
  <div class="app">
    <div class="btns">
      <button  @tap="showToast('default')"  hover-class="none">default</button>
      <button  @tap="showToast('top')"  hover-class="none">top</button>
      <button  @tap="showToast('center')"  hover-class="none">center</button>
      <button  @tap="showToast('bottom')"  hover-class="none">bottom</button>
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
        text: 'qweqweqweqweq阿打算打wewqeqwdasddasdadasdsadsadsad企鹅请问请问群二asda'
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
