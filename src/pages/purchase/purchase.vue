<template>
  <el-container>
    <head-top></head-top>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>  
</template>

<script>
import headTop from 'comp/header'

export default {
  name: 'purchase',
  components: {
    headTop,
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  min-height: calc(100vh - 60px);
  padding: 60px 20px 20px;
}
</style>
