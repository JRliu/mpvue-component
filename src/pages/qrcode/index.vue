<template>
  <div class="app">
    <div class="inputs">
      <input type="text" @input="inputHandler">
      <button size='mini' @tap="makeQrcode">生成二维码</button>
    </div>
    <canvas canvas-id='qrcode' style="width:300px;height:300px;"></canvas>
  </div>
</template>

<script>
  import QR from '@/utils/qrcode'

  export default {
    data () {
      return {
        value: ''
      }
    },
    methods: {
      inputHandler (e) {
        let val = e.mp.detail.value
        this.value = val
        return val
      },
      makeQrcode () {
        QR.api.draw(this.value, 'qrcode', 300, 300)
      }
    }
  }

</script>

<style scoped lang="scss">
  .inputs{
    display: flex;
    justify-content: space-around;
  }
  button{
    margin: 0;
  }
  input{
    width: 400rpx;
    border: 1px solid #d1d1d1;
  }
</style>
