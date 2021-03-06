/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
require('dotenv').config();

// Express
const express = require('express')
const app = express()
const cors = require('cors');


// Static folder
app.use(cors())

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
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
var transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'vueshop',
        pass: "qwerty123456",
    }
});

app.post('/api/cart/order', (req, res) => {
    const params = req.body
    let orderText = 'Ваш заказ на сумму <strong>' + params.basket.reduce(
        (total, cur) => total + cur.price * cur.quantity,
        0
    ) + '</strong> руб.:<br/><table><thead><tr><th>Название</th><th>Кол-во</th><th>Стоимость</th></tr></thead><tbody>'
    params.basket.map((item) => {
        orderText += '<tr><td>' + item.name
        orderText += '</td><td>' + item.quantity
        orderText += '</td><td>' + (item.price * item.quantity) + ' руб.</td></tr>'
    })
    orderText += '</tbody></table>'

    transporter.sendMail({
        from: 'VueShop <vueshop@yandex.ru>',
        to: params.form.email,
        subject: 'VueShop заказ',
        html: orderText,
    });
    return res.json({
        status: true,
        message: "Ваш заказ оформлен!"
    });
});

app.listen(process.env.API_PORT || 1337, () => console.log(`server run on ${process.env.API_PORT} port`))