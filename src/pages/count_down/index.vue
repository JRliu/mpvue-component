<template>
  <div class="app">
    <count-down :start='start'></count-down>
  </div>
</template>
<script>
import countDown from '@/components/count_down.vue'
export default {
  components: {
    countDown
  },
  data () {
    return {
      start: 2365
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>

</style>
