<template>
    <footer class="bg-dark navbar-dark text-white">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="d-inline-flex flex-column">
                        <router-link class="navbar-brand" to="/">
                            <img src="../../src/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt=""> Vue-Shop
                        </router-link>
                        <div class="d-inline-flex flex-column">
                            <a class="text-white" href="tel:+7 (926) 617-44-23">+7 (926) 617-44-23</a>
                            <a class="text-white" href="mailto:soltecs.dev@gmail.com">
                                <i class="fa fa-envelope" aria-hidden="true"></i> soltecs.dev@gmail.com
                            </a>
                        </div>
                        <div class="soc-network">
                            <a class="btn btn-outline-secondary btn-sm" href="//vk.com">
                                <i class="fa fa-vk" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-outline-secondary btn-sm" href="//ok.ru">
                                <i class="fa fa-odnoklassniki" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-outline-secondary btn-sm" href="//facebook.com">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-12">
                    <h5>Подписаться на рассылку</h5>
                    <p class="text-muted">Введите Ваш e-mail чтобы быть
                        <br>в курсе наших спец. предложений</p>
                    <form class="form-inline">
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1">
                                <i class="fa fa-envelope"></i>
                            </span>
                            <input type="text" class="form-control" placeholder="email@example.com">
                            <div class="input-group-btn">
                                <button type="submit" class="btn btn-primary">Подписаться</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12 text-right">
                    <h6>Способы оплаты</h6>
                    <div class="d-inline-flex payments">
                        <span data-toggle="tooltip" data-title="MasterCard">
                            <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
                        </span>
                        <span data-toggle="tooltip" data-title="Visa">
                            <i class="fa fa-cc-visa" aria-hidden="true"></i>
                        </span>
                        <span data-toggle="tooltip" data-title="Наличные">
                            <i class="fa fa-money" aria-hidden="true"></i>
                        </span>
                    </div>
                    <br>
                    <span>Иванов Иван Иванович</span>
                    <br>
                    <span>ИНН: 222222222222</span>
                    <br>
                    <span>ОГРНИП: 11111111111111111</span>
                    <br>
                </div>
            </div>
        </div>
    </footer>
</template>
<style lang="scss" scoped>
    footer {
        padding: 15px 0;
        margin-top: 15px;
    }

    .soc-network {
    margin-top: 10px;
    }

    .soc-network a {
    width: 30px;
    height: 30px;
    padding: 0;
    line-height: 30px;
    margin-right: 10px;
    }

    .payments span {
    margin-right: 10px;
    font-size: 1.5em;
    }
</style>
