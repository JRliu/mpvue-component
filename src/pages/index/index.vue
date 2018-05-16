<template>
  <div class="container">
    <div class="btns">
      <button @tap="goPopup">popup</button>
      <button @tap="goToast">toast</button>
      <button @tap="goCountTo">countTo</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
  },

  methods: {
    goPopup () {
      wx.navigateTo({
        url: '/pages/popup/main'
      })
    },
    goToast () {
      wx.navigateTo({
        url: '/pages/toast/main'
      })
    },
    goCountTo () {
      wx.navigateTo({
        url: '/pages/count_to/main'
      })
    }
  },

  created () {

  }
}
</script>

<style scoped lang="scss">
  .btns{
    margin: 100rpx 0 0 0;
    button{
      margin-top: 20rpx;
      width: 600rpx;
    }
  }
</style>
