const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.ObjectId,
        ref:"productCategory"
    },
    subCategory: {
        type: mongoose.ObjectId,
        ref:"productSubCategory"
    },
    quantity: {
        type: Number,
        required:true
    },
    images: {
        type: Array
    },
    shipping: {
        type: Boolean
    },

    //To be un commented once Business and admin authentication is completed
    // createdBy:{
    //     type: mongoose.ObjectId,
    //     ref:"businessMen"
    // }
}, {timestamps:true});

const product = mongoose.model('products', productSchema);

module.exports = { product }