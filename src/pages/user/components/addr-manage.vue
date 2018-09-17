<template>
  <div class="address-container" v-loading.fullscreen.lock="loading">
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
    </el-menu>
    <el-row>
      <el-col :md="8" :sm="12" :xs="24" v-for="(item, index) in address" :key="index">
        <div class="address-item">
          <p>{{item.country}}</p>
          <p class="ellipsis">
            {{item.address}}
          </p>
          <p>{{item.userName}} {{item.phone}}</p>
          <el-button type="text" @click="deleteAddress(item)" :loading="item.deleting">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
      </el-col>
      <el-col>
        <el-collapse v-model="collapse" accordion>
          <el-collapse-item name="1">
            <template slot="title" style="color: #303133;">
              <i class="el-icon-location-outline" style="color: #349aff;"></i>
              {{$t('PURCHASE.AUCTION.ADD_ADDR')}}
            </template>
            <add-address @saved="getUserAddress"></add-address>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'
import addAddress from 'comp/add-address'

export default {
  name: 'addr-manage',
  components: {
    addAddress,
  },
  data () {
    return {
      page: 'address-manage',
      address: [],
      collapse: '0',
      loading: false,
      deleting: false,
    }
  },
  methods: {
    handleSelect(name) {
      this.$router.push({
        name,
      });
    },
    getUserAddress() {
      this.loading = true;
      this.address = [];
      this.collapse = '0';
      getData().getAddress().then(res => {
        this.loading = false;
        if (!res.result || !res.data || res.data.length < 1) {
          this.selectedAddress = 0;
          return;
        };
        this.address = res.data;
        this.address.forEach(item => {
          item.deleting = false;
        });
        this.selectedAddress = this.address[0].id;
      }).catch(err => {
        this.loading = false;
      })
    },
    deleteAddress(item) {
      item.deleting = true;
      const params = {
        addressId: item.id,
      };
      postData().deleteAddress(params).then(res => {
        item.deleting = false;
        this.getUserAddress();
      })
    },
  },
  mounted () {
    this.getUserAddress();
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.address-container {
  margin-top: 30px;
  .el-row {
    .el-col {
      padding: 20px;
      .address-item {
        position: relative;
        padding: 25px 15px;
        border: 1px solid $light-border;
        border-radius: 10px;
        box-shadow: 0 0px 10px 1px rgba(172, 173, 173, 0.8);
        .el-button {
          position: absolute;
          right: 6px;
          top: 6px;
          width: auto;
          padding: 0;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
