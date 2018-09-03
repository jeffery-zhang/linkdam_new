<template>
  <el-col :sm="12" :xs="24" v-loading.fullscreen.lock="loading">
    <div class="product-detail">
      <div class="detail-hd">
        <h1>{{lang === 'zh-CN' ? product.title : product.englishTitle}}</h1>
      </div>
      <div class="detail-desc">
        <p>{{lang === 'zh-CN' ? product.description : product.englishDescription}}</p>
      </div>
      <div class="product-price">
        <el-row class="origin" type="flex" align="middle">
          <el-col :sm="8" :xs="10" class="label">
            {{$t('PRODUCT.PRICE')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail" :class="{delete: product.discountPrice, sale: !product.discountPrice}">
            ￥{{product.price}}
          </el-col>
          <img class="preorder-img" src="./assets/preorder.png" v-if="product.newProduct">
        </el-row>
        <el-row class="sale" type="flex" align="middle" v-show="product.discountPrice">
          <el-col :sm="8" :xs="10" class="label">
            {{$t('PRODUCT.SALE')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail sale">
            ￥{{product.discountPrice}}
          </el-col>
        </el-row>
      </div>
      <div class="detail-desc">
        <p>{{$t('PRODUCT.PREORDER')}}</p>
      </div>
      <div class="options">
        <el-row class="color" type="flex" align="middle">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.COLOR')}}            
          </el-col>
          <el-col :sm="20" :xs="14" class="detail">
            <el-radio-group size="small" v-model="pickedColor">
              <el-radio v-for="(item, index) in product.color" 
                        :key="index" border 
                        :label="item.name">{{lang === 'zh-CN' ? item.name : item.enName}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="amount" type="flex" align="middle">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.AMOUNT')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail">
            <el-input-number size="mini" v-model="count" :min="1"></el-input-number>
          </el-col>
        </el-row>
        <el-row class="promo-code" type="flex" align="middle">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.PROMO')}}            
          </el-col>
          <el-col :sm="20" :xs="14" class="detail">
            <el-input size="mini" v-model="promoCode" style="width:130px" @change="getPromoCode"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="operate">
        <el-row>
          <el-col :span="11">
            <el-button type="primary" @click="buy" :loading="buyLoading">
              <i class="iconfont">&#xe630;</i>
              {{$t('PRODUCT.BUY')}}
            </el-button>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-button type="info" @click="add" :loading="cartLoading">
              <i class="iconfont">&#xe659;</i>
              {{$t('PRODUCT.TO_CART')}}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-col>  
</template>

<script>
import { mapState } from 'vuex';
import getData from 'service/getData'
import postData from 'service/postData'

export default {
  name: 'detail',
  data () {
    return {
      loading: false,
      lang: localStorage.getItem('_lang'),
      product: {},
      pickedColor: '黑色',
      productId: 1,
      count: 1,
      buyLoading: false,
      cartLoading: false,
      promoCode: '',
    }
  },
  computed: {
    ...mapState([
      'isLogged',
    ]),
  },
  methods: {
    getProductInfo() {
      this.loading = true;
      getData().getProductInfo(this.promoCode).then(res => {
        this.loading = false;
        let color = [];
        this.product = res.data[0];
        res.data.forEach(item => {
          const obj = {
            name: item.color,
            enName: item.color === '黑色' ? 'black' : 'white',
          };
          color.push(obj);
        });
        this.product.color = color;
      });
    },
    pickColor(key) {
      this.pickedColor = key;
      this.productId = key === '黑色' ? 1 : 2;
      this.$emit('pickColor', key);
    },
    getPromoCode() {
      sessionStorage.setItem('promoCode', this.promoCode);
      this.getProductInfo();
    },
    addToCart() {
      if (!this.isLogged) {
        this.$router.push('/login/signin');
        return;
      }
      const params = {
        productId: this.productId,
        count: this.count,
        promoCode: this.promoCode,
      };
      return postData().addToCart(params).then(res => {
        this.buyLoading = false;
        this.cartLoading = false;
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        return res;
      });
    },
    add() {
      this.cartLoading = true;
      this.addToCart().then(res => {
        const tip = this.$t('PRODUCT.CART_SUCCESS');
        this.$message.success(tip);
      });
    },
    buy() {
      this.buyLoading = true;
      this.addToCart().then(res => {
        this.$router.push('/purchase/auction');
      });
    },
  },
  mounted () {
    this.getProductInfo();
  },
  watch: {
    pickedColor(nv, ov) {
      if (nv === ov) return;
      this.pickColor(nv);
    }
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme.scss';
@import './../../../style-sheets/mixin.scss';

.product-detail {
  padding: 50px 20px;
  > div {
    padding: 0 20px;
  }
  @media only screen and (max-width: 768px) {
    & {
      padding: 50px 0;
      > div {
        padding: 0 10px;
      }
    }
  }
  .el-col{
    &.label {
      color: $light-grey-color;
    }
    &.detail {
      color: $grey-color;
      &.delete {
        text-decoration: line-through;
      }
      &.sale {
        color: $red-color;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
  .detail-desc {
    p {
      color: $desc-color;
    }
  }
  .product-price {
    margin: 20px 0;
    @include icon-normal('./assets/price_bg.png');
    .el-row {
      padding: 10px 0;
    }
  }
  .options {
    margin: 30px 0;
    .el-row {
      margin: 10px 0;
    }
  }
}
.preorder-img {
  position: absolute;
  right: -50px;
  top: -80px;
  @include wh(150px, 150px);
}
</style>
