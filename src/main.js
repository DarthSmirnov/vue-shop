import Vue from 'vue'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'babel-polyfill'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/lib'
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/style.css'

// Partials
import Navbar from './_partials/Navbar.vue'
Vue.component('c-navbar',Navbar);
import Footer from './_partials/Footer.vue'
Vue.component('c-footer',Footer);
import Sidebar from './_partials/Sidebar.vue'
Vue.component('c-sidebar',Sidebar);

import Home from './pages/Home/Home.vue'
import Category from './pages/Category/Category.vue'
import Product from './pages/Product/Product.vue'
import Cart from './pages/Cart/Cart.vue'
import User from './pages/User/User.vue'

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Home,
        pathMatch: 'full'
    }, {
        path: '/category/:id(\\d+)',
        component: Category,
        children:[
            {
                path: '/product/:id(\\d+)',
                component: Product
            }
        ]
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/user:id(\\d+)',
        component: User
    }]
});

new Vue({
    el: '#app',
    router: router
})