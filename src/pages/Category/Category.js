import Vue from 'vue'
import ProductCard from '../../_partials/ProductCard.vue'
Vue.component('c-product-card', ProductCard)

export default {
    name : 'category',
    computed : {
        resource() {
            return this.$resource('/api/category/{id}/products');
        }
    },
    data() {
        return {
            sortId: 2,
            sort: [
                {
                    price: 'asc'
                }, {
                    price: 'desc'
                }, {
                    name: 'asc'
                }, {
                    name: 'desc'
                }
            ],
            category: {},
            products: {},
            total: null,
            page: 1,
            limit: 9
        }
    },
    methods : {
        updateRoute() {
            this
                .$router
                .push({
                    query: {
                        page: this.page,
                        limit: this.limit,
                        sortId: this.sortId
                    }
                });
        },
        getPage(page) {
            this.updateRoute();
            $('html, body').animate({
                scrollTop: $('#products')
                    .offset()
                    .top - 250
            }, 1000);
        },
        checkPage() {
            return this.$route.query.page && !isNaN(this.$route.query.page)
                ? + this.$route.query.page
                : 1;
        },
        getData() {
            let options = {
                params: {
                    id: this.$route.params.id,
                    limit: this.limit,
                    sort: this.sort[this.sortId],
                    page: this.checkPage()
                }
            }
            this
                .resource
                .get(options.params)
                .then(response => {
                    this.category = response.data.category;
                    this.products = response.data.products;
                    this.total = response.data.total;
                    this.page = this.checkPage();
                    this.updateRoute();
                }, err => {
                    throw err;
                })
        }
    },
    created() {
        this.getData();
    },
    watch : {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'getData'
    }
}