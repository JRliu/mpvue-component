<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <p class="welcome_text">
        你好，<span class="nicknema">
          <open-data type="userNickName"></open-data>
        </span>！
      </p>
    </div>
    <div class="btns">
      <button @tap="goPopup">popup</button>
      <button @tap="goToast">toast</button>
      <button @tap="goCountTo">countTo</button>
      <button @tap="goWaterfall">waterfall</button>
      <button @tap="goLoadmore">loadmore</button>
    </div>
  </div>
</template>

<script>
import '@/style/grid.scss'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
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
    },
    goWaterfall () {
      wx.navigateTo({
        url: '/pages/waterfall/main'
      })
    },
    goLoadmore () {
      wx.navigateTo({
        url: '/pages/loadmore/main'
      })
    }
  },

  created () {
    console.log(this)
  }
}
</script>

<style scoped lang="scss">
  .header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50rpx 0 100rpx;
  }
  .avatar{
    width: 160rpx;
    height: 160rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }
  .welcome_text{
    font-size: 30rpx;
  }
  .btns{
    button{
      margin-top: 20rpx;
      width: 600rpx;
    }
  }
</style>
