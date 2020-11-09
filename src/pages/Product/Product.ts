import Vue from 'vue';

export default Vue.extend({
  name: 'product',
  data() {
    return {
      quantity: 1,
      product: {},
      category: {},
      country: {},
      characters: []
    };
  },
  methods: {
    addToCart(item: Record<string, any>, n: number, event: Event) {
      n = +n;
      this.$store.dispatch('addToCart', { item, n, event });
    },
    async getData() {
      try {
        const productData = (
          await this.$api.get(`/products/${this.$route.params.id}`)
        ).data;
        this.product = productData.product;
        this.country = productData.country;
        this.characters = productData.characters;
        this.category = (
          await this.$api.get('/category/' + productData.product.category_id)
        ).data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  async created() {
    await this.getData();
  },
  watch: {
    // в случае изменения маршрута запрашиваем данные вновь
    $route: 'getData'
  }
});
