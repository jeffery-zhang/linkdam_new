<template>
  <section class="order-manage">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.AUCTION.CONFIRM_ORDER')">
        <cart></cart>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'
import cart from 'comp/cart'

export default {
  name: 'order-manage',
  components: {
    cart,
  },
}
</script>
