module.exports = function(mongoose, app) {
    // Charateristics Schema
    let characterSchema = new mongoose.Schema({
        characteristic_id: { type: Number, require: true },
        product_id: { type: Number, require: true },
        name: { type: String, require: true },
        val: { type: String, require: true },
    })
    mongoose.model("Characteristics", characterSchema, 'characteristics')
}