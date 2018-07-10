import Cookies from 'js-cookie'
import {
  mapMutations
} from 'vuex'
import getData from 'service/getData'
import postData from 'service/postData'
import others from './others'
import {
  encode,
  decode
} from 'service/encryption'
import {
  LOGIN_STATUS,
  USER_ACCOUNT,
} from 'store/mutations-type';

const mixin = {
  components: {
    others,
  },
  data () {
    return {
      currentLang: localStorage.getItem('_lang') || 'en-US',
      countryCode: '',
      countryList: [],
      loading: true,
      captchaSend: false,
      count: 60,
      hasServerError: false,
      serverErrorMsg: '',
      getVerifyLoading: false,
    }
  },
  methods: {
    ...mapMutations({
      LOGIN_STATUS,
      USER_ACCOUNT,
    }),
    signin(countryCode, phone, password, callback) {
      const params = {
        countryCode,
        phone,
        password,
      };
      postData().login(params).then(res => {
        callback(res);
        if (!res.result) return;
        const data = res.data;
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
          path: '/product',
        })
      });
    },
    captchaCount() {
      this.captchaSend = true;
      const timer = setInterval(() => {
        this.count -= 1;
        if (this.count < 0) {
          clearInterval(timer);
          this.captchaSend = false;
          this.count = 60;
        }
      }, 1000);
    },
  },
  mounted() {
    getData().getDefaultCountryCode().then(res => {
      this.countryCode = res.data.dialCode;
    });
    getData().getCountryCodes().then(res => {
      this.countryList = res.data;
      this.loading = false;
    });
  },
};

export default mixin;
