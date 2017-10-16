<template>
    <div class="category">
        <h2 class="text-dark font-weight-normal">{{category.name}}</h2>
        <nav class="navbar navbar-light bg-light">
            <div class="category__sort">
                Сортировать по:
                <button class="btn btn-outline-secondary btn-sm" data-click="priceSort(sort.price)">Цене
                    <i class="fa fa-sort-sort.price"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" data-click="nameSort(sort.name)">Наименованию
                    <i class="fa fa-sort-sort.name"></i>
                </button>
            </div>
            <div class="mr-auto"></div>
            <div class="category__per-page">
                Выводить по:
                <select class="custom-select" data-ngModel="sort.perPage">
                    <option value="10">10 товаров</option>
                    <option value="20">20 товаров</option>
                    <option value="40">40 товаров</option>
                    <option value="60">60 товаров</option>
                </select>
            </div>
        </nav>
        <br>
        <div class="row">
            <c-product-card :data="product" class="col-12 col-lg-4" v-for="product in products" :key="product.product_id">
            </c-product-card>
        </div>
        <b-pagination size="md" class="justify-content-center" :total-rows="total" :per-page="sort.perPage">
        </b-pagination>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ProductCard from '../../_partials/ProductCard.vue'
    Vue.component('c-product-card',ProductCard)

    export default {
        name: 'category',
        computed:{
            resource(){
                return this.$resource('/api/category/{id}');
            },
        },
        data(){
            return{
                sort: {
                    'price': 'desc',
                    'name': 'desc',
                    'perPage': 10
                },
                category: {},
                products: {},
                total:0
            }
        },
        methods:{
            getData(){
                console.log(this.$route);
                let options = {
                    params: {
                        id:this.$route.params.id,
                        limit: this.sort.perPage,
                        page: this.$route.query.page,
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                this.resource.get(options.params).then(response => {
                    this.category = response.data.category;
                    this.products = response.data.products;
                    this.total = response.data.total;
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
</script>

<style lang="scss" scoped>
.category {
    &__sort {
        button .fa {
        vertical-align: text-top;
        &-sort-asc {
            vertical-align: middle;
        }
        }
    }
}
</style>
