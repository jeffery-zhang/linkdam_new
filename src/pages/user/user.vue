<template>
  <el-container direction="vertical">
    <head-top page="user"></head-top>
    <el-main>
      <div class="user-center">
        <h1 style="text-align:center;margin-bottom: 100px;">{{$t('USER.TITLE')}}</h1>
        <router-view></router-view>
      </div>
    </el-main>
    <foot></foot>
  </el-container>  
</template>

<script>
import headTop from 'comp/header'
import foot from 'comp/footer'
import addrManage from './components/addr-manage'
import orderManage from './components/order-manage'

export default {
  name: 'user',
  components: {
    headTop,
    foot,
    addrManage,
    orderManage,
  },
}
</script>

<style lang="scss" scoped>
@import './../../style-sheets/theme';
@import './../../style-sheets/mixin';

.user-center {
  max-width: 1080px;
  margin: 0 auto;
  padding: 60px 20px 120px;
}
</style>
