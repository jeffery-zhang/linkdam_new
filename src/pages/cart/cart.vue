<template>
  <el-container direction="vertical">
    <head-top page="cart"></head-top>
    <el-main>
      <div class="container">
        <el-row class="title">
          <h1>
            {{$t('PURCHASE.CART.TITLE')}}
          </h1>
        </el-row>
        <cart></cart>
      </div>
    </el-main>
    <foot></foot>
  </el-container>
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'
import cart from 'comp/cart'

export default {
  name: 'user-cart',
  components: {
    headTop,
    foot,
    cart,
  },
}
</script>

<style lang="scss" scoped>
@import './../../style-sheets/theme';
@import './../../style-sheets/mixin';

.el-main {
  .container {
    margin: 0 auto;
    padding: 100px 20px 120px;
    @media only screen and (min-width: 1024px) {
      width: 980px;
    }
    .title {
      padding: 30px 0;
      border-bottom: 1px solid $light-border;
    }
  }
}
</style>
