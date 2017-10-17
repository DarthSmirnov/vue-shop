<template>
    <div>
        <b-carousel controls indicators :interval="5000" class="carousel carousel_home slide">
            <b-carousel-slide img-src="http://via.placeholder.com/900x450"></b-carousel-slide>
            <b-carousel-slide img-src="http://via.placeholder.com/900x450"></b-carousel-slide>
            <b-carousel-slide img-src="http://via.placeholder.com/900x450"></b-carousel-slide>
        </b-carousel>
        <h2 class="text-dark font-weight-normal">Распродажа</h2>
        <div class="row">
            <c-product-card :data="item" class="col-12 col-lg-4" v-for="item in sales" :key="item._id">
            </c-product-card>
        </div>
        <!--/row-->
    </div>
</template>

<script>
    import Vue from 'vue'
    import ProductCard from '../../_partials/ProductCard.vue'
    Vue.component('c-product-card',ProductCard)
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
                let options = {
                    params: {
                        _start:0,
                        _limit:5
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
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
</script>
<style lang="scss" scoped>
    .carousel_home {
        //height: 320px;
        margin-bottom: 15px;
        overflow: hidden;
        .carousel-inner {
            border-radius: 5px;
        }
    }
</style>