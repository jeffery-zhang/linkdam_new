<template>
  <div class="login-form absolute-center" v-loading.fullscreen.lock="loading">
    <el-row>
      <h1 class="">{{$t('LOGIN.FORGET.TITLE')}}</h1>
    </el-row>
    <el-form :model="forgetForm" :rules="rules" ref="forgetForm">
      <el-form-item prop="phone">
        <el-input v-model="forgetForm.phone" :placeholder="$t('LOGIN.SIGNIN.ACCOUNT')">
          <el-select v-model="countryCode" slot="prepend">
            <el-option :key="index" 
              v-for="(item, index) in countryList" 
              :label="item.dialCode + '  ' + (currentLang =='zh-CN' ? item.name : item.enName)"
              :value="item.dialCode"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" class="captcha-input">
        <el-input v-model="forgetForm.captcha" :placeholder="$t('LOGIN.SIGNUP.CAPTCHA')">
          <el-button slot="append" :class="{disabled: captchaSend}" @click="getVerifyCode" :loading="getVerifyLoading">
            {{captchaSend ? `${$t('LOGIN.SIGNUP.RE_GET')}(${count})` : $t('LOGIN.SIGNUP.GET_CAPTCHA')}}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="forgetForm.password" :placeholder="$t('LOGIN.SIGNUP.PWD')"></el-input>
      </el-form-item>
      <el-form-item prop="re_password">
        <el-input type="password" v-model="forgetForm.re_password" :placeholder="$t('LOGIN.SIGNUP.RE_PWD')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          {{$t('LOGIN.FORGET.TITLE')}}
        </el-button>
      </el-form-item>
      <p class="server-error" v-show="hasServerError">{{serverErrorMsg}}</p>
    </el-form>
    <others page="forget" />
  </div>
</template>

<script>
import getData from 'service/getData'
import postData from 'service/postData'
import others from './others'
import mixin from './mixin'

export default {
  name: 'forget',
  mixins: [
    mixin,
  ],
  components: {
    others,
  },
  data () {
    const validRepeatPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('LOGIN.SIGNUP.ERROR_REPWD')));
      } else if (value !== this.signupForm.password) {
        callback(new Error(this.$t('LOGIN.SIGNUP.ERROR_REPWD')));
      } else {
        callback();
      }
    }
    return {
      forgetForm: {
        phone: '',
        captcha: '',
        password: '',
        re_password: '',
      },
      rules: {
        phone: {
          required: true,
          message: this.$t('LOGIN.SIGNUP.ERROR_ACCOUNT'),
          trigger: 'blur',
        },
        captcha: {
          required: true,
          message: this.$t('LOGIN.SIGNUP.ERROR_CAPTCHA'),
          trigger: 'blur',
        },
        password: {
          required: true,
          message: this.$t('LOGIN.SIGNUP.ERROR_PWD'),
          trigger: 'blur',
        },
        re_password: {
          validator: validRepeatPassword,
          trigger: 'blur',
        },
      },
    }
  },
  methods: {
    getVerifyCode() {
      this.hasServerError = false;
      if (this.captchaSend || !this.forgetForm.phone) return;
      this.getVerifyLoading = true;
      const params = {
        countryCode: this.countryCode,
        phone: this.forgetForm.phone,
      };
      postData().getRegisterVerifyCode(params).then(res => {
        this.getVerifyLoading = false;
        if (res.code !== 1) {
          this.hasServerError = true;
          this.serverErrorMsg = res.message;
          return;
        }
        this.captchaCount();
      });
    },
    resetPassword() {
      this.hasServerError = false;
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          // @TODO
        }
      });
    },
  },
}
</script>
