// Mongo DB
let mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://smirnov:aqws1993@ds121534.mlab.com:21534/ng-shop', {
    useMongoClient: true
})

module.exports = mongoose;