<template>
  <div id="app">
    <c-navbar></c-navbar>
    <div class="container">
      <div class="row row-offcanvas row-offcanvas-left">
        <div class="col-12 col-md-3 sidebar-offcanvas">
          <c-sidebar></c-sidebar>
        </div>
        <div class="col-12 col-md-9">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <!--/span-->
      </div>
      <!--/row-->
    </div>
    <c-footer></c-footer>
  </div>
</template>
