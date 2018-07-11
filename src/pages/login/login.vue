<template>
  <el-container direction="vertical">
    <head-top page="signin"></head-top>
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
  name: 'login',
  components: {
    headTop,
    foot,
  },
}
</script>
