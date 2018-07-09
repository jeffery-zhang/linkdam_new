import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

import index from 'page/index/index'
import product from 'page/product/product'
import login from 'page/login/login'
import signin from 'page/login/components/signin'
import signup from 'page/login/components/signup'
import forget from 'page/login/components/forget'

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
    to.path.includes('/purchase') ? next('/') : next();
    return;
  }
  next();
});

export default router;
