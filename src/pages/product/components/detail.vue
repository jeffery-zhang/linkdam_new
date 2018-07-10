<template>
  <el-col :sm="12" :xs="24" v-loading.fullscreen.lock="loading">
    <div class="product-detail">
      <div class="detail-hd">
        <h1>{{product.title}}</h1>
      </div>
      <div class="detail-desc">
        <p>{{product.englishTitle}}</p>
      </div>
      <div class="product-price">
        <el-row class="origin">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.PRICE')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail" :class="{delete: !!product.discount}">
            ￥{{product.price}}
          </el-col>
        </el-row>
        <el-row class="sale" type="flex" align="middle" v-show="product.discount">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.SALE')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail sale">
            ￥{{product.price * product.discount}}
          </el-col>
        </el-row>
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
                        :label="item">{{item}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="amount" type="flex" align="middle">
          <el-col :sm="4" :xs="10" class="label">
            {{$t('PRODUCT.AMOUNT')}}
          </el-col>
          <el-col :sm="20" :xs="14" class="detail">
            <el-input-number size="mini" v-model="count"></el-input-number>
          </el-col>
        </el-row>
      </div>
      <div class="operate">
        <el-row>
          <el-col :span="11">
            <el-button type="primary" @click="buy" :loading="buyLoading">
              {{$t('PRODUCT.BUY')}}
            </el-button>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-button type="info" @click="add" :loading="cartLoading">
              <i class="el-icon-goods"></i>
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
      loading: true,
      product: {},
      pickedColor: '黑色',
      count: 1,
      buyLoading: false,
      cartLoading: false,
    }
  },
  computed: {
    ...mapState([
      'isLogged',
    ]),
  },
  methods: {
    getProductInfo() {
      getData().getProductInfo().then(res => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        let color = res.data.color;
        color = color.substring(1, color.length - 1).split(',');
        color.forEach((item, index) => {
          color[index] = item.substring(1, item.length - 1);
        });
        this.product = res.data;
        this.product.color = color;
      });
    },
    pickColor(key) {
      this.pickedColor = key;
      this.$emit('pickColor', key);
    },
    addToCart() {
      if (!this.isLogged) {
        this.$router.push('/login/signin');
        return;
      }
      const params = {
        productId: this.product.id,
        color: this.pickedColor,
        count: this.count,
      };
      return postData().addToCart(params).then(res => {
        if (!res.result) {
          this.$message.error(res.message);
        }
        this.buyLoading = false;
        this.cartLoading = false;
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
</style>
