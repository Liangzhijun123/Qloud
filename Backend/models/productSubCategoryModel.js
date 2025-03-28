const mongoose = require('mongoose');

const productSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        unique: false
    },
    slug: {
        type: String,
        Lowercase: true,
        unique: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    }
}, {timestamps:true});

const productSubCategory = mongoose.model('productSubCategory', productSubCategorySchema);

module.exports = { productSubCategory }