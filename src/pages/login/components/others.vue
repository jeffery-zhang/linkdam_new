<template>
  <div class="others">
    <p v-show="page == 'signin'">
      {{$t('LOGIN.SIGNIN.NO_ACCOUNT')}}
      <a href="#/login/signup">{{$t('LOGIN.SIGNIN.TO_REGISTER')}}</a>
    </p>
    <p v-show="page == 'signin'">
      <a href="#/login/forget">{{$t('LOGIN.SIGNIN.FORGET')}}</a>
    </p>
    <p v-show="page == 'signup'">
      {{$t('LOGIN.SIGNUP.HAVE')}}
      <a href="#/login/signin">{{$t('LOGIN.SIGNUP.TO_LOG')}}</a>
    </p>
    <p v-show="page == 'forget'">
      <a href="#/login/signin">{{$t('LOGIN.FORGET.BACK')}}</a>
    </p>
  </div>  
</template>

<script>
export default {
  name: 'others',
  props: [
    'page',
  ],
}
</script>

<style lang="scss" scoped>
@import './../../../style-sheets/theme';

.others {
  p {
    margin: 20px 0;
    text-align: center;
    font-size: 14px;
    a {
      color: $theme-color;
    }
  }
}
</style>

