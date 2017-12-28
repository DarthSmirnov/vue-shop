import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import VueSession from 'vue-session'

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(VueSession)
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
                VueCookie.set('basket', state.basket, 1)
        },
        ADD_TO_CART(state, item) {
            delete item.description
            state.basket.push(item)
            console.log(JSON.stringify(state.basket))
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
        addToCart(context, item) {
            context.commit('ADD_TO_CART', item)
        },
        removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index); },
    },
});