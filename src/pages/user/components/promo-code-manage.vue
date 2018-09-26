<template>
  <div class="promo-code-container" v-loading.fullscreen.lock="loading">
    <el-menu mode="horizontal" @select="handleSelect" active-text-color="#349aff" :default-active="page">
      <el-menu-item index="address-manage" >
        {{$t('USER.ADDR_MANAGE')}}
      </el-menu-item>
      <el-menu-item index="order-manage" >
        {{$t('USER.ORDER_MANAGE')}}
      </el-menu-item>
      <el-menu-item index="promo-code-manage">
        {{$t('USER.PROMO_CODE_MANAGE')}}
      </el-menu-item>
      <el-menu-item index="points-manage">
        {{$t('USER.POINTS_MANAGE')}}
      </el-menu-item>
      <el-menu-item index="points-exchange">
        {{$t('USER.POINTS_EXCHANGE')}}
      </el-menu-item>
    </el-menu>
    <el-row v-if="!!promoCode" style="padding:40px 20px;border-bottom:1px solid #e6e6e6">
      <el-col :md="9">
        <span>{{$t('USER.YOUR_CODE')}}</span>
        <strong style="font-size:20px;color: #FF0036">{{promoCode}}</strong>
        <p class="focus">{{$t('HEADER.PS')}}{{$t('POINTS.CODE_TIP')}}</p>
      </el-col>
      <el-col :md="9">
        <span>{{$t('USER.YOUR_COMMISSION')}}{{commission}}DAM</span>
      </el-col>
    </el-row>
    <div class="sharing-copy">
      <h4 style="text-align:center">{{$t('POINTS.ARTICLE')}}</h4>
      <div class="container" id="share">
        链盾跨链全币种硬件钱包，全球首款蓝牙加密硬件钱包，数字货币管理专家。<br>
        支持全币种，三重加密，永不触网，超薄易携带。<br>
        【在售价】{{price}} 元<br>
        【折后价】{{parseInt(discountPrice)}} 元<br>
        【折扣码】{{promoCode}}<br>
        【下单链接】http://linkdam.com/#/product<br>
        <br>-----------------<br><br>
        {{$t('USER.COPY_TIP')}}
      </div>
      <div class="btn" style="text-align:center">
        <el-button type="primary"
          round
          data-clipboard-target="#share"
          style="max-width:600px;margin:0 auto;"
          id="copy">{{$t('POINTS.COPY')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import get from 'service/getData'

export default {
  name: 'promo-code-manage',
  data () {
    return {
      loading: false,
      page: 'promo-code-manage',
      promoCode: '',
      commission: 0,
      price: 0,
      discountPrice: 0,
    }
  },
  methods: {
    getData() {
      this.loading = true;
      get().getProductInfo().then(res => {
        this.price = parseInt(res.data[0].discountPrice)
        get().getPromoCode().then(res => {
          this.promoCode = res.data.promoCode;
          this.discountPrice = res.data.discountPercent * this.price;
          this.commission = parseInt(res.data.commissionPointsPercent * this.price);
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      }).catch(err => {
        this.loading = false;
      })
    },
    handleSelect(name) {
      this.$router.push({
        name,
      });
    },
  },
  mounted() {
    this.getData()
    const clipboard = new Clipboard('#copy')
    clipboard.on('success', () => {
      this.$message.success(this.$t('POINTS.COPY_SUCCESS'))
    })
  },
}
</script>

<style lang="scss" scoped>
.sharing-copy {
  margin-top: 40px;
  .container {
    max-width: 600px;
    margin: 40px auto;
    padding: 30px 60px 60px;
    border-radius: 20px;
    background-color: #ccc;
  }
}
</style>
