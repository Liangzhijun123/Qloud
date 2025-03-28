const {cart} = require('../models/cartModel');
const {product} = require('../models/productModel');

async function handleAddProductToCart(req, res) {
    try{
        const {userId, productId, quantity} = req.body;

        //console.log(req.body);
        if(!userId || !productId || quantity <0 ){
            return res.status(404).json({
                success : false,
                message : "Invalid data provided."
            });
        }

        const findProduct = await product.findById(productId);

        if(!findProduct){
            return res.status(404).json({
                success : false,
                message : 'Product Not found.'
            })
        }
        // Checking if the cart already exists for the user.
        let currentCart  = await cart.findOne({userId});

        //If the cart does not exists, we will create an empty cart here.
        if(!currentCart){
            currentCart = new cart({userId, items : []});
        }

        //Find Current Product Index to increase the quantity
        const findCurrentProductIndex = currentCart.items.findIndex(item => item.productId.toString() === productId);
        
        if(findCurrentProductIndex === -1){
            currentCart.items.push({
                productId,
                quantity
            })
        } else {
            currentCart.items[findCurrentProductIndex].quantity += quantity;
        }

        await currentCart.save()
        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            currentCart
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product to the cart."
        });
    }
}


async function handleUpdateCartItems(req, res) {
    try{
        const {userId, productId, quantity} = req.body;
        //console.log(req.body);

        if(!userId || !productId){
            return res.status(404).json({
                success : false,
                message : "Invalid data provided."
            });
        }

        const currentCart = await cart.findOne({userId})

        if(!currentCart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            })
        }

        //Find Current Product Index to increase the quantity
        const findCurrentProductIndex = currentCart.items.findIndex(item => item.productId.toString() === productId);

        //console.log(currentCart.items[0].productId);
        if(findCurrentProductIndex === -1){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        currentCart.items[findCurrentProductIndex].quantity = quantity;
        await currentCart.save();

        await currentCart.populate({
            path: 'items.productId'
        });

        return res.status(200).json({
            success: true,
            message: 'Item Quantity updated Successfully.',
            currentCart
        });

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product to the cart."
        });
    }
}

async function handleFetchCartItems(req, res) {
    try{
        const {userId} = req.params;

        if (!userId){
            res.status(400).json({
                success : false,
                message : "UserId is mandatory."
            });
        }

        const currentCart = await cart.findOne({userId}).populate({
            path: 'items.productId'
        });

        if(!currentCart){
            return res.status(404).json({
                success: false,
                message: "No Items found."
            })
        }

        //Finding valid cart items
        const validItems = currentCart.items.filter((productItem) => {
            //console.log('productItem.productId, ', productItem.productId)
            return productItem.productId;
        });

        if(validItems.length<currentCart.items.length){
            currentCart.items = validItems
            currentCart.save();
        }

        // const populateCartItems = validItems.map(item=>({
        //     productId : item.productId._id,
        //     images : item.productId.images,
        //     price : item.productId.price,
        //     name : item.productId.name,
        // }));

        return res.json({
            success: true,
            message: "Cart fetched successfully.",
            currentCart
        })

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product to the cart."
        });
    }
}


async function handleDeleteCartItems(req, res) {
    try{
        const {userId, productId} = req.body;
        //console.log(req.body);

        if(!userId || !productId){
            return res.status(404).json({
                success : false,
                message : "Invalid data provided."
            });
        }

        const currentCart = await cart.findOne({userId}).populate({
            path: 'items.productId'
        });

        if(!currentCart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            })
        }

        deletedItem = currentCart.items.filter(item => item.productId._id.toString() === productId);
        if(deletedItem.length == 0){ 
            console.log(deletedItem.length);
            return res.status(404).json({
                success: false,
                message: "Items not present in the cart.",
            })
        }
        filteredItems = currentCart.items.filter(item => item.productId._id.toString() !== productId);
        currentCart.items = filteredItems;
        await currentCart.save();



        return res.status(200).json({
            succcess: true,
            message: "Item deleted successfully.",
            currentCart,
            deletedItem
        });

    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product to the cart."
        });
    }
}

module.exports = {handleAddProductToCart, handleUpdateCartItems, handleFetchCartItems, handleDeleteCartItems }