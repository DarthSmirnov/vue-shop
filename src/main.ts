import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Vue2Filters from 'vue2-filters';
import App from './App.vue';
import router from './router';
import store from './store';
import { AxiosPlugin } from './plugins/axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/style.css';

// Partials
import Navbar from '@/_partials/Navbar.vue';
import Footer from '@/_partials/Footer.vue';
import Sidebar from '@/_partials/Sidebar.vue';
Vue.component('c-navbar', Navbar);
Vue.component('c-footer', Footer);
Vue.component('c-sidebar', Sidebar);

Vue.config.productionTip = false;
Vue.use(Vue2Filters);
Vue.use(BootstrapVue);
Vue.use(AxiosPlugin, {
  baseUrl: 'http://localhost:1337/api/'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
