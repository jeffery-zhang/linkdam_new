<template>
  <section class="product-preview index-section" id="section_11">
    <div class="product-feature">
      <div class="head">
        <div class="number">
          <img src="./assets/09.png"/>
        </div>
        <div class="feature">
          <p class="en-feature">
            APP
          </p>
          <h3 class="cn-feature">
            <strong>{{$t('INDEX.SECTION_11.TITLE_1')}}</strong>
          </h3>
        </div>
      </div>
      <div class="others">
        <p>{{$t('INDEX.SECTION_11.FEATURE_1')}}</p>
        <p>{{$t('INDEX.SECTION_11.FEATURE_2')}}</p>
        <p>{{$t('INDEX.SECTION_11.FEATURE_3')}}<span>{{$t('INDEX.SECTION_11.FEATURE_4')}}</span></p>
      </div>
    </div>
    <div class="btn" style="text-align:center">
      <el-popover class="hidden-sm-and-down" placement="bottom" trigger="click" width="480">
        <el-row>
          <el-col :span="12" style="padding: 20px;text-align:center">
            <i class="iconfont">&#xe6ef;</i> Android<br>
            <canvas style="width:150px;height:150px;" id="android"></canvas>
          </el-col>
          <el-col :span="12" style="padding: 20px;text-align:center">
            <i class="iconfont">&#xe64b;</i> iOS<br>
            <canvas style="width:150px;height:150px;" id="ios"></canvas>
          </el-col>
        </el-row>
        
        <el-button slot="reference" type="primary" style="width:200px;">{{$t('INDEX.SECTION_11.APP')}}</el-button>
      </el-popover>
      <el-button class="hidden-md-and-up"
        type="primary"
        style="width:200px"
        @click="download"
        size="mini">{{$t('INDEX.SECTION_11.APP')}}</el-button>
    </div>
    <div class="product-img">
      <img src="./assets/11_app.png" alt="LinkDam"/>
    </div>
  </section>
</template>

<script>
  import Qrcode from 'qrcode'

  export default {
    name: 'section_11',
    data () {
      return {
        android: 'http://pgyer.com/linkdam',
        ios: 'https://fir.im/ioslinkdam',
      }
    },
    methods: {
      download() {
        this.$router.push({
          name: 'download',
        })
      },
    },
    mounted () {
      const android = document.querySelector('#android')
      const ios = document.querySelector('#ios')
      Qrcode.toCanvas(android, this.android)
      Qrcode.toCanvas(ios, this.ios)
    },
  }
</script>

<style lang="scss" scoped>
  #section_11 {
    padding-bottom: 0;
  }

</style>
