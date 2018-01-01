import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

Vue.use(Vuex)
Vue.use(VueCookie)

export default new Vuex.Store({
    state: {
        sales: [],
        basket: VueCookie.get('basket') ? JSON.parse(VueCookie.get('basket')) : []
    },
    getters: {
        sales: state => state.sales,
        basket: state => state.basket,
    },
    mutations: {
        SET_SALES(state, data) {
            state.sales = data
        },
        REMOVE_FROM_CART(state, index) {
            state.basket.splice(index, 1)

            if (state.basket.length === 0)
                VueCookie.delete('basket')
            else
                VueCookie.set('basket', JSON.stringify(state.basket), 1)
        },
        ADD_TO_CART(state, params) {
            let record = state.basket.find(p => p.product_id === params.item.product_id)

            if (!record) {
                delete params.item.description
                params.item.quantity = +params.n
                state.basket.push(params.item)
            } else {
                let cart = state.basket.map((p) => {
                    if (p.product_id === params.item.product_id) {
                        p.quantity = p.quantity + params.n
                    }
                    return p
                })
                state.basket = cart;
            }
            VueCookie.set('basket', JSON.stringify(state.basket), 1)
        },
    },
    actions: {
        fetchSales({ commit }) {
            Vue.http.get('/api/sale').then(response => {
                commit('SET_SALES', response.data)
            }, err => {
                throw err
            })
        },
        addToCart(context, params) { context.commit('ADD_TO_CART', params) },
        removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
    },
});