<template>
  <b-navbar toggleable="md" fixed="top" type="dark" class="bg-dark">
    <button
      @click="toggleSidebar"
      type="button"
      class="btn btn-outline-info btn-sm d-md-none"
      data-toggle="offcanvas"
    >
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </button>
    <router-link class="navbar-brand" to="/">
      <img
        src="../../src/assets/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      Vue-Shop
    </router-link>
    <b-nav-toggle
      target="navbarsExampleDefault"
      aria-controls="navbarsExampleDefault"
    >
      <span class="navbar-toggler-icon"></span>
    </b-nav-toggle>
    <b-collapse is-nav id="navbarsExampleDefault">
      <div class="mr-auto"></div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">
            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
            <span class="badge badge-info">{{ basket }}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            title="Github repo"
            target="_blank"
            href="//github.com/DarthSmirnov/vue-shop"
          >
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss" scoped>
.navbar {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
}
.typeahead .form-control {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
<script lang="ts">
import Vue from 'vue';
import $ from 'jquery';

export default Vue.extend({
  name: 'navbar',
  computed: {
    basket() {
      const cart = this.$store.getters.basket;
      return cart.reduce(
        (sum: number, item: Record<string, number>) => sum + item.quantity,
        0
      );
    }
  },
  methods: {
    toggleSidebar() {
      $('.row-offcanvas').toggleClass('active');
    }
  }
});
</script>
