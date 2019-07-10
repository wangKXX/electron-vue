import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/main').default,
      children: [{
        path: '/chat',
        name: 'chat',
        component: require('@/components/chat').default
      },{
        path: '/notebook',
        name: 'notebook',
        component: require('@/components/friend-list').default
      },{
        path: '*',
        component: require('@/components/chat').default
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
