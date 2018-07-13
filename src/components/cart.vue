<template>
  <div class="cart-container" v-loading.fullscreen.lock="loading">
    <div class="cart-list" v-if="products.length > 0">
      <el-row>
        <el-button type="text" @click="clear">
          <i class="iconfont">&#xe639;</i>
          {{$t('PURCHASE.CART.CLEAR')}}
          </el-button>
      </el-row>
      <el-row v-for="product in products" class="cart-item" :key="product.id">
        <div class="delete-button hidden-md-and-up" @click="removeProduct(product.id)">
          <i class="iconfont">&#xe642;</i>
        </div>
        <el-col :md="9" :sm="24">
          <div class="product-thumb el-col-9">
            <img src="./../assets/LinkDam-black-01.png" v-if="product.id == 1">
            <img src="./../assets/LinkDam-white-01.png" v-if="product.id == 2">
          </div>
          <div class="product-detail">
            <h4>
              {{product.title}}
            </h4>
            <p class="ellipsis" style="width:100%;">{{product.englishTitle}}</p>
          </div>
        </el-col>
        <el-col :md="3" :sm="8" :xs="8">
          {{$t('PURCHASE.AUCTION.COLOR')}}
          {{product.color}}
        </el-col>
        <el-col :md="3" :sm="8" :xs="8" style="flex-direction: column;">
          <p style="text-decoration: line-through;">{{$t('PURCHASE.AUCTION.PRICE') + product.price}}</p>
          <p>{{$t('PURCHASE.AUCTION.CURR_PRICE') + product.price * product.discount}}</p>
        </el-col>
        <el-col :md="3" :sm="8" :xs="8">
          <el-input-number v-model="product.count" size="small" :min="1" @change="changeCount"></el-input-number>
        </el-col>
        <el-col class="subtotal" :md="3" :sm="24">
          <span class="hidden-md-and-up">{{$t('PURCHASE.AUCTION.SUBTOTAL')}}</span>
          <span class="subtotal-number highlight">￥{{product.price * product.discount * product.count}}</span>
        </el-col>
        <el-col :md="3" class="hidden-sm-and-down">
          <el-button type="text" @click="removeProduct(product.id)">
            <i class="iconfont">&#xe642;</i>
            {{$t('PURCHASE.AUCTION.DELETE')}}
            </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="remark-container" v-if="!!note && products.length > 0">
      <el-row>
        <el-col :sm="12" class="title">
          {{$t('PURCHASE.CART.REMARK')}}
        </el-col>
        <el-col :sm="12">
          <el-input type="textarea" rows="2" v-model="remark" :placeholder="$t('PURCHASE.CART.ENTER_REMARK')"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="shipping" style="text-align: right;" v-if="products.length > 0">
      {{$t('PURCHASE.AUCTION.SHIPPING')}}
      <span class="highlight">￥{{fare}}</span>
    </div>
    <div class="sum" style="text-align: right;" v-if="products.length > 0">
      {{$t('PURCHASE.AUCTION.SUM')}}
      <span class="sum highlight">
        ￥{{sum}}
      </span>
    </div>
    <el-row style="margin-top: 20px;" v-if="products.length > 0">
      <el-col :md="{ span: 8, offset: 16 }"
              :sm="{ span: 12, offset: 12 }"
              :xs="24">
        <el-button type="danger" @click="settlement" :loading="payLoading">
          <i class="iconfont">&#xe630;</i>
          {{$t('PURCHASE.AUCTION.CONFIRM')}}
        </el-button>
      </el-col>
    </el-row>
    <div class="empty-cart" v-if="products.length == 0">
      <i class="iconfont">&#xe60d;</i>
      {{$t('PURCHASE.CART.EMPTY')}}<br>
      <a href="#/product" class="shop">{{$t('PURCHASE.CART.SHOPPING')}}</a>
    </div>
  </div>  
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'

export default {
  name: 'cart',
  props: [
    'note',
    'payLoading',
  ],
  data () {
    return {
      loading: false,
      products: [],
      fare: 0,
      remark: '',
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
    removeProduct(productId) {
      const params = {
        productId,
      };
      postData().removeProduct(params).then(res => {
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        const tip = this.$t('PURCHASE.CART.REMOVED');
        this.$message.success(tip);
        this.getCartInfo();
      });
    },
    clear() {
      postData().clearCart().then(res => {
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        const tip = this.$t('PURCHASE.CART.CLEARED');
        this.$message.success(tip);
        this.getCartInfo();
      });
    },
    settlement() {
      this.$emit('settlement', this.remark);
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 30px 0;
      border-bottom: 1px solid $light-border;
    }
    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;
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
    .delete-button {
      position: absolute;
      right: 10px;
      top: 10px;
      i {
        color: $theme-color;
        font-size: 20px;
      }
    }
  }
  .remark-container {
    margin: 20px 0;
    .el-col.title {
      margin-bottom: 10px;
      @media only screen and (min-width: 768px) {
        padding: 0 20px;
        text-align: right;
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
  .empty-cart {
    padding: 60px 20px;
    font-size: 20px;
    text-align: center;
    i {
      display: block;
      margin-bottom: 20px;
      font-size: 50px;
    }
    .shop {
      margin-top: 40px;
      color: $theme-color;
    }
  }
}
</style>
