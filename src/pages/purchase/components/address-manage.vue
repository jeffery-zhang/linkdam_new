<template>
  <section class="address-manage" v-loading.fullscreen.lock="loading">
    <el-tabs>
      <el-tab-pane :label="$t('PURCHASE.AUCTION.CONFIRM_ADDR')">
        <el-row class="address-list">
          <el-col :md="8" :sm="12" :xs="24" v-for="(item, index) in address" :key="index" class="address-item">
            <el-radio v-model="selectedAddress" :label="item.id" border>
              <p>{{item.country}}</p>
              <p class="ellipsis">
                {{item.address}}
              </p>
              <p>{{item.userName}} {{item.phone}}</p>
              <el-button type="text" @click="deleteAddress(item)" :loading="item.deleting">
                {{$t('PURCHASE.AUCTION.DELETE')}}
              </el-button>
            </el-radio>
          </el-col>
        </el-row>
        <el-collapse v-model="collapse" accordion>
          <el-collapse-item name="1">
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
import { mapMutations } from 'vuex';
import getData from 'service/getData'
import postData from 'service/postData'
import addAddress from 'comp/add-address'
import {
  ADDRESS_ID,
} from 'store/mutations-type'

export default {
  name: 'address-manage',
  components: {
    addAddress,
  },
  data () {
    return {
      address: [],
      selectedAddress: 0,
      collapse: '0',
      loading: false,
      deleting: false,
    }
  },
  methods: {
    ...mapMutations({
      ADDRESS_ID,
    }),
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
      });
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
  watch: {
    selectedAddress(nv) {
      this[ADDRESS_ID](this.selectedAddress);
    },
  },
}
</script>

<style lang="scss">
@import './../../../style-sheets/theme';
@import './../../../style-sheets/mixin';

.address-manage {
  .address-item {
    padding: 10px;
  }
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
