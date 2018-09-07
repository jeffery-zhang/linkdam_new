<template>
  <section class="pay-method">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.PAYMENT.PAY_METHOD')">
        <el-collapse v-model="method" accordion>
          <el-collapse-item :name="1">
            <template slot="title">
              <i class="iconfont wechat">&#xe657;</i>
              {{$t('PURCHASE.PAYMENT.WECHAT')}}
            </template>
            <el-row>
              <el-col :span="15">
                <p>
                  {{$t('PURCHASE.PAYMENT.WECHAT_1')}}
                </p>
                <p>
                  {{$t('PURCHASE.PAYMENT.WECHAT_2')}}
                </p>
                <p class="order-id">
                  {{orderId}}
                </p>
              </el-col>
              <el-col :span="9">
                <img src="./assets/wx-qrcode.png">
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item :name="2">
            <template slot="title">
              <i class="iconfont alipay">&#xe600;</i>
              {{$t('PURCHASE.PAYMENT.ALIPAY')}}
            </template>
            <el-row>
              <el-col :span="15">
                <p>
                  {{$t('PURCHASE.PAYMENT.ALIPAY_1')}}
                </p>
                <p>
                  {{$t('PURCHASE.PAYMENT.ALIPAY_2')}}
                </p>
                <p class="order-id">
                  {{orderId}}
                </p>
              </el-col>
              <el-col :span="9">
                <img src="./assets/ali-qrcode.png">
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-row>
          <el-col :md="6" :sm="12" style="margin-top: 20px;">
            <el-button type="primary" @click="confirmPayment" :loading="confirming">
              {{$t('PURCHASE.PAYMENT.CONFIRM')}}              
            </el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import postData from 'service/postData'

export default {
  name: 'pay-method',
  props: [
    'orderId',
    'id',
  ],
  data () {
    return {
      method: 1,
      confirming: false,
    }
  },
  methods: {
    confirmPayment() {
      this.confirming = true;
      const params = {
        orderId: this.id,
      };
      postData().payOrder(params).then(res => {
        this.confirming = false;
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        this.$router.push('/purchase/success');
      });
    },
  },
  mounted () {
    
  },
}
</script>

<style lang="scss">
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.pay-method {
  .el-collapse-item {
    .el-collapse-item__header {
      line-height: 48px;
      font-size: 20px;
      i {
        font-size: 24px;
        &.wechat {
          color: #51c332;          
        }
        &.alipay {
          color: #009fe9;
        }
        &.paypal {
          @include wh(30px, 30px);
          @include icon-normal('./assets/paypal.svg');
        }
      }
    }
  }
  .el-col {
    padding: 20px;
    img {
      max-width: 200px;
    }
    .order-id {
      font-size: 30px;
      font-weight: bold;
      color: $red-color;
    }
  }
}
</style>
