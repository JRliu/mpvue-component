<template>
  <div class="app">
    <loadmore  type="loading"></loadmore>
    <loadmore  type="nomore"></loadmore>
    <loadmore  type="nodata"></loadmore>
    <loadmore  type="loading" tips="加你mb加"></loadmore>
    <loadmore  type="nodata" tips="hello world"></loadmore>
  </div>
</template>

<script>
  import Loadmore from '@/components/loadmore'

  export default {
    components: {
      Loadmore
    }
  }

</script>

<style>
  .my_loadmore{
    margin: 50px 0 !important;
  }
</style>
