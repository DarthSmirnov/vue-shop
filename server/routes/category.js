module.exports = function(mongoose, app) {
    let Category = mongoose.model('Category');
    // Ger category list
    app.get('/api/category', (req, res, next) => {
        Category.find({}).sort('category_id').exec((err, categories) => {
            return res.json(categories);
        })
    });
    // Ger category info
    app.get('/api/category/:id', (req, res, next) => {
        Category.findOne({ category_id: req.params.id }).exec((err, category) => {
            return res.json(category);
        })
    });
}