<template>
  <section class="address-manage" v-loading.fullscreen.lock="loading">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.AUCTION.CONFIRM_ADDR')">
        <div v-for="(item, index) in address" :key="index" class="address-item">
          <el-radio v-model="selectedAddress" :label="item.id" border>
            <p>{{item.country}}</p>
            <p class="ellipsis">
              {{item.province}},{{item.area}},{{item.street}},{{item.address}}
            </p>
            <p>{{item.userName}} {{item.phone}}</p>
            <el-button type="text" @click="deleteAddress(item)" :loading="item.deleting">
              {{$t('PURCHASE.AUCTION.DELETE')}}
            </el-button>
          </el-radio>
        </div>
        <el-collapse>
          <el-collapse-item>
            <template slot="title" style="color: #303133;">
              <i class="el-icon-location-outline" style="color: #349aff;"></i>
              {{$t('PURCHASE.AUCTION.ADD_ADDR')}}
            </template>
            <add-address @saved="getUserAddress"></add-address>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </section>  
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'
import addAddress from './add-address'

export default {
  name: 'address-manage',
  components: {
    addAddress,
  },
  data () {
    return {
      address: [],
      selectedAddress: 0,
      loading: false,
      deleting: false,
    }
  },
  methods: {
    getUserAddress() {
      this.loading = true;
      this.address = [];
      getData().getAddress().then(res => {
        this.loading = false;
        if (!res.result || !res.data || res.data.length < 1) return;
        this.address = res.data;
        this.address.forEach(item => {
          item.deleting = false;
        });
        this.selectedAddress = this.address[0].id;
      });
    },
    deleteAddress(item) {
      item.deleting = true;
      console.log(item);
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

<style lang="scss">
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.address-manage {
  .el-radio.is-bordered {
    display: flex;
    position: relative;
    align-items: center;
    margin: 10px;
    padding: 12px;
    transition: all .3s ease;
    @include wh(260px, auto);
    &.is-checked {
      box-shadow: 0 0 12px 2px rgba(64, 158, 255, .8);
    }
    p {
      width: 210px;
      padding: 8px 10px;
      color: #606266;
      &:not(:first-of-type) {
        border-top: 1px solid $light-border;
      }
    }
    .el-button {
      position: absolute;
      right: 3px;
      top: 5px;
      width: 60px;
      padding: 0;
      &.el-button--text {
        color: $theme-color;
      }
    }
  }

  .el-collapse {
    border: none;
    @media only screen and (min-width: 1024px) {
      width: 600px;
    }
    @media only screen and (max-width: 1023px) {
      width: 300px;
    }
    .el-collapse-item__arrow {
      display: none;
    }
  }
}
</style>
