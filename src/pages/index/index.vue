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
    <div class="btns app-flex app-flex-space-around">
      <button @tap="goPage('popup')">popup</button>
      <button @tap="goPage('toast')">toast</button>
      <button @tap="goPage('count_to')">countTo</button>
      <button @tap="goPage('waterfall')">waterfall</button>
      <button @tap="goPage('loadmore')">loadmore</button>
      <button @tap="goPage('tabbar')">tabbar</button>
      <button @tap="goPage('poster')">poster</button>
      <button @tap="goPage('number_input')">numberInput</button>
      <button @tap="goPage('guide')">guide</button>
      <button @tap="goPage('qrcode')">qrcode</button>
      <button @tap="goPage('grid')">grid</button>
      <button @tap="goPage('noticebar')">noticebar</button>
      <button @tap="goPage('slide_left')">slide_left</button>
      <button @tap="goPage('rater')">rater</button>
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
    goPage (page) {
      wx.navigateTo({
        url: `/pages/${page}/main`
      })
    }
  },

  created () {
    console.log(this)
  }
}
</script>

<style scoped lang="scss">
  .container{
    padding: 80rpx 0;
  }
  .header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 50rpx;
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
      width: 30%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
    }
  }
</style>
