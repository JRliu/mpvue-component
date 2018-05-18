<template>
  <div class="app">
    <view style="display:none">
      <image v-for="(img, index) in loadingImages" :key="index" :src="img.src" @load="onImageLoad(index, $event)"></image>
    </view>
    <scroll-view scroll-y=true
      class="waterfall"
      @scrolltolower = "getImages"
      >
      <div class="img_group">
        <div class="img_wrap"
           v-for="(img, index) in colLeft.list" :key="index">
          <image
            :src="img.src"  :id="index"  lazy-load=true
            :style="{height: img.height+'px'}"
            @tap="previewImage(img.src)"  />
          <p>{{img.src}}</p>
        </div>
      </div>
      <div class="img_group">
        <div class="img_wrap"
           v-for="(img, index) in colRight.list" :key="index">
          <image
            :src="img.src"  :id="index"  lazy-load=true
            :style="{height: img.height+'px'}"
            @tap="previewImage(img.src)" />
        </div>
      </div>

    </scroll-view>
  </div>
</template>

<script>
  export default {
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

        // 判断当前图片添加到左列还是右列
        if (colLeft.h <= colRight.h) {
          colLeft.h += imgHeight
          colLeft.list.push(imageObj)
        } else {
          colRight.h += imgHeight
          colRight.list.push(imageObj)
        }

        this.loadingCount--

        // 当前这组图片已加载完毕，则清空存放加载中图片的数组
        if (!this.loadingCount) {
          this.loadingImages = []
        }
      },
      getImages () {
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
          this.loadingCount = arr.length // 当前待加载图片数
          this.images = this.images.concat(arr)
          this.loadingImages = arr
        }, 1000)
      },
      previewImage (src) {
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: this.imagesSrc // 需要预览的图片http链接列表
        })
      }
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
    }
  }
</style>
