<template>
  <div class="login-form absolute-center" v-loading.fullscreen.lock="loading">
    <el-row>
      <h1 class="">{{$t('LOGIN.SIGNIN.TITLE')}}</h1>
    </el-row>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="phone">
        <el-input v-model="loginForm.phone" :placeholder="$t('LOGIN.SIGNIN.ACCOUNT')">
          <el-select v-model="countryCode" slot="prepend">
            <el-option :key="index" 
              v-for="(item, index) in countryList" 
              :label="item.dialCode + '  ' + (currentLang =='zh-CN' ? item.name : item.enName)"
              :value="item.dialCode"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" :placeholder="$t('LOGIN.SIGNIN.PASSWORD')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" :loading="waitForLogin">
          {{$t('LOGIN.SIGNIN.TITLE')}}
        </el-button>
      </el-form-item>
      <p class="server-error" v-show="hasServerError">{{serverErrorMsg}}</p>
    </el-form>
    <others page="signin" />
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {
    mapMutations
  } from 'vuex'
  import getData from 'service/getData'
  import postData from 'service/postData'
  import others from './others'
  import mixin from './mixin'
  import {
    encode,
    decode
  } from 'service/encryption'
  import {
    LOGIN_STATUS,
    USER_ACCOUNT,
  } from 'store/mutations-type';

  export default {
    name: 'signin',
    mixins: [
      mixin,
    ],
    data() {
      return {
        loginForm: {
          phone: '',
          password: '',
        },
        rules: {
          phone: [{
            required: true,
            message: this.$t('LOGIN.SIGNIN.ERROR_PHONE'),
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: this.$t('LOGIN.SIGNIN.ERROR_PASS'),
            trigger: 'blur'
          }, ],
        },
        waitForLogin: false,
        hasServerError: false,
        serverErrorMsg: '',
      }
    },
    methods: {
      ...mapMutations({
        LOGIN_STATUS,
        USER_ACCOUNT,
      }),
      login() {
        this.hasServerError = false;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const params = {
              countryCode: this.countryCode,
              phone: this.loginForm.phone,
              password: this.loginForm.password,
            };
            this.waitForLogin = true;
            postData().login(params).then(res => {
              const data = res.data;
              this.waitForLogin = false;
              if (!res.result) {
                this.hasServerError = true;
                this.serverErrorMsg = res.message;
                return;
              }
              Cookies.set('isLogged', true, {
                expires: 1
              });
              Cookies.set('phone', data.phone, {
                expires: 1
              });
              Cookies.set('userId', data.userId, {
                expires: 1
              });
              this[LOGIN_STATUS](true);
              this[USER_ACCOUNT](this.phone);
              const loginInfo = {
                timestamp: new Date().valueOf(),
                userId: data.userId,
                token: data.xToken,
              };
              Cookies.set('xtoken', encode(JSON.stringify(loginInfo)));
              this.$router.push({
                path: '/',
              })
            });
          }
        });
      },
    },
  }

</script>
