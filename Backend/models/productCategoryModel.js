const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        lowercase: true,
        unique: true
    }
});

const productCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = { productCategory }