const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'products',
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                min : 0
            }
        }
    ]
}, {timestamps : true})

const cart = mongoose.model('cart', cartSchema);

module.exports = { cart }