<template>
  <div class="my-number-input"
    :class="[className]">
    <div class="sub" @tap="sub">-</div>
    <div class="input_wrap">
      <input class="num" type="number"
      :value='value'
      :disabled='!write'
      @input='inputHandler'
      />
    </div>
    <div class="add" @tap="add">+</div>
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      num: {
        type: Number,
        default: 0
      },
      max: {
        type: Number
      },
      min: {
        type: Number
      },
      step: {
        type: Number,
        default: 1
      },
      write: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        value: 0
      }
    },

    methods: {
      add () {
        if (this.max && this.value >= this.max) {
          this.$emit('max')
          return
        }
        let tem = this.value + this.step
        let result = this.filter(tem)
        this.value = result
      },
      sub () {
        if (this.max && this.value <= this.min) {
          this.$emit('min')
          return
        }
        let tem = this.value - this.step
        let result = this.filter(tem)
        this.value = result
      },
      inputHandler (e) {
        let result = this.filter(e.mp.detail.value)
        this.$nextTick(() => {
          this.value = result
        })
        return result
      },
      filter (num) {
        let result = num
        let max = this.max
        let min = this.min
        if (result === '-' || result === '+') {
          return result
        }
        if (!result) {
          result = 0
        }
        if (max && result > max) {
          result = max
          this.$emit('max')
        }
        if (min && result < min) {
          result = min
          this.$emit('min')
        }
        return parseFloat(result) || 0
      }
    },

    watch: {
      value (val, oldVal) {
        console.log('update')
        this.$emit('update:num', parseFloat(val) || 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-number-input{
    display: flex;
    position: relative;
    width: 160rpx;
    .sub,
    .input_wrap,
    .add{
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      text-align: center;
      border: 1rpx solid #c4c4c4;
    }
    .sub, .add{
      line-height: 36rpx;
    }
    .input_wrap{
      width: 80rpx;
      border-left: none;
      border-right: none;
      input{
        margin-top: -6rpx;
        min-height: 0;
        font-size: 24rpx;
        line-height: 40rpx;
      }
    }
  }
</style>
