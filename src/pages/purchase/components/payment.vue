<template>
  <div class="main-container">
    <el-row class="breadcrumb" type="flex" align="middle">
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product' }">{{$t('PURCHASE.AUCTION.PROD_PAGE')}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/purchase/auction' }">{{$t('PURCHASE.AUCTION.BUY_PAGE')}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('PURCHASE.PAYMENT.PAY_PAGE')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <pay-info :order="order"></pay-info>
    <pay-method :order-id="order.orderId" :id="order.id"></pay-method>
  </div>
</template>

<script>
import payInfo from './pay-info'
import payMethod from './pay-method'

export default {
  name: 'payment',
  beforeRouteEnter(to, from, next) {
    next(() => {
      scrollTo(0, 0);
    });
  },
  components: {
    payInfo,
    payMethod,
  },
  data () {
    return {
      order: {},
    }
  },
  methods: {
    getOrderInfo() {
      this.order = this.$route.params.order;
      if (this.order === '[object Object]') {
        const orderInfo = sessionStorage.getItem('orderInfo');
        this.order = JSON.parse(orderInfo);
        if (!this.order || typeof this.order === 'string') {
          this.$router.push('/product');
        }
      }
      sessionStorage.setItem('orderInfo', JSON.stringify(this.order));
    },
  },
  mounted() {
    this.getOrderInfo();
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
