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
              <el-col :md="15">
                <p>
                  {{$t('PURCHASE.PAYMENT.WECHAT_1')}}
                </p>
                <p>
                  {{$t('PURCHASE.PAYMENT.WECHAT_2')}}
                </p>
                <p class="order-id">
                  <span id="wxOrder">{{orderId}}</span>
                  <i class="iconfont copy-btn"
                    id="wxCopy"
                    data-clipboard-target="#wxOrder">&#xe634;</i>
                </p>
                <p class="focus">{{$t('PURCHASE.PAYMENT.TRANSFER_TIP_2')}}</p>
                <img class="hidden-lg-and-up" :src="wxQrcode" @click="showLargeImg(wxQrcode)">
              </el-col>
              <el-col class="hidden-md-and-down" :span="9">
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
              <el-col :md="15">
                <p>
                  {{$t('PURCHASE.PAYMENT.ALIPAY_1')}}
                </p>
                <p>
                  {{$t('PURCHASE.PAYMENT.ALIPAY_2')}}
                </p>
                <p>
                  支付宝账号: 
                  <span id="aliAccount" style="font-size:18px;font-weight:bold;">13880080712</span>
                  <i class="iconfont copy-btn"
                    id="aliAccountCopy"
                    style="font-size:16px"
                    data-clipboard-target="#aliAccount">&#xe634;</i>
                </p>
                <p class="order-id">
                  <span id="aliOrder">{{orderId}}</span>
                  <i class="iconfont copy-btn"
                    id="aliCopy"
                    data-clipboard-target="#aliOrder">&#xe634;</i>
                </p>
                <p class="focus">{{$t('PURCHASE.PAYMENT.TRANSFER_TIP_2')}}</p>
                <img class="hidden-lg-and-up" :src="aliQrcode">
              </el-col>
              <el-col class="hidden-md-and-down" :span="9">
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
    <div class="large-img-container" v-show="imgShow" @click="imgShow = false;">
      <img :src="img" class="absolute-center">
    </div>
  </section>
</template>

<script>
import Clipboard from 'clipboard'
import postData from 'service/postData'
import savableImage from 'comp/savableImage'
import wxQrcode from './assets/wx-qrcode.png'
import aliQrcode from './assets/ali-qrcode.png'

export default {
  name: 'pay-method',
  props: [
    'orderId',
    'id',
  ],
  components: {
    savableImage,
  },
  data () {
    return {
      method: 1,
      confirming: false,
      wxQrcode,
      aliQrcode,
      img: '',
      imgShow: false,
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
    showLargeImg(img) {
      this.img = img;
      this.imgShow = true;
    },
  },
  mounted () {
    const wxCopy = new Clipboard('#wxCopy')
    const aliCopy = new Clipboard('#aliCopy')
    const aliAccountCopy = new Clipboard('#aliAccountCopy')
    wxCopy.on('success', () => {
      this.$message.success(this.$t('POINTS.COPY_SUCCESS'))
    })
    aliCopy.on('success', () => {
      this.$message.success(this.$t('POINTS.COPY_SUCCESS'))
    })
    aliAccountCopy.on('success', () => {
      this.$message.success(this.$t('POINTS.COPY_SUCCESS'))
    })
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
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: bold;
      color: $red-color;
    }
      .copy-btn {
        margin-left: 15px;
        font-size: 20px;
        font-weight: normal;
        color: #a9a9a9;
        cursor: pointer;
      }
  }
  .large-img-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    z-index: 999;
    img {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
