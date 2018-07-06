import getData from 'service/getData'
import others from './others'

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
    }
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
