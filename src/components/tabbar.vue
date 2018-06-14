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
      <div class="active_style" :style='{width: activeStyle.width,left: activeStyle.left,display:activeStyle.display}'></div>
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
        activeIndex: -1,
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
      }
    },
    watch: {
      activeIndex: {
        handler (val, oldVal) {
          // 控制type为default时的underline
          let wrapClass = '.item_wrap'
          if (this.type === 'scroll') {
            // return
            wrapClass = '.item_wrap--scroll'
          }
          this.$nextTick(async () => {
            function getRects (selector) {
              return new Promise((resolve) => {
                wx.createSelectorQuery().selectAll(selector).fields({
                  rect: true,
                  scrollOffset: true,
                  size: true
                }, function (rects) {
                  resolve(rects)
                }).exec()
              })
            }
            let getRectsP = getRects(wrapClass + ' .item')
            let getWrapRectsP = getRects(wrapClass)

            let activeRect = (await getRectsP)[val]
            let getWrapRect = (await getWrapRectsP)[0]
            // console.log(activeRect)
            // console.log(getWrapRect)
            this.activeStyle.display = 'block'
            this.activeStyle.top = activeRect.top + activeRect.height - 2 + 'px'
            this.activeStyle.left = activeRect.left + getWrapRect.scrollLeft + 'px'
            this.activeStyle.width = activeRect.width + 'px'
          })
        },
        immediate: false
      },
      active (val) { // 手动修改当前项
        if (val === this.activeIndex) {
          return
        }
        this.selectTab(this.list[val], val)
      }
    },
    mounted () {
      this.$emit('select', {
        data: this.list[0],
        index: 0
      })
      setTimeout(() => {
        this.activeIndex = 0
      }, 100)
    }
  }
</script>

<style lang="scss" scoped>
  $active_color: #ff3366;

  .my-tabbar{
    position: relative;
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
      }
      .active_style{
        position: absolute;
        top: 68rpx;
        height: 2px;
        background-color: $active_color;
        transition: all 0.3s;
      }
    }
  }
</style>
