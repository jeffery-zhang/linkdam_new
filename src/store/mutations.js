import {
  LOGIN_STATUS,
  USER_ACCOUNT,
  ADDRESS_ID,
} from './mutations-type';

export default {
  [LOGIN_STATUS](state, bool) {
    state.isLogged = bool;
  },
  [USER_ACCOUNT](state, account) {
    state.account = account;
  },
  [ADDRESS_ID](state, id) {
    state.addressId = id;
  },
};
