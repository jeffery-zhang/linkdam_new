<template>
  <el-container>
    <head-top page="product"></head-top>
    <el-main>
      <div class="product-container">
        <el-row>
          <gallery :color="color"></gallery>
          <detail @pickColor="changeColor"></detail>  
        </el-row>
        <introduction></introduction>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
import gallery from './components/gallery'
import detail from './components/detail'
import introduction from './components/introduction'

export default {
  name: 'product',
  components: {
    headTop,
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
    padding: 60px 0 100px;
    min-height: calc(100vh - 60px);
    .product-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>
