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

// Connection
const connect = require('./server/connection.js');

// Models
const Model = require('./server/models');

// Routes
const Routes = require('./server/routes');

// Init models
Model.Characteristics(connect, app);
Model.Country(connect, app);
Model.Category(connect, app);
Model.Product(connect, app);
Model.User(connect, app);

// Init routes
Routes.User(connect, app);
Routes.Category(connect, app);
Routes.Product(connect, app);

const nodemailer = require('nodemailer');

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./index.html"));
})

// Server listen  1337 port
app.listen(process.env.PORT || 1337, () => console.log("server run on 1337 port"))