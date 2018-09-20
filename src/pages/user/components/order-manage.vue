<template>
  <div class="orders-container" v-loading.fullscreen.lock="loading">
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
    <div class="order-list" v-if="orders.length > 0">
      <div class="order-item" v-for="(order, index) in orders" :key="index">
        <el-row class="grey-bg">
          <el-col :sm="9">
            {{timeTransfer(order.createTime)}}
          </el-col>
          <el-col :sm="15">
            {{$t('USER.ORDER_ID')}}{{order.orderId}}
          </el-col>
        </el-row>
        <el-row class="bordered">
          <el-col :sm="9">
            <div class="product" v-for="(item, i) in order.products" :key="i">
              <div class="thumb">
                <img :src="item.color === '白色' ? whiteImg : blackImg">
              </div>
              <span class="count">
                * {{item.count}}
              </span>
            </div>
          </el-col>
          <el-col :sm="5">
            {{$t('USER.RECEIVER')}}{{order.address.userName}}
          </el-col>
          <el-col :sm="5">
            {{$t('USER.STATUS')}}{{showStatus(order.status)}}
          </el-col>
          <el-col :sm="5" class="operate">
            <span v-if="order.status == 2 || order.status == 3 || order.status == 5">{{$t('USER.INOPERABLE')}}</span>
            <el-button type="text" v-if="order.status == 1" @click="cancelOrder(order.id)">{{$t('USER.CANCEL')}}</el-button>
            <el-button type="text" v-if="order.status == 4" @click="deleteOrder(order.id)">{{$t('USER.DELETE')}}</el-button>
          </el-col>
        </el-row>
        <el-row class="grey-bg">
          <el-col :sm="12" :xs="12">
            {{$t('USER.SUM')}}
            ￥{{order.payTotalRmb}}
          </el-col>
          <el-col :sm="12" :xs="12">
            {{$t('USER.DISCOUNT')}}
            ￥{{order.discountRmb}}
          </el-col>
        </el-row>
        <el-row class="bordered">
          <el-col :sm="8">
            <p>
              {{$t('USER.RECEIVER')}}
              {{order.address.userName}}
            </p>
            <p>
              {{$t('USER.PHONE')}}
              {{order.address.phone}}
            </p>
          </el-col>
          <el-col :sm="16">
            <p>
              {{$t('USER.ADDRESS')}}
              {{order.address.country}} {{order.address.address}}
            </p>
            <p v-show="order.expressNo">
              {{$t('USER.EXPRESS_NO')}}
              {{order.expressNo}}
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="empty" v-if="orders.length === 0">
      暂无订单记录
    </div>
  </div>
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'
import timeTransfer from 'service/timeTransfer'
import blackImg from 'assets/LinkDam-black-01.png'
import whiteImg from 'assets/LinkDam-white-01.png'

export default {
  name: 'order-manage',
  data () {
    return {
      page: 'order-manage',
      loading: false,
      orders: [],
      blackImg,
      whiteImg,
    }
  },
  methods: {
    handleSelect(name) {
      this.$router.push({
        name,
      });
    },
    getOrders() {
      this.loading = true;
      this.orders = [];
      getData().getOrders().then(res => {
        this.loading = false;
        if (!res.result) return;
        this.orders = res.data;
      });
    },
    timeTransfer(time) {
      return timeTransfer(time);
    },
    showStatus(status) {
      let text = '';
      switch (status) {
        case 1:
          text = this.$t('USER.STATUS_1');
          break;
        case 2:
          text = this.$t('USER.STATUS_2');
          break;
        case 3:
          text = this.$t('USER.STATUS_3');
          break;
        case 4:
          text = this.$t('USER.STATUS_4');
          break;
        case 5:
          text = this.$t('USER.STATUS_5');
          break;
      }
      return text;
    },
    cancelOrder(orderId) {
      const params = {
        orderId,
      };
      postData().cancelOrder(params).then(res => {
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(this.$t('USER.CANCEL_OK'));
        this.getOrders();
      });
    },
    deleteOrder(orderId) {
      const params = {
        orderId,
      };
      postData().deleteOrder(params).then(res => {
        if (!res.result) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success(this.$t('USER.DELETE_OK'));
        this.getOrders();
      });
    },
  },
  mounted() {
    this.getOrders();
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.order-list {
  margin-top: 30px;
  .order-item {
    &:not(:first-of-type) {
      margin-top: 30px;
    }
    .el-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 14px;
      &:last-of-type {
        border-bottom: 1px solid $light-border;
      }
      .el-col {
        padding: 6px 10px;
        @media only screen and (max-width: 767px) {
          border-top: 1px solid $light-border;
          border-bottom: 1px solid $light-border;
        }
        .product {
          display: flex;
          align-items: center;
          .thumb {
            max-width: 120px;
          }
        }
        .show-detail {
          display: inline;
          width: auto;
          padding: 0;
        }
        &.operate {
          text-align: center;
        }
      }
      &.grey-bg {
        background-color: $light-grey-background;
        color: $desc-color;
      }
      &.bordered {
        border-left: 1px solid $light-border;
        border-right: 1px solid $light-border;
      }
    }
  }
}

.empty {
  margin-top: 100px;
  text-align: center;
}
</style>
