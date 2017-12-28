import Vue from 'vue'
import ProductCard from '../../_partials/ProductCard.vue'

Vue.component('c-product-card', ProductCard);

export default {
    name: 'home',
    computed: {
        sales() { return this.$store.getters.sales; },
    },
    created() {
        this.$store.dispatch('fetchSales')
    }
}