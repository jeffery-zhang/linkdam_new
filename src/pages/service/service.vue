<template>
    <el-container direction="vertical">
    <head-top page="service"></head-top>
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
  name: 'service',
  components: {
    headTop,
    foot,
  },
}
</script>
