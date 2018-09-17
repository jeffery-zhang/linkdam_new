<template>
  <el-header>
    <div class="container">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :lg="3" :xs="8" :sm="6">
          <a href="/">
            <img src="./../assets/logo.png" alt="LINKDAM">
          </a>
        </el-col>
        <el-menu class="hidden-sm-and-down" background-color="#323232" mode="horizontal" text-color="#fff" @select="handleSelect" active-text-color="#349aff"
          :default-active="page">
          <el-menu-item index="index">{{$t('HEADER.HOME')}}</el-menu-item>
          <el-menu-item index="product">{{$t('HEADER.PRODUCT')}}</el-menu-item>
          <el-menu-item index="signin" v-if="!isLogged">{{$t('HEADER.LOGIN')}}</el-menu-item>
          <el-menu-item index="cart" v-if="isLogged">
            <i class="iconfont" style="color: #fff">&#xe659;</i>
            {{$t('HEADER.CART')}}
          </el-menu-item>
          <el-submenu index="user" v-if="isLogged">
            <template slot="title">
              <i class="iconfont">&#xe6a3;</i>
              {{$t('HEADER.USER')}}
              </template>
            <el-menu-item index="address-manage">{{$t('HEADER.CENTER')}}</el-menu-item>
            <el-menu-item index="logout" @click="logout">{{$t('HEADER.LOGOUT')}}</el-menu-item>
          </el-submenu>
          <el-submenu index="support">
            <template slot="title">{{$t('HEADER.SUPPORT')}}</template>
            <el-menu-item index="registration">{{$t('FOOTER.REGISTER')}}</el-menu-item>
            <el-menu-item index="protocol">{{$t('FOOTER.USE')}}</el-menu-item>
            <el-menu-item index="after_sale">{{$t('FOOTER.SALE')}}</el-menu-item>
            <el-menu-item index="manual">{{$t('HEADER.MANUAL')}}</el-menu-item>
          </el-submenu>
          <el-submenu index="language">
            <template slot="title">
              <i class="iconfont">&#xe68a;</i>
              {{currentLang == 'zh-CN' ? '简体中文' : 'English'}}
              </template>
            <el-menu-item index="en-US" @click="switchLanguage('en-US')">English</el-menu-item>
            <el-menu-item index="zh-CN" @click="switchLanguage('zh-CN')">简体中文</el-menu-item>
          </el-submenu>
        </el-menu>
        <a href="javascript:;" class="nav-button hidden-md-and-up" :class="{open: showXsNav, close: !showXsNav}" @click="showXsNav = !showXsNav"></a>
        <div class="mobile-nav hidden-md-and-up" :class="{closed: !showXsNav}">
          <ul>
            <li @click="handleSelect('index')">{{$t('HEADER.HOME')}}</li>
            <li @click="handleSelect('product')">{{$t('HEADER.PRODUCT')}}</li>
            <li @click="handleSelect('signin')" v-if="!isLogged">{{$t('HEADER.LOGIN')}}</li>
            <li @click="handleSelect('cart')" v-if="isLogged">{{$t('PURCHASE.CART.TITLE')}}</li>
            <li @click="handleSelect('address-manage')" v-if="isLogged">{{$t('HEADER.USER')}}</li>
            <li @click="logout" v-if="isLogged">{{$t('HEADER.LOGOUT')}}</li>
            <li>
              <a href="javascript:;" :class="{active: currentLang == 'en-US'}" @click="switchLanguage('en-US')">English</a>/
              <a href="javascript:;" :class="{active: currentLang == 'zh-CN'}" @click="switchLanguage('zh-CN')">简体中文</a>
            </li>
          </ul>
        </div>
      </el-row>
    </div>
  </el-header>
</template>

<script>
  import Cookies from 'js-cookie'
  import {
    mapState
  } from 'vuex';
  import {
    mapMutations
  } from 'vuex';
  import {
    switchLanguage
  } from './../i18n/i18n.config'
  import {
    LOGIN_STATUS,
    USER_ACCOUNT,
  } from 'store/mutations-type'

  export default {
    name: 'head-top',
    props: [
      'page',
    ],
    data() {
      return {
        showXsNav: false,
        indexRoute: {
          name: 'index',
        },
        productRoute: {
          name: 'product',
        },
        currentLang: localStorage.getItem('_lang') || 'en-US',
      }
    },
    computed: {
      ...mapState([
        'isLogged',
        'account',
      ]),
    },
    methods: {
      ...mapMutations({
        LOGIN_STATUS,
        USER_ACCOUNT,
      }),
      handleSelect(key) {
        if (key === 'logout' || key === 'zh-CN' || key === 'en-US') return;
        if (key === 'manual') {
          window.open('/static/linkdam_manual_cn.pdf', '_blank')
        }
        this.$router.push({
          name: key,
        });
      },
      switchLanguage(id) {
        switchLanguage(id);
      },
      logout() {
        Cookies.remove('isLogged');
        Cookies.remove('phone');
        Cookies.remove('userId');
        Cookies.remove('xtoken');
        this[LOGIN_STATUS](false);
        this[USER_ACCOUNT]('');
        location.reload();
      },
    },
  }

</script>

<style lang="scss" scoped>
  @import './../style-sheets/theme.scss';
  @import './../style-sheets/mixin.scss';

  .el-header {
    position: fixed;
    width: 100%;
    background-color: $header-background;
    z-index: 999;
    .container {
      position: relative;
      height: 100%;
      .el-row {
        height: 100%;
        .el-menu {
          .el-menu-item {
            &:hover, &.is-active {
              border-bottom-color: $theme-color !important;
              background-color: transparent !important;
              color: $theme-color !important;
              i {
                color: $theme-color !important;
              }
            }
            i {
              transition: all .2s ease;
              color: #fff !important;
            }
          }
          .el-submenu {
            i {
              color: #fff;
            }
          }
        }
        .nav-button {
          @include wh(30px, 30px);
          &.open {
            @include icon-normal('./../assets/close.svg');
          }
          &.close {
            @include icon-normal('./../assets/menu.svg');
          }
        }
      }
      .mobile-nav {
        position: fixed;
        top: 59px;
        left: 0;
        padding: 0 20px;
        background-color: $header-background;
        overflow: hidden;
        z-index: 999;
        transition: all .2s ease;
        @include wh(100%, calc(100vh - 59px));
        &.closed {
          height: 0;
        }
        ul {
          display: block;
          @include wh(100%, 100%);
          li {
            padding: 16px 0;
            text-align: center;
            color: #fff;
            &:not(:first-of-type) {
              border-top: 1px solid $grey-border;
            }
            a {
              padding: 0 10px;
              color: #fff;
              &.active {
                color: $theme-color;
              }
            }
          }
        }
      }
    }
  }

</style>
