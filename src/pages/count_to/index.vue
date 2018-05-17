<template>
  <div class="app">
    <count-to :start-num="startNum"
      :end-num="endNum"
      :duration="duration"
      :switch="counterSwitch"
      ref="countTo"  className="my_counter">
    </count-to>

    <label for="" class="input_label">
      <p>startNum</p>
      <input type="digit" v-model="startNum" focus=true>
    </label>
    <label for="" class="input_label">
      <p>endNum</p>
      <input type="digit" v-model="endNum">
    </label>
    <label for="" class="input_label">
      <p>duration</p>
      <input type="digit" v-model="duration">
    </label>
    <label for="" class="input_label">
      <p>switch</p>
      <switch type="switch" :checked="counterSwitch"
      @change="counterSwitch=!counterSwitch" />
    </label>
    <button @tap="start"  size=mini>开始</button>
  </div>
</template>

<script>
  import countTo from '@/components/count_to'

  export default {
    components: {
      countTo
    },
    data () {
      return {
        startNum: 12,
        endNum: 365.33,
        duration: 3200,
        counterSwitch: true
      }
    },
    methods: {
      start () {
        this.$refs.countTo.start()
      }
    },
    mounted () {
    }
  }

</script>

<style scoped lang="scss">
  .app{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .input_label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    & + .input_label{
      margin-top: 20px;
    }
    p{
      font-size: 30rpx;
    }
    input{
      padding: 0 20rpx;
      width: 200rpx;
      text-align: right;
      border: 1px solid #eee;
      border-radius: 10rpx;
    }
  }
  button{
    margin-top: 20px;
  }
</style>
<style>
  .my_counter{
    margin: -200rpx 0  40rpx;
    text-align: center;
    font-size: 80rpx;
    font-weight: 700;
  }
</style>

