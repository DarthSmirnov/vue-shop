module.exports = function(mongoose, app) {
    let Category = mongoose.model('Category');
    let Product = mongoose.model('Product');
    let Country = mongoose.model('Country');
    let Characteristics = mongoose.model('Characteristics');

    // Get sales
    app.get('/api/sale', (req, res, next) => {
        Product.find({ sale: true }).sort('product_id').limit(6).exec((err, sales) => {
            return res.json(sales);
        })
    });

    // Get products of category
    app.get('/api/category/:id/products', (req, res, next) => {
        Category.findOne({ category_id: req.params.id }).exec((err, category) => {
            Product.find({ category_id: req.params.id })
                .skip(req.query.limit * (req.query.page - 1))
                .sort(req.query.sort)
                .limit(parseInt(req.query.limit))
                .exec((err, products) => {
                    Product.count({ category_id: req.params.id }).exec((err, count) => {
                        return res.json({
                            total: count,
                            products: products,
                            category: category
                        });
                    })
                })
        })
    });

    // Get product detail
    app.get('/api/products/:id', (req, res, next) => {
        Product.findOne({ product_id: req.params.id }).exec((err, product) => {
            Country.findOne({ country_id: product.country_id }).exec((err, country) => {
                Characteristics.find({ product_id: product.product_id }).exec((err, characters) => {
                    return res.json({
                        product: product,
                        country: country,
                        characters: characters
                    });
                });
            });
        });
    });

    // Get products search result
    app.get('/api/search', (req, res, next) => {
        console.log(req.query.keyword);
        Product.find({ name: '/'+req.query.keyword+'/i' }).sort('product_id').limit(10).exec((err, search) => {
            return res.json(search);
        })
    })
}