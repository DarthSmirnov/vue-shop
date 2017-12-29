<template>
    <div>
        <h1>Корзина</h1>
        <table v-if="basket.length > 0" class="table">
            <thead>
                <tr>
                    <th>Название</th>
                    <th align="center" width="100">Кол-во</th>
                    <th>Стоимость</th>
                    <th align="center"></th>
                </tr>
            </thead>
            <tbody>
                <tr :key="item.product_id" v-for="item in basket">
                    <td>{{ item.name }}</td>
                    <td width="100">{{item.quantity}}</td>
                    <td>{{ item.price*item.quantity| currency('₽ ', 0) }}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" align="right">Итого: {{ total | currency('₽ ', 0) }}</td>
                </tr>
            </tbody>
        </table>
        <h1 class="text-center" v-else>Корзина пуста</h1>
    </div>
</template>

<script>
export default {
    name: 'cart',
    computed: {
        basket() { return this.$store.getters.basket; },
        total() {
            return this.basket.reduce((total, cur) => total + cur.price*cur.quantity, 0);
        },
    },
    methods: {
        removeFromCart(index) {
            this.$store.dispatch('removeFromCart', index);
        },
    },
}
</script>