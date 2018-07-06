import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isLogged: Cookies.get('isLogged') || false,
  account: Cookies.get('phone') || false,
};

export default new Vuex.Store({
  state,
  mutations,
});
