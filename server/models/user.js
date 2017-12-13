module.exports = function(mongoose, app) {
    // User Schema
    let userSchema = new mongoose.Schema({
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        email: { type: String, require: true },
        editable: { type: Boolean, require: true }
    })

    mongoose.model("User", userSchema, 'users')
}