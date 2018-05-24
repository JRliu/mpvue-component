<template>
  <div class="app">
    <number-input
    :num.sync='num'
    :max=5
    :min=-1
    :step=2
    :write=true
    @max='maxHandler'
    @min='minHandler'
    >
    </number-input>

    <p>父组件： {{num}}</p>
    <toast ref="myToast"></toast>
  </div>
</template>

<script>
  import numberInput from '@/components/number_input'
  import toast from '@/components/toast'

  export default {
    components: {
      numberInput,
      toast
    },
    data () {
      return {
        num: 0
      }
    },
    methods: {
      maxHandler () {
        console.log('max')
        this.$refs.myToast.toast('max')
      },
      minHandler () {
        this.$refs.myToast.toast({
          text: 'min',
          position: 'middle'
        })
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
