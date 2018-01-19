<template>
    <div>
        <h1>Корзина</h1>
        <div v-if="basket.length > 0">
            <table class="table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th align="center" width="100">Кол-во</th>
                        <th>Стоимость</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="item.product_id" v-for="item in basket">
                        <td><router-link :to="'/category/'+item.category_id+'/product/'+item.product_id">{{ item.name }}</router-link></td>
                        <td width="100">{{item.quantity}}</td>
                        <td>{{ item.price*item.quantity| currency('₽ ', 0) }}</td>
                        <td align="right">
                            <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">&times;</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" align="right">Итого: <strong>{{ total | currency('₽ ', 0) }}</strong></td>
                    </tr>
                </tbody>
            </table>
            <b-card header="Оформление заказа">
                <b-form @submit="onSubmit" novalidate v-bind:validated="formValidated">
                    <b-form-group label="Ваше имя:">
                        <b-form-input
                                    type="text"
                                    required
                                    v-model="form.name"
                                    placeholder="Ваши ФИО">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Email:">
                        <b-form-input
                                    type="email"
                                    v-model="form.email"
                                    required
                                    placeholder="Ваш email">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Адрес:">
                        <b-form-input
                                    type="text"
                                    required
                                    v-model="form.adres"
                                    placeholder="Адрес доставки">
                        </b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Заказать</b-button>
                </b-form>
            </b-card>
        </div>

        <h1 class="text-center" v-else>Корзина пуста</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                name: '',
                adres:''
            },
            formValidated: false
        }
    },
    name: 'cart',
    computed: {
        basket() { return this.$store.getters.basket; },
        total() {
            return this.basket.reduce((total, cur) => total + cur.price*cur.quantity, 0);
        },
    },
    methods: {
        onSubmit (evt) {
            this.formValidated = true;
            evt.preventDefault();
            console.log(JSON.stringify(this.form));
        },
        removeFromCart(index) {
            this.$store.dispatch('removeFromCart', index);
        },
    },
}
</script>