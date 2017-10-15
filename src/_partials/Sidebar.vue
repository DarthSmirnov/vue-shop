<template>
    <aside>
        <h2 class="font-weight-normal">Категории</h2>
        <div class="list-group">
            <router-link :key="item.category_id" v-for="item in menu" :to="'/category/' + item.category_id" active-class="active" class="list-group-item">{{item.name}}</router-link>
        </div>
    </aside>  
</template>
<script>
export default {
    name:'sidebar',
    data(){
        return{
            menu: []
        }
    },
    methods:{
        getCategories(){
            this.$http.get('/api/category').then(response => {
                this.menu = response.data
            },err => {
                throw err;
            })
        }
    },
    created(){
        this.getCategories();
    }
}
</script>

<style lang="scss" scoped>
    .nav-pills {
        margin-bottom: 10px;
    }
    /*
    * Off Canvas
    * --------------------------------------------------
    */

    @media screen and (max-width: 767px) {
    .row-offcanvas {
        position: relative;
        -webkit-transition: all .25s ease-out;
        -o-transition: all .25s ease-out;
        transition: all .25s ease-out;
    }
    .row-offcanvas-right {
        right: 0;
    }
    .row-offcanvas-left {
        left: 0;
    }
    .row-offcanvas-right .sidebar-offcanvas {
        right: -100%;
        /* 12 columns */
    }
    .row-offcanvas-right.active .sidebar-offcanvas {
        right: -50%;
        /* 6 columns */
    }
    .row-offcanvas-left .sidebar-offcanvas {
        left: -100%;
        /* 12 columns */
    }
    .row-offcanvas-left.active .sidebar-offcanvas {
        left: 0;
        position: fixed;
        padding: 71px 5px 15px;
        background: #fff;
        z-index: 999;
        box-shadow: 1px 0px 3px 1px rgba(0, 0, 0, 0.3);
        width: 75%;
        overflow-y: scroll;
        height: 100%;
        /* 6 columns */
    }
    .row-offcanvas-right.active {
        right: 50%;
        /* 6 columns */
    }
    .row-offcanvas-left.active {
        left: 80%;
        /* 6 columns */
    }
    .sidebar-offcanvas {
        position: absolute;
        top: 0;
        width: 50%;
        /* 6 columns */
    }
    }
</style>
