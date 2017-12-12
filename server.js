// Express
const express = require('express')
const app = express()
const random = require('generate-random-data')

const path = require('path')

// Static folder
app.use(express.static(__dirname))

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Morgan
const morgan = require('morgan')
app.use(morgan('dev'))


const connect = require('./server/connection.js');

// Models
const characteristics = require('./server/characteristics.js');
const country = require('./server/country.js');
const user = require('./server/user.js');
const category = require('./server/category.js');
const product = require('./server/product.js');

// Inits
characteristics(connect, app);
country(connect, app);
category(connect, app);
product(connect, app);
user(connect, app);

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./dist/index.html"));
})

// Server listen  1337 port
app.listen(process.env.PORT || 1337, () => console.log("server run on 1337 port"))