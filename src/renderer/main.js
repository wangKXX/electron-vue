import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import element from 'element-ui';
import './filter';
import api from './axios';
import './sheet/index.scss'

Vue.use(element);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.prototype.Api = api;
/* eslint-disable no-new */
const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
window.IP = '10.45.215.231'