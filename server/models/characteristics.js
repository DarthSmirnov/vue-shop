module.exports = function(mongoose, app) {
    // Charateristics Schema
    let characterSchema = new mongoose.Schema({
            characteristic_id: { type: Number, require: true },
            product_id: { type: Number, require: true },
            name: { type: String, require: true },
            val: { type: String, require: true },
        })
        // const random = require('generate-random-data')
        // mongoose.model("Characteristics", characterSchema, 'characteristics')
        // let Characteristics = mongoose.model('Characteristics');
        // for (let i = 20001; i <= 40000; i++) {
        //     let mock = {
        //         characteristic_id: i,
        //         product_id: random.int(1, 3000),
        //         name: random.title(1, 2),
        //         val: random.natural(100, 100000),
        //     }
        //     Characteristics.create(mock);
        //     console.log("create characters", i);
        // }
}