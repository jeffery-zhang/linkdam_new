<template>
  <el-container direction="vertical">
    <head-top page="product"></head-top>
    <el-main>
      <div class="product-container" style="overflow:hidden">
        <el-row>
          <gallery :color="color"></gallery>
          <detail @pickColor="changeColor"></detail>  
        </el-row>
        <!-- <introduction></introduction> -->
      </div>
    </el-main>
    <foot></foot>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'
import gallery from './components/gallery'
import detail from './components/detail'
import introduction from './components/introduction'

export default {
  name: 'product',
  beforeRouteEnter(to, from, next) {
    next(() => {
      scrollTo(0, 0);
    });
  },
  components: {
    headTop,
    foot,
    gallery,
    detail,
    introduction,
  },
  data () {
    return {
      color: '黑色',
    }
  },
  methods: {
    changeColor(key) {
      this.color = key;
    }
  },
}
</script>

<style lang="scss" scoped>
  .el-main {
    .product-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 20px 120px;
    }
  }
</style>
