import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './filter';
import api from './axios';

Vue.use(element);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.prototype.Api = api;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
