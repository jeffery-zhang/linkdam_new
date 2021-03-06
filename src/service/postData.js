/**
 * 项目中所有发送post请求的方法
 */

import axios from 'axios';
import Cookies from 'js-cookie';
import config from 'config/config';
import axiosDefault from 'config/axios.default';

axiosDefault();

export default function () {
  const method = 'post';
  const urls = config.urls;
  const postFunction = (url, params, withToken = false) => {
    let headers;
    const data = new URLSearchParams();
    Object.keys(params).forEach(key => {
      data.append(key, params[key]);
    });
    if (withToken) {
      headers = { xtoken: Cookies.get('xtoken') };
    }
    return axios({
      method,
      url,
      headers,
      data,
    })
      .then(res => res.data);
  };
  return {
    login(params) {
      return postFunction(urls.login, params);
    },
    getRegisterVerifyCode(params) {
      return postFunction(urls.registerVerifyCode, params);
    },
    getForgetVerifyCode(params) {
      return postFunction(urls.getForgetVerifyCode, params);
    },
    changePassword(params) {
      return postFunction(urls.changePassword, params);
    },
    verifyRegisterCode(params) {
      return postFunction(urls.verify, params);
    },
    register(params) {
      return postFunction(urls.register, params);
    },
    addToCart(params) {
      return postFunction(urls.addToCart, params, true);
    },
    addAddress(params) {
      return postFunction(urls.addAddress, params, true);
    },
    deleteAddress(params) {
      return postFunction(urls.deleteAddress, params, true);
    },
    create(params) {
      return postFunction(urls.createOrder, params, true);
    },
    removeProduct(params) {
      return postFunction(urls.removeProduct, params, true);
    },
    clearCart() {
      return postFunction(urls.clearCart, {}, true);
    },
    cancelOrder(params) {
      return postFunction(urls.cancelOrder, params, true);
    },
    deleteOrder(params) {
      return postFunction(urls.deleteOrder, params, true);
    },
    payOrder(params) {
      return postFunction(urls.payOrder, params, true);
    },
    applyExchange(params) {
      return postFunction(urls.applyExchange, params, true);
    },
  };
};
