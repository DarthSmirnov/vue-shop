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
            <form class="form-inline my-2 my-lg-0">
                 <TypeAhead
                    :limit="10"
                    src="/api/products/search?keyword=:keyword"
                    :getResponse="getResponse"
                    ></TypeAhead>
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Поиск" aria-label="Search">
                    <div class="input-group-btn">
                        <button class="btn btn-outline-info my-sm-0" type="submit">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
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
</style>
<script>
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
        getResponse: function (response) {
            return response.data.items
        }
    }
}
</script>
