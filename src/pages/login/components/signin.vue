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
        <el-input type="password" v-model="loginForm.password" :placeholder="$t('LOGIN.SIGNIN.PASSWORD')" @keyup.enter.native="login"></el-input>
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
  import getData from 'service/getData'
  import postData from 'service/postData'
  import others from './others'
  import mixin from './mixin'

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
      }
    },
    methods: {
      loginCallback(res) {
        this.waitForLogin = false;
        if (!res.result) {
          this.hasServerError = true;
          this.serverErrorMsg = res.message;
          return;
        }
      },
      login() {
        this.hasServerError = false;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.waitForLogin = true;
            this.signin(this.countryCode, this.loginForm.phone, this.loginForm.password, this.loginCallback);
          }
        });
      },
    },
  }

</script>
