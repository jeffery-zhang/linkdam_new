<template>
  <el-container direction="vertical">
    <head-top></head-top>
    <div class="media-banner">
      <img class="hidden-xs-only" src="./assets/media_banner.png" alt="Media Reports">
      <img class="hidden-sm-and-up" src="./assets/media_banner-mobile.png" alt="Media Reports">
    </div>
    <el-main class="media-container">
      <router-view></router-view>
    </el-main>
    <foot></foot>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'

export default {
  name: 'media',
  components: {
    headTop,
    foot,
  },
}
</script>

<style lang="scss">
.media-banner {
  padding-top: 60px;
}
.media-container {
  padding-top: 0;
  .el-breadcrumb {
    padding: 20px;
    background-color: #fafafa;
  }
}
</style>
