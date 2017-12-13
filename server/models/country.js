module.exports = function(mongoose, app) {
    // Country Schema
    let countrySchema = new mongoose.Schema({
        country_id: { type: Number, require: true },
        name: { type: String, require: true },
    })
    mongoose.model("Country", countrySchema, 'countries')
}