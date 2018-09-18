<template>
  <div class="exchange-container" v-loading.fullscreen.lock="loading">
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
    <el-row>
      <el-col :sm="8">
        <div class="points-box">
          <h4>{{$t('POINTS.ALL_POINTS')}}</h4>
          <h3 style="margin-top:20px;">{{allPoints}}DAM</h3>
        </div>
      </el-col>
      <el-col :sm="8">
        <div class="points-box">
          <h4>{{$t('POINTS.EXCHANGED')}}</h4>
          <h3 style="margin-top:20px;">{{allPoints - usablePoints}}DAM</h3>
        </div>
      </el-col>
      <el-col :sm="8">
        <div class="points-box">
          <h4>{{$t('POINTS.USABLE_POINTS')}}</h4>
          <h3 style="margin-top:20px;">{{usablePoints}}DAM</h3>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding:20px;border-bottom:1px solid #e6e6e6">
      <span>{{$t('POINTS.RAISE_AMOUNT')}}</span>
      <h4>{{raiseAmount}}DAM</h4>
      <el-button type="primary"
        size="small"
        style="max-width:300px;margin-top:40px;"
        :disabled="usablePoints < raiseAmount"
        @click="dialogShow = true">{{$t('POINTS.WITHDRAW')}}</el-button>
    </el-row>
    <el-table :data="list" stripe>
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{timeTransfer(scope.row.createDate, true)}}
        </template>
      </el-table-column>
      <el-table-column label="积分" prop="extractPoints"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{showType(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="兑现账号" prop="extractAccount"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{showStatus(scope.row.status)}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fr" layout="prev, pager, next" :page-count="totalPage" @current-change="changePage"></el-pagination>
    <el-dialog :title="$t('POINTS.WITHDRAW_TITLE')" :visible.sync="dialogShow">
      <el-form :model="form" :rules="rule" size="mini" ref="form">
        <el-form-item :label="$t('POINTS.COLLECTION_TYPE')">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">{{$t('POINTS.ALIPAY')}}</el-radio>
            <el-radio :label="2">{{$t('POINTS.WECHAT')}}</el-radio>
            <el-radio :label="3">{{$t('POINTS.ETH')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <p style="margin: 10px 0;" v-show="form.type === 3">{{$t('POINTS.ETH_TIP')}}</p>
        <el-form-item :label="$t('POINTS.EXCHANGE_AMOUNT')" prop="extractPoints">
          <el-input v-model="form.extractPoints" :placeholder="$t('POINTS.EXCHANGE_AMOUNT')">
            <i slot="suffix">DAM</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('POINTS.MONEY')">
          <el-input disabled v-model="form.extractPoints" :placeholder="$t('POINTS.MONEY')">
            <i slot="suffix">CNY</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('POINTS.ALIPAY_ACCOUNT')" prop="extractAccount" v-show="form.type == 1">
          <el-input v-model="form.extractAccount" :placeholder="$t('POINTS.ALIPAY_ACCOUNT')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('POINTS.WECHAT_ACCOUNT')" prop="extractAccount" v-show="form.type == 2">
          <el-input v-model="form.extractAccount" :placeholder="$t('POINTS.WECHAT_ACCOUNT')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('POINTS.ETH_ADDR')" prop="extractAccount" v-show="form.type == 3">
          <el-input v-model="form.extractAccount" :placeholder="$t('POINTS.ETH_ADDR')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:130px;" @click="applyExchange" :loading="confirmLoading">{{$t('POINTS.CONFIRM')}}</el-button>
          <el-button type="danger" style="width:130px;" @click="dialogShow = false">{{$t('POINTS.CANCEL')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import get from 'service/getData'
import post from 'service/postData'
import timeTransfer from 'service/timeTransfer'

export default {
  name: 'points-exchange',
  data () {
    return {
      loading: false,
      page: 'points-exchange',
      allPoints: 0,
      usablePoints: 0,
      raiseAmount: 0,
      dialogShow: false,
      confirmLoading: false,
      list: [],
      totalPage: 1,
      form: {
        type: 1,
        extractPoints: '',
        extractAccount: '',
      },
      rule: {
        extractPoints: [
          { required: true, message: this.$t('POINTS.ERR_AMOUNT'), trigger: 'blur' },
        ],
        extractAccount: [
          { required: true, message: this.$t('POINTS.ERR_COLLECTION'), trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    getData(page) {
      this.loading = true;
      get().getPromoCode().then(res => {
        this.raiseAmount = parseInt(res.data.raiseAmount);
        get().getUserPoints().then(res => {
          this.allPoints = parseInt(res.data.totalPoints);
          this.usablePoints = parseInt(res.data.usablePoints);
          this.loading = false;
        }).catch(err => {
          this.loading = false;
        })
      })
      this.getList(page);
    },
    timeTransfer(time, simple) {
      return timeTransfer(time, simple);
    },
    getList(page) {
      get().applyList(page).then(res => {
        console.log(res);
        this.list = res.data.list;
        this.totalPage = res.data.totalPage;
      })
    },
    showType(type) {
      if (type == 1) return this.$t('POINTS.ALIPAY')
      if (type == 2) return this.$t('POINTS.WECHAT')
      if (type == 3) return this.$t('POINTS.ETH')
    },
    showStatus(status) {
      if (status == 1) return this.$t('POINTS.STATUS_1')
      if (status == 2) return this.$t('POINTS.STATUS_2')
      if (status == 3) return this.$t('POINTS.STATUS_3')
      if (status == 4) return this.$t('POINTS.STATUS_4')
    },
    changePage(page) {
      this.getData(page);
    },
    handleSelect(name) {
      this.$router.push({
        name,
      });
    },
    applyExchange() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        this.confirmLoading = true;
        post().applyExchange(this.form).then(res => {
          this.$message.success(this.$t('POINTS.SUCCESS'));
          this.dialogShow = false;
          this.confirmLoading = false;
          this.getData();
        })
      })
    },
  },
  mounted () {
    this.getData()
  },
}
</script>

<style lang="scss">
.points-box {
  margin: 20px;
  padding: 20px;
  border: 1px solid #999;
  border-radius: 10px;
  background-color: #ccc;
}
.el-dialog {
  min-width: 320px;
}
</style>
