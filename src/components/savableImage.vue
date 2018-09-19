<template>
  <div class="container">
    <img :src="image" @click="showCanvas">
    <div class="canvas-wrapper" v-if="canvasShow">
      <canvas id="canvas" class="absolute-center" width="300" height="300"></canvas>
      <i class="wrapper-icon el-icon-close" @click="canvasShow = false"></i>
      <i class="save-icon el-icon-download" @click="saveToImage"></i>
    </div>
  </div>
</template>

<script>
import Canvas2Image from 'service/canvas2image'

export default {
  name: 'savableImage',
  props: ['image'],
  data () {
    return {
      canvasShow: false,
    }
  },
  methods: {
    showCanvas() {
      this.canvasShow = true;
      setTimeout(() => {
        this.initCanvas();
      }, 500)
    },
    initCanvas() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.image;
      ctx.drawImage(img, 0, 0, 300, 300);
    },
    saveToImage() {
      Canvas2Image.saveAsImage(document.getElementById('canvas'), 300, 300, 'png');
    },
  },
}
</script>

<style lang="scss" scoped>
.canvas-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .7);
  z-index: 999;
  #canvas {

  }
  .wrapper-icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    font-size: 32px;
    color: #fff;
  }
  .save-icon {
    position: absolute;
    right: 0;
    bottom: 10%;
    padding: 10px;
    font-size: 40px;
    color: #fff;
  }
}
</style>
