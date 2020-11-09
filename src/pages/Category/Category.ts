import Vue from 'vue';
import ProductCard from '../../_partials/ProductCard.vue';
Vue.component('c-product-card', ProductCard);
import $ from 'jquery';

export default Vue.extend({
  name: 'category',
  data() {
    return {
      sortId: 2,
      sort: [
        {
          price: 'asc'
        },
        {
          price: 'desc'
        },
        {
          name: 'asc'
        },
        {
          name: 'desc'
        }
      ],
      category: {},
      products: {},
      total: null,
      page: 1,
      limit: 9
    };
  },
  methods: {
    updateRoute(page: number) {
      this.$router.push({
        query: {
          page: page.toString(),
          limit: this.limit.toString(),
          sortId: this.sortId.toString()
        }
      });
    },
    getPage(page: number) {
      this.updateRoute(page);
      const productsOffset = $('#products').offset();
      if (productsOffset !== undefined) {
        $('html, body').animate(
          {
            scrollTop: productsOffset.top - 250
          },
          1000
        );
      }
    },
    checkPage() {
      return this.$route.query.page ? +this.$route.query.page : 1;
    },
    async getData(updateRoute = true) {
      const params = {
        id: this.$route.params.id,
        limit: this.limit,
        sort: this.sort[this.sortId],
        page: this.checkPage()
      };
      await this.$api
        .get(`/category/${this.$route.params.id}/products`, { params })
        .then(
          response => {
            this.category = response.data.category;
            this.products = response.data.products;
            this.total = response.data.total;
            this.page = this.checkPage();
            if (updateRoute) {
              this.updateRoute(this.page);
            }
          },
          err => {
            throw err;
          }
        );
    }
  },
  async created() {
    await this.getData(false);
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    $route: 'getData'
  }
});
