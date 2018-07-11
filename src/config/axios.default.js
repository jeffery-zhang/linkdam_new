/**
 * 一些axios全局默认配置项
 */

import axios from 'axios'
import { Message } from 'element-ui'

export default function () {
  //axios.defaults.baseURL = 'http://api.coolbit.pro';
  axios.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';

  axios.interceptors.response.use(res => {
    return res;
  }, error => {
    Message.error('网络请求出错,请刷新页面或重新登录重试...');
    return Promise.reject(error);
  });
}
