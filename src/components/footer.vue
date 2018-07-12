<template>
  <el-footer>
    <el-row>
      <el-col :span="6" class="hidden-sm-and-down logo">
        <h2>linkdam.com</h2>
        <h4>{{$t('FOOTER.TITLE')}}</h4>
      </el-col>
      <el-col :sm="3" :xs="24">
        <h5>{{$t('FOOTER.SERVICE')}}</h5>
        <p>
          <a href="#/service/registration">{{$t('FOOTER.REGISTER')}}</a>
        </p>
        <p>
          <a href="#/service/permission">{{$t('FOOTER.USE')}}</a>
        </p>
        <p>
          <a href="#/service/after_sale">{{$t('FOOTER.SALE')}}</a>
        </p>
      </el-col>
      <el-col :sm="3" :xs="24">
        <h5>{{$t('FOOTER.ABOUT')}}</h5>
        <p>
          <a href="javascript:;">{{$t('FOOTER.LINKDAM')}}</a>
        </p>
      </el-col>
      <el-col :sm="6" :xs="24">
        <h5>{{$t('FOOTER.HOTLINE')}}</h5>
        <p>
          <a href="javascript:;">service@onconnection.mobi</a>
        </p>
        <h5>{{$t('FOOTER.COOP')}}</h5>
        <p>
          <a href="javascript:;">BD@onconnection.mobi</a>
        </p>
      </el-col>
      <el-col :sm="{ span: 4, offset: 2 }" :xs="24">
        <h5>{{$t('FOOTER.OFFCIAL')}}</h5>
        <div class="qrcode">
          <img src="./../assets/Subscription.png">
        </div>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
export default {
  name: 'foot',
}
</script>

<style lang="scss" scoped>
@import './../style-sheets/theme';
@import './../style-sheets/mixin';

.el-footer {
  padding-top: 40px;
  background-color: $footer-background;
  @media only screen and (min-width: 1024px) {
    height: 230px !important;
  }
  @media only screen and (max-width: 1023px) {
    height: 660px !important;
  }
  * {
    color: #fff;
  }
  .el-row {
    margin: 0 auto;
    @media only screen and (min-width: 1024px) {
      width: 1000px;
    }
    .logo {
      margin-top: 30px;
    }
  }
  h4 {
    font-size: 16px;
    font-weight: normal;
  }
  h5 {
    margin: 0 40px 20px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid $grey-border;
    font-size: 14px;
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }
  p {
    font-size: 14px;
    &:not(:first-of-type) {
      margin-top: 20px;
    }
    &:last-of-type {
      margin-bottom: 30px;
    }
  }
  a {
    transition: all .2s ease;
    &:hover {
      color: $theme-color;
    }
    &:active {
      opacity: .9;
    }
  }
  .qrcode {
    @include wh(92px, 92px);
  }
}
</style>
