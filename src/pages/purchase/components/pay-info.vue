<template>
  <section class="pay-info">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.PAYMENT.PAY_INFO')">
        <el-row>
          <el-col :sm="18" :xs="24">
            <p>
              {{$t('PURCHASE.PAYMENT.SUCCESS')}}
            </p>
            <p>
              {{$t('PURCHASE.PAYMENT.TIME')}}
              {{timeTransfer(order.createTime)}}
            </p>
            <p>
              {{$t('PURCHASE.PAYMENT.ORDER_ID')}}
              <strong>{{order.orderId}}</strong>
            </p>
          </el-col>
          <el-col :sm="6" :xs="24">
            <p>
              {{$t('PURCHASE.PAYMENT.PAY_AMOUNT')}}
            </p>
            <p style="margin-top: 10px;">
              <strong style="font-size: 30px;margin-left: -6px;">￥{{order.payTotalRmb}}</strong>
            </p>
          </el-col>
        </el-row>
        <p class="focus">{{$t('PURCHASE.PAYMENT.TRANSFER_TIP_1')}}</p>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import timeTransfer from 'service/timeTransfer'

export default {
  name: 'pay-info',
  props: [
    'order',
  ],
  methods: {
    timeTransfer(time) {
      return timeTransfer(time);
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.pay-info {
  margin-bottom: 60px;
  .el-row {
    padding: 40px 20px;
    border: 1px solid $theme-color;
    .el-col {
      @media only screen and (min-width: 768px) {
        &:first-of-type {
          border-right: 1px solid $light-border;
        }
        &:not(:first-of-type) {
          padding-left: 30px;
        }
      }
      @media only screen and (max-width: 767px) {
        &:first-of-type {
          padding-bottom: 30px;
          border-bottom: 1px solid $light-border;
        }
        &:not(:first-of-type) {
          padding-top: 30px;
        }
      }
      p {
        color: $light-grey-color;
        strong {
          font-size: 24px;
          color: $red-color;
        }
      }
    }
  }
  .focus {
    margin: 10px 0;
    font-weight: bold;
    color: $red-color;
  }
}
</style>
