module.exports = function(mongoose, app) {
    // Product Schema
    let productSchema = new mongoose.Schema({
        product_id: { type: Number, require: true },
        category_id: { type: Number, require: true },
        name: { type: String, require: true },
        price: { type: Number, require: true },
        manufacturer: { type: String, require: true },
        product_collection: { type: String, require: true },
        article: { type: String, require: true },
        country_id: { type: Number, require: true },
        availible: { type: Number, require: true },
        image_id: { type: Number, require: true },
        description: { type: String, require: true },
        sale: { type: Boolean, require: true }
    })
    mongoose.model("Product", productSchema, 'products')
    let Product = mongoose.model("Product");

    this.mockProducts = function() {
        for (let i = 1; i <= 3000; i++) {
            let mock = {
                product_id: i,
                category_id: random.int(1, 15),
                name: random.title(1, 3),
                price: random.natural(100, 100000),
                manufacturer: random.word(5, 10),
                product_collection: random.word(5, 10),
                article: random.word(3, 6) + '-' + random.zip(5),
                country_id: random.int(1, 10),
                availible: random.int(1, 10),
                image_id: i,
                description: random.paragraph(50, 150),
                sale: random.bool()
            }
            Product.create(mock);
            console.log("create product", i);
        }
    }

    // Ger sales
    app.get('/api/sale', (req, res, next) => {
        Product.find({ sale: true }).sort('product_id').limit(6).exec((err, sales) => {
            return res.json(sales);
        })
    });

    // Ger products of category
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

    // Ger product detail
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
}