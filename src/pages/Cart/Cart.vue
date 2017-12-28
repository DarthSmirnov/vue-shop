<template>
    <div>
        <h1>Cart</h1>
        <table class="table">
        <tbody>
            <tr :key="item.product_id" v-for="item in basket">
                <td>{{ item.name }}</td>
                <td>{{ item.price| currency('₽ ', 0) }}</td>
                <td>
                    <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
                </td>
            </tr>
            <tr>
                <th></th>
                <th>{{ total | currency('₽ ', 0) }}</th>
            </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'cart',
        computed: {
            basket() { return this.$store.getters.basket; },
            total() {
                return this.basket.reduce((acc, cur) => acc + cur.price, 0);
            },
        },
        methods: {
            removeFromCart(index) {
                this.$store.dispatch('removeFromCart', index);
            },
        },
    }
</script>