<template>
  <div class="app">
    <div class="btns">
      <button  @tap="togglePopup('centerPopup')">center(default)</button>
      <button  @tap="togglePopup('topPopup')">top</button>
      <button  @tap="togglePopup('rightPopup')">right</button>
      <button  @tap="togglePopup('bottomPopup')">bottom</button>
      <button  @tap="togglePopup('leftPopup')">left</button>
      <button  @tap="togglePopup('clickMaskClose')">点击mask不关闭</button>
      <button  @tap="togglePopup('topNoMaskPopup')">top notice</button>
    </div>
    <popup ref="centerPopup">
      <p v-for="item in list" :key="item">{{item}}</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </popup>
    <popup ref="topPopup"  type="top">
      <p v-for="item in list" :key="item">{{item}}</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </popup>
    <popup ref="rightPopup"  type="right">
      <p v-for="item in list" :key="item">{{item}}</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </popup>
    <popup ref="bottomPopup"  type="bottom">
      <p >item</p>
    </popup>
    <popup ref="leftPopup"  type="left">
      <p v-for="item in list" :key="item">item</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </popup>
    <popup ref="clickMaskClose"  type="left" :click-mask-close="false">
      <p v-for="item in list" :key="item">item</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <button @click="togglePopup('clickMaskClose')">关闭</button>
    </popup>
    <popup ref="topNoMaskPopup"  type="top" :mask="false"
      :duration='3000'  mask-color='rgba(0,0,0,0)'>
      <p class="toptips">您的余额不足，请给我马上充值！</p>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup'

export default {
  components: {
    popup
  },
  data () {
    return {
      list: ['asdada', 'adasad', '的撒多多所', '热不错vwerw']
    }
  },
  methods: {
    togglePopup (ref) {
      this.$refs[ref].toggle()
    }
  }
}
</script>

<style scoped lang="scss">
.btns {
  margin-top: 100rpx;
  button {
    width: 600rpx;
    margin-top: 30rpx;
  }
}
p {
  padding: 10rpx 30rpx;
}
</style>
<style lang="scss">
.my-popup {
  .content {
    background-color: #fff;
  }
  p.toptips {
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    background-color: #ff3666;
  }
}
</style>

