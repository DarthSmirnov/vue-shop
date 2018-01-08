import Vue from 'vue'
import ProductCard from '../../_partials/ProductCard.vue'

Vue.component('c-product-card', ProductCard);

export default {
    name: 'home',
    data(){
        return{
            currentPage: 3,
            sales:[]
        }
    },
    methods:{
        getSales(){
            this.$http.get('/api/sale').then(response => {
                this.sales = response.data
        },err => {
                throw err;
            })
        }
    },
    created(){
        this.getSales();
    }
}