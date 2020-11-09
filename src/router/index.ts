import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/pages/Home/Home.vue';
import Category from '@/pages/Category/Category.vue';
import Product from '@/pages/Product/Product.vue';
import Cart from '@/pages/Cart/Cart.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/category/:id(\\d+)',
    component: Category
  },
  {
    path: '/category/:category_id(\\d+)/product/:id(\\d+)',
    component: Product
  },
  {
    path: '/cart',
    component: Cart
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
