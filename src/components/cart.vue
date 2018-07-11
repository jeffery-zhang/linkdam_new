<template>
  <div class="cart-container" v-loading.fullscreen.lock="loading">
    <div class="cart-list">
      <el-row v-for="product in products" class="cart-item" :key="product.id">
        <el-col :md="9" :sm="24">
          <div class="product-thumb el-col-9">
            <img src="./../assets/LinkDam-black-01.png" v-if="product.id == 1">
            <img src="./../assets/LinkDam-white-01.png" v-if="product.id == 2">
          </div>
          <div class="product-detail">
            <h4>{{product.title}}</h4>
            <p class="ellipsis" style="width:100%;">{{product.englishTitle}}</p>
          </div>
        </el-col>
        <el-col :md="3" :sm="8" :xs="8">
          {{$t('PURCHASE.AUCTION.COLOR')}}
          {{product.color}}
        </el-col>
        <el-col :md="3" :sm="8" :xs="8">
          {{$t('PURCHASE.AUCTION.PRICE') + product.price * product.discount}}            
        </el-col>
        <el-col :md="3" :sm="8" :xs="8">
          <el-input-number v-model="product.count" size="small" :min="1" @change="changeCount"></el-input-number>
        </el-col>
        <el-col class="subtotal" :md="6" :sm="24">
          <span class="hidden-md-and-up">{{$t('PURCHASE.AUCTION.SUBTOTAL')}}</span>
          <span class="subtotal-number highlight">￥{{product.price * product.discount * product.count}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="shipping" style="text-align: right;">
      {{$t('PURCHASE.AUCTION.SHIPPING')}}
      <span class="highlight">￥{{fare}}</span>
    </div>
    <div class="sum" style="text-align: right;">
      {{$t('PURCHASE.AUCTION.SUM')}}
      <span class="sum highlight">
        {{sum}}
      </span>
    </div>
    <el-row style="margin-top: 20px;">
      <el-col :md="{ span: 8, offset: 16 }"
              :sm="{ span: 12, offset: 12 }"
              :xs="24">
        <el-button type="danger">
          {{$t('PURCHASE.AUCTION.CONFIRM')}}
        </el-button>
      </el-col>
    </el-row>
  </div>  
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'

export default {
  name: 'cart',
  data () {
    return {
      loading: false,
      products: [],
      fare: 0,
      timer: null,
    }
  },
  computed: {
    sum() {
      let sum = 0;
      this.products.forEach(item => {
        sum += item.price * item.discount * item.count;
      });
      sum += parseInt(this.fare);
      return sum;
    }
  },
  methods: {
    getCartInfo() {
      this.loading = true;
      getData().getCart().then(res => {
        console.log(res.data);
        this.loading = false;
        this.products = res.data.product;
        this.products.forEach(item => {
          this.fare = item.fare;
          item.oldCount = item.count;
        });
      });
    },
    changeCount() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        for (let i = 0; i < this.products.length; i++) {
          const item = this.products[i];
          if (item.count == item.oldCount) continue;
          this.loading = true;
          const params = {
            productId: item.id,
            count: item.count - item.oldCount,
          };
          postData().addToCart(params).then(res => {
            this.loading = false;
            if (!res.result) return;
            this.products[i].oldCount = item.count;
          });
        }
      }, 800);
    },
  },
  mounted () {
    this.getCartInfo();
  },
}
</script>

<style lang="scss" scoped>
@import './../style-sheets/theme';
@import './../style-sheets/mixin';

.cart-container {
  .cart-list {
    padding: 30px 0;
    .cart-item {
      padding: 30px 0;
      border-bottom: 1px solid $light-border;
    }
    .el-col {
      display: flex;
      justify-content: center;
      height: 100%;
      margin: 10px 0;
      font-size: 14px;
      color: $desc-color;
      h4 {
        font-size: 20px;
        color: $grey-color;
      }
      &.subtotal {
        justify-content: flex-end;
        align-items: center;
        .subtotal-number {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  .highlight {
    color: $red-color;
    &.sum {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
