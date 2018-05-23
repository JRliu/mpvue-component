<template>
  <div class="container">
    <div class="my-row">
        <div class="my-col-4">col-4</div>
        <div class="my-col-4 my-col-offset-4">col-4</div>
        <div class="my-col-8 my-col-offset-4">col-8</div>
    </div>
    <div class="my-row">
        <div class="my-col-3">col-4</div>
        <div class="my-col-5 my-col-offset-4">col-4</div>
    </div>
    <div class="my-flex my-flex-center my-flex-top">
        <div class="my-col-3">col-3</div>
        <div class="my-col-5">col-5</div>
    </div>
    <div class="my-flex my-flex-space-around my-flex-bottom">
        <div class="my-col-3">col-3</div>
        <div class="my-col-5">col-5</div>
    </div>
  </div>
</template>

<script>
import '@/style/grid.scss';
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.my-flex {
  height: 50px;
}
.my-flex {
  div {
    height: 20px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }
  .my-col-5 {
    height: 40px;
  }
}
.my-col-4 {
  background-color: #ff3666;
}
.my-col-8 {
  background-color: #36a5ff;
}
.my-col-3 {
  background-color: #36ff83;
}
.my-col-5 {
  background-color: #ffc936;
}
</style>
