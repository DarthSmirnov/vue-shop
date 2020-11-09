import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basket: localStorage.getItem('basket')
      ? JSON.parse(localStorage.getItem('basket') || '')
      : []
  },
  getters: {
    basket: state => state.basket
  },
  mutations: {
    CLEAR_CART(state) {
      localStorage.removeItem('basket');
      state.basket = [];
    },
    REMOVE_FROM_CART(state, index) {
      state.basket.splice(index, 1);

      if (state.basket.length === 0) localStorage.removeItem('basket');
      else localStorage.setItem('basket', JSON.stringify(state.basket));
    },
    ADD_TO_CART(
      state: { basket: Array<Record<string, unknown>> },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params: any
    ) {
      const record = state.basket.find(
        p => p.product_id === params.item.product_id
      );

      if (!record) {
        delete params.item.description;
        params.item.quantity = +params.n;
        state.basket.push(params.item);
      } else {
        const cart = state.basket.map(p => {
          if (p.product_id === params.item.product_id) {
            p.quantity = p.quantity + params.n;
          }
          return p;
        });
        state.basket = cart;
      }
      localStorage.setItem('basket', JSON.stringify(state.basket));
    }
  },
  actions: {
    addToCart(context, params) {
      context.commit('ADD_TO_CART', params);
    },
    removeFromCart(context, index) {
      context.commit('REMOVE_FROM_CART', index);
    },
    clearCart(context) {
      context.commit('CLEAR_CART');
    }
  }
});
