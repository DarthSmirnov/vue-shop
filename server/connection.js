/* eslint @typescript-eslint/no-var-requires: "off" */
// Mongo DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb+srv://smirnov:aqws1993@cluster0.eazsh.mongodb.net/ng-shop?retryWrites=true&w=majority'
);

module.exports = mongoose;
