<template>
  <div class="app-left-swipe">
    <slider-left class="swider-item" v-for="(item, index) in list" :key="index"
      :open="item.isOpen"
      :data-id="item.id"
      @sliderLeftStart="handleSliderLeftStart"
      @change="handleChange"
      @delete="handleDelete(item)">
      <p class='slider-handle'>{{item.text+':玩额外企鹅我去而爱上大好看蓝第六届'}}</p>
    </slider-left>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            text: 'qe',
            id: 1,
            isOpen: false,
            show: true
          }, {
            text: 'qade',
            id: 2,
            isOpen: false,
            show: true
          }, {
            text: 'q111e',
            id: 3,
            isOpen: false,
            show: true
          }, {
            text: 'qertrtt',
            id: 4,
            isOpen: false,
            show: true
          }
        ]
      }
    },
    methods: {
      handleSliderLeftStart () {
        console.log('start')
      },
      handleChange () {
        console.log('change')
      },
      handleDelete (item) {
        let index = this.list.indexOf(item)
        this.list.splice(index, 1)
      }
    }
  }

</script>

<style  lang="scss">
  .slider-handle{
    position: relative;
    line-height: 100rpx;
    width: 100%;
    border-bottom: 1rpx solid rgb(170, 170, 170);
  }
  .swider-item.hide{
    transition: all 0.3s;
    height: 0;
  }
</style>
