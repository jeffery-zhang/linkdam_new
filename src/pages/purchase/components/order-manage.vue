<template>
  <section class="order-manage" v-loading.fullscreen.lock="loading">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.AUCTION.CONFIRM_ORDER')">
        <el-row class="order-item">
          <el-col :md="9" :sm="24">
            <div class="product-thumb el-col-9">
              <img src="./../../../assets/LinkDam-black-01.png">
            </div>
            <div class="product-detail">
              <h4>{{product.title}}</h4>
              <p class="ellipsis" style="width:100%;">{{product.englishTitle}}</p>
            </div>
          </el-col>
          <el-col :md="3" :sm="8" :xs="8">
            {{$t('PURCHASE.AUCTION.COLOR')}}
            黑色
          </el-col>
          <el-col :md="3" :sm="8" :xs="8">
            {{$t('PURCHASE.AUCTION.PRICE') + price}}            
          </el-col>
          <el-col :md="3" :sm="8" :xs="8">
            <el-input-number v-model="count" size="small" :min="1" @change="changeCount"></el-input-number>
          </el-col>
          <el-col class="subtotal" :md="6" :sm="24">
            <span class="hidden-md-and-up">{{$t('PURCHASE.AUCTION.SUBTOTAL')}}</span>
            <span class="subtotal-number highlight">￥{{subtotal}}</span>
          </el-col>
        </el-row>
        <div class="shipping" style="text-align: right;">
          {{$t('PURCHASE.AUCTION.SHIPPING')}}
          <span class="highlight">￥{{shipping}}</span>
        </div>
        <div class="sum" style="text-align: right;">
          {{$t('PURCHASE.AUCTION.SUM')}}
          <span class="sum highlight">
            {{subtotal + shipping}}
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
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'

export default {
  name: 'order-manage',
  data () {
    return {
      loading: false,
      product: {},
      count: 1,
      oldCount: 1,
      shipping: 12,
      timer: null,
    }
  },
  computed: {
    price() {
      return this.product.price * this.product.discount;
    },
    subtotal() {
      return this.price * this.count;
    },
  },
  methods: {
    getOrderInfo() {
      this.loading = true;
      getData().getCart().then(res => {
        this.loading = false;
        this.product = res.data.product;
        this.count = res.data.count;
        this.oldCount = this.count;
      });
    },
    changeCount(count) {
      clearTimeout(this.timer);
      if (count !== this.oldCount) {
        this.timer = setTimeout(() => {
          this.loading = true;
          const params = {
            productId: 1,
            count: count - this.oldCount,
          };
          postData().addToCart(params).then(res => {
            this.loading = false;
            if (!res.result) return;
            this.oldCount = count;
          });
        }, 800);
      }
    },
  },
  mounted () {
    this.getOrderInfo();
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.order-manage {
  margin-top: 60px;
  .order-item {
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
