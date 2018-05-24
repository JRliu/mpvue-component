<template>
  <div class="my-tabbar" :class="[className]">
    <div class="item_wrap" v-if="type === 'default'">
      <div class="item"
        v-for="(item, index) in list" :key="index"
        @click="clickTab(item, index)"
        :class="{'active': activeIndex === index}">
        {{item}}
      </div>
      <div class="active_style" :style='{width: activeStyle.width,left: activeStyle.left,top:activeStyle.top,display:activeStyle.display}'></div>
    </div>

    <scroll-view  scroll-x=true  class="item_wrap--scroll" v-if="type==='scroll'">
      <div class="item"
        v-for="(item, index) in list" :key="index"
        @click="clickTab(item, index)"
        :class="{'active': activeIndex === index}">
        {{item}}
      </div>
      <div class="active_style" :style='{width: scrollWrapStyle.width}'></div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      },
      list: {
        type: Array,
        default: []
      },
      active: {
        type: Number
      }
    },
    data () {
      return {
        activeIndex: 0,
        activeStyle: {
          left: 0,
          top: 0,
          width: 0,
          display: 'none'
        },
        scrollWrapStyle: {
          width: '100%'
        }
      }
    },

    methods: {
      clickTab (item, index) {
        this.selectTab(item, index)
        this.$emit('update:active', this.activeIndex)
      },
      selectTab (item, index) {
        this.activeIndex = index
        this.activeItem = item

        this.$emit('select', {
          data: this.activeItem,
          index: this.activeIndex
        })
        console.log('select')
      }
    },
    watch: {
      activeIndex: {
        handler (val, oldVal) {
          // 控制type为default时的underline
          if (this.type !== 'default') {
            return
          }
          this.$nextTick(async () => {
            let getRects = new Promise((resolve) => {
              wx.createSelectorQuery().selectAll('.item_wrap .item').boundingClientRect(function (rects) {
                resolve(rects)
              }).exec()
            })
            let activeRect = (await getRects)[val]
            // console.log(activeRect)
            this.activeStyle.display = 'block'
            this.activeStyle.top = activeRect.top + activeRect.height + 'px'
            this.activeStyle.left = activeRect.left + 'px'
            this.activeStyle.width = activeRect.width + 'px'
          })
        },
        immediate: true
      },
      active (val) { // 手动修改当前项
        if (val === this.activeIndex) {
          return
        }
        this.selectTab(this.list[val], val)
      }
    },
    mounted () {
      this.$emit('select', { // 挂载后马上触发选择第一项
        data: this.list[0],
        index: 0
      })
    }
  }
</script>

<style lang="scss" scoped>
  $active_color: #ff3366;

  .item_wrap{
    position: relative;
    display: flex;
    justify-content: space-around;
    .item{
      padding: 3px 5px;
      margin: 0 10px;
      font-size: 28rpx;
      line-height: 2;
      text-align:center;
      color: #666;
      flex: 1;
      &.active{
        color: $active_color;
      }
    }
    .active_style{
      position: fixed;
      height: 2px;
      background-color: $active_color;
      transition: all 0.3s;
    }
  }
  .item_wrap--scroll{
    width: 750rpx;
    white-space:nowrap;
    .item{
      display: inline-block;
      position: relative;
      padding: 5px 10px;
      line-height: 2;
      font-size: 26rpx;
      color: #666;
      &.active{
        color: $active_color;
      }
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 100%;
        height: 2px;
        width: 0%;
        background-color: $active_color;
        transition: width 300ms, left 300ms;
      }
      &.active::after{
        left: 0;
        width: 100%;
        transition: width 300ms;
      }
    }
  }
</style>
