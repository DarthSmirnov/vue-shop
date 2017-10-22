//TODO: доработать текущую страницу по роуту и после сортировки
import Vue from 'vue'
import ProductCard from '../../_partials/ProductCard.vue'
Vue.component('c-product-card',ProductCard)

export default {
    name: 'category',
    computed:{
        resource(){
            return this.$resource('/api/category/{id}');
        }
    },
    data(){
        return{
            sort: {
                price: 'desc',
                name: 'desc',
            },
            category: {},
            products: {},
            total: null,
            page: 1,
            limit: 9
        }
    },
    methods:{
        sortBy(type){             
            this.sort[type] = this.sort[type] == 'desc' ? 'asc': 'desc';
            this.$router.push({ query: { 
                page: this.page,
                name: this.sort.name,
                price: this.sort.price
            } });
        },
        getPage(page){
            this.$router.push({ query: { 
                page: page,
                name: this.sort.name,
                price: this.sort.price
            } });
        },
        checkPage(){
            return this.$route.query.page && !isNaN(this.$route.query.page)? +this.$route.query.page: 1;
        },
        getData(){
            let options = {
                params: {
                    id: this.$route.params.id,
                    limit: this.limit,
                    sort:this.sort,
                    page: this.checkPage(),
                }
            }
            this.resource.get(options.params).then(response => {
                this.category = response.data.category;
                this.products = response.data.products;
                this.total = response.data.total;
                this.page = this.checkPage();
            },err => {
                throw err;
            })
        }
    },
    created(){
        this.getData();
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'getData'
    },
}