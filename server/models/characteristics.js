module.exports = function (mongoose, app) {
    // Charateristics Schema
    let characterSchema = new mongoose.Schema({
        characteristic_id: {
            type: Number,
            require: true
        },
        product_id: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        val: {
            type: String,
            require: true
        }
    })

    mongoose.model("Characteristics", characterSchema, 'characteristics')

    // const random = require('generate-random-data') let Characteristics =
    // mongoose.model('Characteristics'); for (let i = 1; i <= 200; i++) {     let
    // mock = {         characteristic_id: i,         product_id: random.int(1,
    // 500),         name: random.title(1, 2),         val: random.natural(100,
    // 100000)     }     Characteristics.create(mock);     console.log("create
    // characters", i); }
}