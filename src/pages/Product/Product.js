export default {
    name: 'product',
    computed:{
        resource(){
            return this.$resource('/api/products/{id}');
        }
    },
    data(){
        return{
            breadcrumbs: [],
            product: {},
            country: {},
            characters: []
        }
    },
    methods:{
        getData(){
            // @TODO переработать забор катеории и списка продуктво в сервака
            this.resource.get({id:this.$route.params.id}).then(response => {
                this.product = response.data.product;
                this.$http.get('/api/category/'+this.product.category_id).then(response => {
                    this.breadcrumbs.push(
                        {
                            text: 'Главная',
                            to: { name: 'home' },
                        }, {
                            text: response.data.name,
                            to: '/category/' + response.data.category_id,
                        }, {
                            text: this.product.name,
                            active: true
                        }
                    );
                });
                this.country = response.data.country;
                this.characters = response.data.characters;
            },err => {
                throw err;
            })
        }
    },
    created(){
        this.getData();
    },
    watch: {
        // в случае изменения маршрута запрашиваем данные вновь
        '$route': 'getData'
    }
}