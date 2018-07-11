<template>
  <div class="product-introduction">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane :label="$t('PRODUCT.DETAIL')" name="detail">
        <section class="container">
          <img src="./assets/prod-assets.png" alt="LINKDAM"/>
          <img src="./assets/prod-coins.png" alt="LINKDAM"/>
          <img src="./assets/prod-multi-address.png" alt="LINKDAM"/>
          <img src="./assets/prod-operation.png" alt="LINKDAM"/>
          <img src="./assets/prod-payment.png" alt="LINKDAM"/>
          <img src="./assets/prod-portable.png" alt="LINKDAM"/>
        </section>
      </el-tab-pane>
      <el-tab-pane :label="$t('PRODUCT.SPECIFY')" name="specify">配置sdasdasdasd管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'introduction',
  data () {
    return {
      activeTab: 'detail',
    }
  },
}
</script>

<style lang="scss" scoped>
.product-introduction {
  margin-top: 100px;
}
</style>
