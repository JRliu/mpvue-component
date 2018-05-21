<template>
  <div class="app">
    <div class="canvas_wrap"
      v-if="complete">
      <canvas canvas-id="shareCanvas"
      class="canvas"
      style="width: 300px;height: 400px;box-shadow:0px 4px 5px 1px rgba(0,0,0,0.4);border-radius:10px">
      </canvas>
      <button size='mini'
      class="savePoster"
      @tap="savePoster"
      >保存海报到本地</button>
    </div>
    <button v-if="!complete"
    @tap="generatePoster"
    >生成海报</button>
  </div>
</template>

<script>
import { promisify } from '@/utils/tools'
export default {
  data () {
    return {
      complete: false
    }
  },
  methods: {
    generatePoster () {
      // const getUserInfo = promisify(wx.getUserInfo)
      // getUserInfo().then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err);
      // }).finally(()=>{
      //   console.log('finally');
      // })
      this.drawCanvas()
    },
    async savePoster () {
      const saveCanvasToPath = promisify(wx.canvasToTempFilePath)
      const saveImageToAlbum = promisify(wx.saveImageToPhotosAlbum)
      let saveCanvasToPathP = saveCanvasToPath({
        canvasId: 'shareCanvas',
        fileType: 'jpg'
      })
      let canvasPath = (await saveCanvasToPathP).tempFilePath

      saveImageToAlbum({
        filePath: canvasPath
      }).then((res) => {
        console.log(res)
        wx.hideLoading()
      })
    },
    async drawCanvas () {
      wx.showLoading({title: '正在生成'})
      const getImageInfo = promisify(wx.getImageInfo)
      let bgPathP = getImageInfo({src: 'http://img2015.zdface.com/20180509/726dd112f07705186da69d790eaf1f5a.jpg'})
      // 应该向服务器请求获取二维码图片
      let qrcodePathP = getImageInfo({src: 'http://src.onlinedown.net/images/xcs/10/2017-07-13_59673fd3e2f2c.jpg'})

      let bgImg = await bgPathP
      let qrcodeImg = await qrcodePathP

      const ctx = wx.createCanvasContext('shareCanvas')
      // clip圆角
      function roundRect (x, y, w, h, r) {
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, r)
        ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r)
        ctx.closePath()
      }

      roundRect(0, 0, 300, 400, 10)

      ctx.clip()
      // 绘制背景图
      // ctx.setGlobalAlpha(0.5)
      ctx.drawImage(bgImg.path, 130, 0, 300, 400, 0, 0, 300, 400)
      ctx.setGlobalAlpha(1)
      ctx.restore()
      // 绘制二维码
      ctx.drawImage(qrcodeImg.path, 20, 20, 100, 100)
      // 绘制文字
      ctx.setFillStyle('#ff6666')
      ctx.setFontSize(24)
      ctx.setTextAlign('left')
      ctx.fillText('恭喜发财,获得十元', 20, 330)
      ctx.setFontSize(14)
      ctx.fillText(new Date().toLocaleString(), 20, 360)
      // 绘制路径
      ctx.setStrokeStyle('#fff')
      ctx.moveTo(10, 10)
      ctx.lineTo(100, 10)
      ctx.lineTo(100, 100)
      ctx.lineTo(10, 100)
      ctx.lineTo(10, 10)
      ctx.stroke()

      ctx.draw()
      this.complete = true
      wx.hideLoading()
    }
  },
  onUnload () {
    this.complete = false
  }
}
</script>

<style scoped lang="scss">
.canvas_wrap{
  position: relative;

}
.canvas {
  width: 300px;
  height: 400px;
  left: 50%;
  top: 20rpx;
  transform: translate(-50%, 0);
  // border-radius: 8px;
  // overflow: hidden;
}
.savePoster{
  position: fixed;
  bottom: 80px;
  left: 50%;
  color: #fff;
  background-color: #0099FF;
  transform: translate(-50%, 0);
}
</style>
