<template>
    <div>
        <div class="card text-center">
            <router-link class="item-img" :to="'/category/'+data.category_id+'/product/'+data.product_id">
                <b-img class="card-img-top img-responsive" src="//via.placeholder.com/390x500" v-bind:alt="data.name">
            </router-link>
            <div class="card-body">
                <h4 class="card-title">
                    <router-link class="text-dark" :to="'/category/'+data.category_id+'/product/'+data.product_id">{{data.name}}</router-link>
                </h4>
                <div class="btn-group" role="group">
                    <button class="btn btn-primary btn-sm" @click="addToCart(data)">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> Купить
                    </button>
                    <button class="btn btn-primary btn-sm">
                        <i class="fa fa-balance-scale" aria-hidden="true"></i> Сравнить
                    </button>
                </div>
            </div>
            <div class="card-footer text-muted">{{data.price| currency('₽ ', 0)}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name:'c-product-card',
  props:['data'],
  methods: {
    addToCart(item) {
        this.$store.dispatch('addToCart', item);
    },
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  height: 52px;
}
</style>
