<template>
    <b-navbar toggleable="md" fixed="top" type="dark" class="bg-dark">
        <button @click="toggleSidebar" type="button" class="btn btn-outline-info btn-sm d-md-none" data-toggle="offcanvas">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </button>
        <router-link class="navbar-brand" to="/">
            <img src="../../src/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""> Vue-Shop
        </router-link>
        <b-nav-toggle target="navbarsExampleDefault" aria-controls="navbarsExampleDefault">
            <span class="navbar-toggler-icon"></span>
        </b-nav-toggle>
        <b-collapse is-nav id="navbarsExampleDefault">
            <div class="mr-auto"></div>
            <div class="my-2 my-lg-0">
                <TypeAhead
                    :limit="10"
                    placeholder="Поиск"
                    classes="typeahead"
                    src="/api/search?keyword=:keyword"
                    :getResponse="search"
                    :onHit="onHit"
                    :fetch="fetch"
                    :render="render"
                    :highlighting="highlighting"
                    ></TypeAhead>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/cart">
                        <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        <span class="badge badge-info">{{ basket }}</span>
                    </router-link >
                </li>
                <li class="nav-item">
                    <a class="nav-link" title="Github repo" target="_blank" href="//github.com/DarthSmirnov/vue-shop">
                        <i class="fa fa-github" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </b-collapse>
    </b-navbar>
</template>

<style lang="scss" scoped>
    .navbar {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
    }
    .typeahead .form-control{
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
</style>
<script>
import TypeAhead from 'vue2-typeahead' 

export default {
    name: 'navbar',
    computed: {
        basket() {
            let cart = this.$store.getters.basket;
            return cart.reduce((sum, item) => sum + item.quantity, 0)
        }
    },
    methods: {
        toggleSidebar(){
            $('.row-offcanvas').toggleClass('active')
        },
        search(response) {
            return response.body
        },
        render: function (items, vue) {
            console.log(vue.query, items);
            let newItem = [vue.query, ...items]
            return newItem
        },
        highlighting: function (item, vue) {
            console.log(item, vue.query);
            return item.toString().replace(vue.query, `<b>${vue.query}</b>`)
        },
        onHit(item, vue, index) {
            console.log(index)
            console.log(vue.data)
            vue.query = item
        },
        fetch(url) {
            return this.$http.get(url)
        }
    },
    components: {
        TypeAhead
    }
}
</script>
