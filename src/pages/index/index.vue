<template>
  <el-container direction="vertical" v-loading.fullscreen.lock="loading">
    <head-top page="index"></head-top>
    <el-main>
      <banner></banner>
      <section_1></section_1>
      <section_2></section_2>
      <section_3></section_3>
      <section_4></section_4>
      <section_5></section_5>
      <section_6></section_6>
      <section_7></section_7>
      <section_8></section_8>
      <section_9></section_9>
      <section_10></section_10>
      <section_11></section_11>
      <operate></operate>
    </el-main>
    <!-- <el-footer></el-footer> -->
    <foot></foot>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'
import banner from './components/banner'
import section_1 from './components/section_1'
import section_2 from './components/section_2'
import section_3 from './components/section_3'
import section_4 from './components/section_4'
import section_5 from './components/section_5'
import section_6 from './components/section_6'
import section_7 from './components/section_7'
import section_8 from './components/section_8'
import section_9 from './components/section_9'
import section_10 from './components/section_10'
import section_11 from './components/section_11'
import operate from './components/operate'

export default {
  name: 'index',
  components: {
    headTop,
    foot,
    banner,
    section_1,
    section_2,
    section_3,
    section_4,
    section_5,
    section_6,
    section_7,
    section_8,
    section_9,
    section_10,
    section_11,
    operate,
  },
  data () {
    return {
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  },
}
</script>

<style lang="scss" src="./components/common.scss"></style>
