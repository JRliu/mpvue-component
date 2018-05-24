<template>
  <div class="app">
    <!-- 在此处预加载图片 -->
    <view style="display:none">
      <image v-for="(img, index) in loadingImages" :key="index" :src="img.src" @load="onImageLoad(index, $event)"></image>
    </view>
    <scroll-view scroll-y=true
      class="waterfall"
      @scrolltolower = "getImages"
      >
      <!-- 分两列，根据两个数组进行列表渲染 -->
      <div class="img_group">
        <div class="img_wrap"
           v-for="(img, index) in colLeft.list" :key="index"
           :class="'leftpic-' + index"
           >
          <image
            :src="img.src"  :id="index"  lazy-load=true
            :style="{height: img.height+'px'}"
            v-if="img.show"
            @tap="previewImage(img.src)"  />
          <div class="img_placeholder"  v-else></div>
          <p>{{img.src}}</p>
        </div>
      </div>
      <div class="img_group">
        <div class="img_wrap"
            v-for="(img, index) in colRight.list" :key="index"
            :class="'rightpic-' + index">
          <image
            :src="img.src"  :id="index"  lazy-load=true
            :style="{height: img.height+'px'}"
            v-if="img.show"
            @tap="previewImage(img.src)" />
          <div class="img_placeholder"  v-else></div>
        </div>
      </div>
      <loadmore  type='loading'></loadmore>
    </scroll-view>
  </div>
</template>

<script>
  import Loadmore from '@/components/loadmore'

  export default {
    components: {
      Loadmore
    },
    data () {
      return {
        images: [],
        loadingImages: [],
        colLeft: {
          h: 0,
          list: []
        },
        colRight: {
          h: 0,
          list: []
        },
        imgWidth: 0,  // 图片宽度
        loadingCount: 0 // 当前加载中的图片数
      }
    },
    computed: {
      imagesSrc () {
        return this.images.map((item) => {
          return item.src
        })
      }
    },
    methods: {
      onImageLoad (index, e) {
        let oImgW = e.mp.detail.width         // 图片原始宽度
        let oImgH = e.mp.detail.height        // 图片原始高度
        let imgWidth = this.imgWidth         // 图片设置的宽度
        let scale = imgWidth / oImgW        // 缩放比例计算
        let imgHeight = oImgH * scale

        let images = this.loadingImages
        let imageObj = null

        images.forEach((item, i) => {
          let img = item
          if (index === i) {
            imageObj = img
            return
          }
        })
        imageObj.height = imgHeight

        let colLeft = this.colLeft
        let colRight = this.colRight

        // 判断当前图片添加到左列还是右列，图片将添加到高度较低的那一列
        if (colLeft.h <= colRight.h) {
          colLeft.h += imgHeight
          colLeft.list.push(imageObj)
          this.lazyLoad(colLeft.list, 'left') // lazyload
        } else {
          colRight.h += imgHeight
          colRight.list.push(imageObj)
          this.lazyLoad(colRight.list, 'right') // lazyload
        }

        this.loadingCount--

        // 当前这组图片已加载完毕，则清空 存放加载中图片的数组
        if (!this.loadingCount) {
          this.loadingImages = []
        }
      },
      getImages () {
        console.log('get')
        var arr = [
          {src: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201805/wpic907_s.jpg',
            height: 0},
          {src: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201805/wpic977_s.jpg',
            height: 0},
          {src: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201805/zzpic11845_s.jpg',
            height: 0},
          {src: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201805/wpic857_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11471_s.jpg',
            height: 0},
          {src: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201804/wpic695_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201805/wpic839_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201805/zzpic11760_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201805/wpic790_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/bpic6762_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/bpic6771_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11596_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/wpic666_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201803/bpic6227_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11491_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11491_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11491_s.jpg',
            height: 0},
          {src: 'http://pic.sc.chinaz.com/Files/pic/pic9/201804/zzpic11491_s.jpg',
            height: 0}
        ]
        setTimeout(() => {
          arr.forEach((item) => {
            item.show = false
          })
          this.loadingCount = arr.length // 当前待加载图片数量
          this.loadingImages = arr // 当前待加载图片数组

          this.images = this.images.concat(arr)
        }, 1000)
      },
      previewImage (src) { // 图片预览
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: this.imagesSrc // 需要预览的图片http链接列表
        })
      },
      lazyLoad (imgList, type) {
        let activeIndex = imgList.length - 1
        let selector = `.${type}pic-` + activeIndex
        ;(function tick () {
          setTimeout(() => {
            wx.createSelectorQuery().select(selector).fields({},
            function (ret) {
              if (!ret) {  // 先判断元素是否已创建
                return tick()
              }
              wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe(selector, (ret) => {
                if (ret.intersectionRatio > 0) {
                  imgList[activeIndex].show = true
                }
              })
            }).exec()
          }, 100)
        })()
      }
    },

    watch: {

    },
    onLoad: function () {
      wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth
          let imgWidth = ww * 0.48

          this.imgWidth = imgWidth

          // 加载首组图片
          this.getImages()
        }
      })
    },
    onUnload () {
      this.images = []
      this.colLeft.list = []
      this.colRight.list = []
    }
  }

</script>

<style scoped lang="scss">
  .waterfall{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .img_group{
    position: relative;
    width: 48%;
    margin: 1%;
    display: inline-block;
    vertical-align: top;
  }
  .img_wrap{
    position: relative;
    margin-bottom: 10rpx;
    animation: bounceIn 0.3s ease;
    p{
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 10px;
      width: 100%;
      word-wrap: break-word;
      background-color: rgba(0,0,0,0.5);
    }
    image{
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      animation: fadeIn 0.3s ease-in;
    }
    .img_placeholder{
      position: relative;
      display: block;
      width: 100%;
      height: 400rpx;
      background: #f5f5f5;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes bounceIn {
    from {
      transform: translate(0, 100%);
    }
    to {
      transform: translate(0, 0);
    }
  }
</style>
