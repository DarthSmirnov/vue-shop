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

    // this.mockProducts = function() {
    //     for (let i = 1; i <= 3000; i++) {
    //         let mock = {
    //             product_id: i,
    //             category_id: random.int(1, 15),
    //             name: random.title(1, 3),
    //             price: random.natural(100, 100000),
    //             manufacturer: random.word(5, 10),
    //             product_collection: random.word(5, 10),
    //             article: random.word(3, 6) + '-' + random.zip(5),
    //             country_id: random.int(1, 10),
    //             availible: random.int(1, 10),
    //             image_id: i,
    //             description: random.paragraph(50, 150),
    //             sale: random.bool()
    //         }
    //         Product.create(mock);
    //         console.log("create product", i);
    //     }
    // }
}