<template>
  <div class="app">
    <p class='title'>文字超出容器，则滚动轮播</p>
    <noticebar :msg="msg"></noticebar>
    <p class='title'>文字不超出容器，则居中</p>
    <noticebar :msg="msg1" :className="'noticebar_blue'"></noticebar>
  </div>
</template>

<script>
  import noticebar from '@/components/noticebar'

  export default {
    components: {
      noticebar
    },
    data () {
      return {
        msg: '未经腾讯允许，附近的小程序功能仅用于进行宣传推广，而非实际提供产品或服务的!',
        msg1: '附近的小程序功能仅用于进行宣传推广'
      }
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  p.title{
    margin: 20px 0 6px;
    font-size: 30rpx;
    text-align: center;
  }
</style>

<style lang="scss">
  .noticebar_blue{
    .wrap{
      background-color: rgb(11, 133, 233) !important;
    }
  }
</style>
