<template>
  <div class="app">
    <div style="margin-top: 30px; border-bottom: 1px solid #f5f5f5;">
      <my-tabbar  ref="tabbar" @select='selectTab' :active.sync='num'
        :list='tabList'></my-tabbar>
    </div>
    <p>{{activeTab}}</p>
    <p  @click='num = 2'>选择第三个</p>

    <div style="margin-top: 30px; border-bottom: 1px solid #f5f5f5;">
      <my-tabbar  ref="tabbarScroll" :type='"scroll"'
        @select='selectTab2'
        :list='tabList2'></my-tabbar>
    </div>
    <p>{{activeTab2}}</p>
  </div>
</template>

<script>
  import myTabbar from '@/components/tabbar'

  export default {
    components: {
      myTabbar
    },
    data () {
      return {
        activeTab: '',
        activeTab2: '',
        tabList: ['阿大', 'v西方式的', '让他', '请问'],
        tabList2: ['阿大', 'v西方式的', '让他', '请问', '阿大', 'v西方式的', '让他', '请问', '阿大', 'v西方式的', '让他', '请问'],
        num: 0
      }
    },
    methods: {
      selectTab (arg) {
        this.activeTab = arg.index + ' : ' + arg.data
      },
      selectTab2 (arg) {
        console.log(arg)
        this.activeTab2 = arg.index + ' : ' + arg.data
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
