<template>
  <el-form class="add-address-form" :model="addressForm" :rules="rules" ref="addressForm" label-position="right" size="small">
    <el-form-item :label="$t('PURCHASE.AUCTION.COUNTRY')" prop="country" required>
      <el-select v-model="addressForm.country">
        <el-option :key="index" 
          v-for="(item, index) in countries" 
          :label="currentLang =='zh-CN' ? item.name : item.enName"
          :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('PURCHASE.AUCTION.ADDRESS')" prop="address">
      <el-input v-model="addressForm.address" :placeholder="$t('PURCHASE.AUCTION.ADDRESS')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('PURCHASE.AUCTION.USER')" prop="userName">
      <el-input v-model="addressForm.userName" :placeholder="$t('PURCHASE.AUCTION.USER')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('PURCHASE.AUCTION.PHONE')" prop="phone">
      <el-input v-model="addressForm.phone" :placeholder="$t('PURCHASE.AUCTION.PHONE')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveAddress" :loading="saving">
        {{$t('PURCHASE.AUCTION.SAVE')}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from 'js-cookie'
import getData from 'service/getData'
import postData from 'service/postData'

export default {
  name: 'add-address',
  data () {
    return {
      userId: Cookies.get('userId'),
      addressForm: {
        country: '',
        address: '',
        userName: '',
        phone: '',
      },
      rules: {
        address: {
          required: true,
          message: this.$t('PURCHASE.AUCTION.ERR_ADDR'),
          trigger: 'blur',
        },
        userName: {
          required: true,
          message: this.$t('PURCHASE.AUCTION.ERR_USER'),
          trigger: 'blur',
        },
        phone: {
          required: true,
          message: this.$t('PURCHASE.AUCTION.ERR_PHONE'),
          trigger: 'blur',
        },
      },
      countries: [],
      currentLang: localStorage.getItem('_lang') || 'en-US',
      saving: false,
    }
  },
  methods: {
    getCountries() {
      getData().getCountryCodes().then(res => {
        this.countries = res.data;
        this.addressForm.country = this.currentLang === 'zh-CN' ? '中国' : 'China';
      });
    },
    saveAddress() {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          this.saving = true;
          const params = {
            userId: this.userId,
            country: this.addressForm.country,
            address: this.addressForm.address,
            userName: this.addressForm.userName,
            phone: this.addressForm.phone,
          };
          postData().addAddress(params).then(res => {
            this.saving = false;
            this.$emit('saved');
          });
        }
      });
    },
  },
  mounted () {
    this.getCountries();
  },
}
</script>

<style lang="scss">
.add-address-form {
  margin: 20px 0;
  .el-form-item {
    display: flex;
  }
  .el-form-item__label {
    width: 100px;
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }
  .el-form-item__content {
    flex: 1;
  }
  .el-button {
    width: 240px;
  }
}
</style>
