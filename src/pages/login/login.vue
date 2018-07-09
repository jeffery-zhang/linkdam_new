<template>
  <el-container>
    <head-top page="signin"></head-top>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
export default {
  name: 'login',
  components: {
    headTop,
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  position: relative;
  min-height: calc(100vh - 60px);
}
</style>

