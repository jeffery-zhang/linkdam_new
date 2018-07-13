import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

import index from 'page/index/index'
import product from 'page/product/product'
import service from 'page/service/service'
import purchase from 'page/purchase/purchase'
import cart from 'page/cart/cart'
import login from 'page/login/login'
import user from 'page/user/user';
import auction from 'page/purchase/components/auction'
import payment from 'page/purchase/components/payment'
import success from 'page/purchase/components/success'
import afterSale from 'page/service/components/after_sale'
import registration from 'page/service/components/registration'
import protocol from 'page/service/components/protocol'
import signin from 'page/login/components/signin'
import signup from 'page/login/components/signup'
import forget from 'page/login/components/forget'
import addrManage from 'page/user/components/addr-manage'
import orderManage from 'page/user/components/order-manage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/product',
      name: 'product',
      component: product,
    },
    {
      path: '/service',
      name: 'service',
      component: service,
      children: [
        {
          path: '/service',
          redirect: '/service/registration',
        },
        {
          path: '/service/after_sale',
          name: 'after_sale',
          component: afterSale,
        },
        {
          path: '/service/registration',
          name: 'registration',
          component: registration,
        },
        {
          path: '/service/protocol',
          name: 'protocol',
          component: protocol,
        },
      ],
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase,
      children: [
        {
          path: '/purchase',
          redirect: '/purchase/auction',
        },
        {
          path: '/purchase/auction',
          name: 'auction',
          component: auction,
        },
        {
          path: '/purchase/payment/:order',
          name: 'payment',
          component: payment,
        },
        {
          path: '/purchase/success',
          name: 'success',
          component: success,
        },
      ],
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      children: [
        {
          path: '/user',
          redirect: '/user/address-manage',
        },
        {
          path: '/user/address-manage',
          name: 'address-manage',
          component: addrManage,
        },
        {
          path: '/user/order-manage',
          name: 'order-manage',
          component: orderManage,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      children: [
        {
          path: '/login',
          redirect: '/login/signin',
        },
        {
          path: '/login/signin',
          name: 'signin',
          component: signin,
        },
        {
          path: '/login/signup',
          name: 'signup',
          component: signup,
        },
        {
          path: '/login/forget',
          name: 'forget',
          component: forget,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogged = Cookies.get('isLogged');
  if (isLogged && isLogged === 'true') {
    to.path.includes('/login') ? next('/') : next();
    return;
  } else {
    (
      to.path.includes('/purchase') ||
      to.path.includes('/cart') ||
      to.path.includes('/user')
    ) ? next('/') : next();
    return;
  }
  next();
});

export default router;
