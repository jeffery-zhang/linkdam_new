<template>
  <div class="points-container" v-loading.fullscreen.lock="loading">
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
    <el-row style="padding:40px 20px;border-bottom:1px solid #e6e6e6">
      <el-col :md="6" :xs="12">
        <span>{{$t('POINTS.ALL_POINTS')}}{{parseInt(allPoints)}}DAM</span>
      </el-col>
      <el-col :md="6" :xs="12">
        <span>{{$t('POINTS.USABLE_POINTS')}}{{parseInt(usablePoints)}}DAM</span>
      </el-col>
    </el-row>
    <div class="container">
      <el-table :data="list" stripe>
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{timeTransfer(scope.row.createDate, true)}}
          </template>
        </el-table-column>
        <el-table-column label="积分">
          <template slot-scope="scope">
            {{scope.row.type > 2 ? '' : '+'}}{{scope.row.value}}
          </template>
        </el-table-column>
        <el-table-column label="类别" prop="reason"></el-table-column>
        <el-table-column label="来源订单">
          <template slot-scope="scope">
            {{scope.row.fromOrderId ? scope.row.fromOrderId : '一一一一'}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fr" layout="prev, pager, next" :page-count="totalPage" @current-change="changePage"></el-pagination>
    </div>
  </div>
</template>

<script>
import get from 'service/getData'
import timeTransfer from 'service/timeTransfer'

export default {
  name: 'points-manage',
  data () {
    return {
      loading: false,
      page: 'points-manage',
      allPoints: 0,
      usablePoints: 0,
      list: [],
      totalPage: 1,
    }
  },
  methods: {
    getData(page) {
      this.loading = true;
      get().getUserPoints().then(res => {
        this.allPoints = res.data.totalPoints;
        this.usablePoints = res.data.usablePoints;
      })
      get().getPointsDetail(page).then(res => {
        this.list = res.data.list;
        this.totalPage = res.data.totalPage;
        this.loading = false;
      })
    },
    timeTransfer(time, simple) {
      return timeTransfer(time, simple);
    },
    shwoType(type) {
      let text = '';
      switch(type) {
        case 1:
          text = '订单返还'; break;
        case 2:
          text = '推广返佣'; break;
        case 3:
          text = '积分抵现'; break;
        case 4:
          text=  '积分提现'; break;
      }
      return text;
    },
    handleSelect(name) {
      this.$router.push({
        name,
      });
    },
    changePage(page) {
      this.getData(page);
    },
  },
  mounted() {
    this.getData(1)
  },
}
</script>

<style lang="scss" scoped>

</style>
