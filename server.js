// Express
let express = require('express')
let app = express()
let random = require('generate-random-data')

const path = require('path')

// Static folder
app.use(express.static(__dirname))

// Body Parser
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Morgan
let morgan = require('morgan')
app.use(morgan('dev'))

// Mongo DB
let mongoose = require('mongoose')
mongoose.connect('mongodb://smirnov:aqws1993@ds121534.mlab.com:21534/ng-shop', {
    useMongoClient: true
})


// User Schema
let userSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    editable: { type: Boolean, require: true }
})

mongoose.model("User", userSchema, 'users')
let User = mongoose.model("User");


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

function mockProducts() {
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


// Charateristics Schema
let characterSchema = new mongoose.Schema({
    characteristic_id: { type: Number, require: true },
    product_id: { type: Number, require: true },
    name: { type: String, require: true },
    val: { type: String, require: true },
})
mongoose.model("Characteristics", characterSchema, 'characteristics')
let Characteristics = mongoose.model("Characteristics");


// Country Schema
let countrySchema = new mongoose.Schema({
    country_id: { type: Number, require: true },
    name: { type: String, require: true },
})
mongoose.model("Country", countrySchema, 'countries')
let Country = mongoose.model("Country");


// Category Schema
let categorySchema = new mongoose.Schema({
    category_id: { type: Number, require: true },
    name: { type: String, require: true },
})

mongoose.model("Category", categorySchema, 'categories')
let Category = mongoose.model("Category");
// mockCharacs();
// mockProducts();
// mockCategories();
// mockUsers();

// ROUTES
// Ger sales
app.get('/api/sale', (req, res, next) => {
    Product.find({ sale: true }).sort('product_id').limit(6).exec((err, sales) => {
        return res.json(sales);
    })
});

// Ger category list
app.get('/api/category', (req, res, next) => {
    Category.find({}).sort('category_id').exec((err, categories) => {
        return res.json(categories);
    })
});

// Ger category
app.get('/api/category/:id', (req, res, next) => {
    Category.findOne({ category_id: req.params.id }).exec((err, category) => {
        Product.find({ category_id: req.params.id }).skip(req.query.limit*(req.query.page-1)).sort(req.query.sort).limit(parseInt(req.query.limit)).exec((err, products) => {
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
// ---------------------USERS---------------------------------
// Ger list users
app.get('/api/users', (req, res, next) => {
    User.find({}, (err, users) => {
        return res.json(users);
    })
});
// Create new user
app.post('/api/users', (req, res, next) => {
    delete req.body._id;
    console.log("Server > POST /users > user", req.body);
    User.create(req.body, (err, user) => {
        if (err) return res.json(err)
        else return res.json(user)
    })
});
// Destroy User
app.delete("/api/users/:id", (req, res, next) => {
    console.log("Server > DELETE '/users/:id' > id ", req.params.id);
    User.deleteOne({ _id: req.params.id }, (err, rawData) => {
        if (err) return res.json(err)
        else return res.json(true)
    })
});
// Update user
app.put('/api/users/:id', (req, res, next) => {
    User.update({ _id: req.params.id }, req.body, (err, rawData) => {
        if (err) return res.json(err)
        else return res.json(true)
    });
})
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./dist/index.html"));
})

// Server  listen  1337 port
app.listen(1337, () => console.log("server run on 1337 port"))