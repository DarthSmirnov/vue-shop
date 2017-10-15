<template>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
        <button type="button" class="btn btn-outline-info btn-sm d-md-none" data-toggle="offcanvas">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </button>
        <router-link class="navbar-brand" to="/">
            <img src="../../src/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""> Vue-Shop
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <div class="mr-auto"></div>
            <form class="form-inline my-2 my-lg-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Поиск" aria-label="Search">
                    <div class="input-group-btn">
                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">Доставка</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">О нас</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        <span class="badge badge-info">0</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    .navbar {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .3);
    }
</style>
