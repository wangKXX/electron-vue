import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: require('@/components/main').default,
      children: [{
        path: '/chat',
        name: 'chat',
        component: require('@/components/chat').default
      },{
        path: '/notebook',
        name: 'notebook',
        component: require('@/components/friend-list').default
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/register',
      name: 'register',
      component: require('@/components/register').default
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if (!localStorage.getItem('userInfo')) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  }
});
export default router;
