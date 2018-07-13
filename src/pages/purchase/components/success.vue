<template>
  <div class="container">
    <h1>
      <i class="el-icon-success"></i>
      {{$t('PURCHASE.PAYMENT.SUCCEED')}}
    </h1>
    <p>
      {{$t('PURCHASE.PAYMENT.TIP')}}
    </p>
    <el-row>
      <el-col :sm="12">
        <el-button type="primary" @click="goPage('order-manage')">
          {{$t('PURCHASE.PAYMENT.ORDER')}}
        </el-button>
      </el-col>
      <el-col :sm="12">
        <el-button type="primary" @click="goPage('index')">
          {{$t('PURCHASE.PAYMENT.INDEX')}}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'success',
  methods: {
    goPage(name) {
      this.$router.push({
        name,
      });
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';

.container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 120px;
  text-align: center;
  h1 {
    font-size: 32px;
    color: #51c332;
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 40px;
    color: $light-grey-color;
  }
  .el-col {
    padding: 10px;
  }
}
</style>
