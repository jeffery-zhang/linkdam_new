<template>
  <div class="login-form absolute-center" v-loading.fullscreen.lock="loading">
    <el-row>
      <h1 class="">{{$t('LOGIN.SIGNUP.TITLE')}}</h1>
    </el-row>
    <el-form :model="signupForm" :rules="rules" ref="signupForm">
      <el-form-item prop="phone" :rules="rules.phone" ref="phone">
        <el-input v-model="signupForm.phone" :placeholder="$t('LOGIN.SIGNUP.PHONE')">
          <el-select v-model="countryCode" slot="prepend">
            <el-option :key="index" 
              v-for="(item, index) in countryList" 
              :label="item.dialCode + '  ' + (currentLang =='zh-CN' ? item.name : item.enName)"
              :value="item.dialCode"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" class="captcha-input">
        <el-input v-model="signupForm.captcha" :placeholder="$t('LOGIN.SIGNUP.CAPTCHA')">
          <el-button slot="append" :class="{disabled: captchaSend}" @click="sendCaptcha">
            {{captchaSend ? `${$t('LOGIN.SIGNUP.RE_GET')}()` : $t('LOGIN.SIGNUP.GET_CAPTCHA')}}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="signupForm.password" :placeholder="$t('LOGIN.SIGNUP.PWD')"></el-input>
      </el-form-item>
      <el-form-item prop="re_password">
        <el-input type="password" v-model="signupForm.re_password" :placeholder="$t('LOGIN.SIGNUP.RE_PWD')"></el-input>
      </el-form-item>
    </el-form>
    <others page="signup"/>
  </div>
</template>

<script>
import mixin from './mixin'
import others from './others'

export default {
  name: 'signup',
  mixins: [
    mixin,
  ],
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
      loading: true,
      captchaSend: false,
      count: 60,
      signupForm: {
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
    sendCaptcha() {
      if (this.captchaSend || !this.signupForm.phone) return;
      
    },
  },
}
</script>
