/**
 * 项目中所有get方式获取数据的方法
 */

import axios from 'axios';
import Cookies from 'js-cookie';
import config from 'config/config';
import axiosDefault from 'config/axios.default';

axiosDefault();

export default function () {
  const method = 'get';
  const urls = config.urls;
  const getFunction = (url, params = {}, withToken = false) => {
    let headers;
    if (withToken) {
      headers = { xtoken: Cookies.get('xtoken') };
    }
    return axios({
      method,
      url,
      headers,
      params,
    })
      .then(res => res.data);
  };
  return {
    getProductInfo(promoCode) {
      return getFunction(urls.productInfo, { promoCode });
    },
    getDefaultCountryCode() {
      return getFunction(urls.defaultCountryCode);
    },
    getCountryCodes() {
      return getFunction(urls.countryCodes);
    },
    getCart(promoCode) {
      return getFunction(urls.getCart, { promoCode }, true);
    },
    getAddress() {
      return getFunction(urls.getAddress, {}, true);
    },
    getOrders() {
      return getFunction(urls.getOrders, {}, true);
    },
    getPromoCode() {
      return getFunction(urls.getPromoCode, {}, true);
    },
    getUserPoints() {
      return getFunction(urls.getUserPoints, {}, true);
    },
    getPointsDetail(page = 1) {
      return getFunction(urls.getPointsDetail, { page }, true);
    },
    applyList(page = 1) {
      return getFunction(urls.applyList, { page }, true);
    },
  }
}
