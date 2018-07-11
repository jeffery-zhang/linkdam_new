<template>
  <div class="main-container">
    <el-row class="breadcrumb" type="flex" align="middle">
      <el-col :sm="3" :xs="7">
        <span style="color: #adadbd">
          {{$t('PURCHASE.AUCTION.LOCAL')}}
        </span>
      </el-col>
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product' }">{{$t('PURCHASE.AUCTION.PROD_PAGE')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('PURCHASE.AUCTION.BUY_PAGE')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <address-manage></address-manage>
    <order-manage></order-manage>
  </div>
</template>

<script>
import addressManage from './address-manage'
import orderManage from './order-manage'

export default {
  name: 'auction',
  components: {
    addressManage,
    orderManage,
  },
}
</script>

<style lang="scss" scoped>
.main-container {
  margin: 0 auto;
  padding: 40px 20px 120px;
  @media only screen and (min-width: 1024px) {
    width: 980px;
  }
  .breadcrumb {
    margin: 30px 0;
  }
}
</style>
