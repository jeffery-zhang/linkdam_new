<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="20">
      <el-col :span="12" class="buy-now hidden-md-and-down">
        {{$t('INDEX.OPERATE.TITLE')}}
      </el-col>
      <el-col :lg="12" class="btn-group">
        <a href="#/product" class="operate-button buy">
        <i class="iconfont">&#xe630;</i>
        {{$t('INDEX.OPERATE.BUY')}}
        </a>
        <a href="javascript: scrollTo(0, 0);" class="operate-button top">
          <i class="iconfont">&#xe65f;</i>
          {{$t('INDEX.OPERATE.TOP')}}
          </a>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'operate',
}
</script>


<style lang="scss" scoped>
@import './../../../style-sheets/theme.scss';
@import './../../../style-sheets/mixin.scss';

.el-row {
  .btn-group{
    display: flex;
    justify-content: center;
  }
  .operate-button {
    margin: 0 20px;
    text-align: center;
  }
  @media only screen and (min-width: 1200px) {
    & {
      height: 12.13vh;
      @include icon-normal('./assets/bg_web.png');
      .buy-now {
        font-size: 26px;
        color: #fff;
      }
      .operate-button {
        line-height: 54px;
        @include wh(210px, 54px);
        &.buy {
          color: #fff;
          @include icon-normal('./assets/buy_web.png');
        }
        &.top {
          color: $theme-color;
          @include icon-normal('./assets/top_web.png');
        }
      }
    }
  }
  @media only screen and (max-width: 1199px) {
    & {
      height: 12.53vh;
      @include icon-normal('./assets/bg_mobile.png');
      .operate-button {
        line-height: 38px;
        font-size: 14px;
        @include wh(150px, 38px);
        &.buy {
          color: #fff;
          @include icon-normal('./assets/buy_web.png');
        }
        &.top {
          color: $theme-color;
          @include icon-normal('./assets/top_web.png');
        }
      }
    }
  }
}
</style>

