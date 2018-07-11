<template>
  <el-container direction="vertical">
    <head-top></head-top>
    <el-main>
      <router-view></router-view>
    </el-main>
    <foot></foot>
  </el-container>  
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'

export default {
  name: 'purchase',
  components: {
    headTop,
    foot,
  },
}
</script>

<style lang="scss" scoped>

</style>
