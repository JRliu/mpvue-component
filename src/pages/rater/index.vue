<template>
  <div class="app">
    <rater :value.sync="value"  text=''>
      <p slot="default">请</p>
      <p slot="active">她</p>
    </rater>
    <rater :value.sync="value"  text=''>
      <p slot="default"><img src="/static/image/smile_grey.png" alt=""></p>
      <p slot="active"><img src="/static/image/smile.png" alt=""></p>
    </rater>
    <!-- <p>value: {{value}}</p> -->
    <br />
    <rater :value.sync="value"></rater>
    <rater :value.sync="value"  text='赞'></rater>
    <rater :value.sync="value"  text='赞'  active-color="#FFCC00"></rater>
    <p>value: {{value}}</p>
  </div>
</template>

<script>
  import rater from '@/components/rater.vue'
  export default {
    components: {
      rater
    },
    data () {
      return {
        value: 0
      }
    },
    methods: {

    },
    watch: {
      value (val) {
        console.log(val)
      }
    }
  }

</script>

<style  lang="scss">
  img{
    width: 40rpx;
    height: 40rpx;
  }
</style>
