const {product} = require("../models/productModel");
const {productCategory} = require("../models/productCategoryModel");
const {productSubCategory} = require("../models/productSubCategoryModel");
const cloudinary = require('cloudinary').v2;
const slugify = require("slugify");

async function handleAddProduct(req, res){
    try{
        const { name, description, price, category, subCategory, quantity } = req.body

        switch(true){
            case !name:
                return res.status().json({success: false, message: "Name is required"})
            case !description:
                return res.status().json({success: false, message: "Description is required"})
            case !price:
                return res.status().json({success: false, message: "Price is required"})
            case !category:
                return res.status().json({success: false, message: "Category is required"})
            case !subCategory:
                return res.status().json({success: false, message: "Sub Category is required"})
            case !quantity:
                return res.status().json({success: false, message: "Quantity is required"})
        }

        //Checking if the already exists or not.
        const findSlug = await product.find({slug:slugify(name).toLowerCase()}).populate("subCategory");
        if(findSlug.length > 0){
            if (findSlug.subCategory) {
                await findSlug.subCategory.populate({ path: "category" });
            }
            return res.status(200).json({success:true, message: "Product already exists", findSlug});
        }

        //Getting Product Category.
        const getProductCategory = await productCategory.findById(category);
        if(!getProductCategory){
            return res.status(404).json({
                success: false, 
                message: "The selected Category does not exist."
            })
        }

        // //Getting Product Sub Category.
        const getProductSubCategory = await productSubCategory.findById(subCategory);
        if(!getProductSubCategory){
            return res.status(404).json({
                success: false, 
                message: "The selected sub category does not exist."
            })
        }
        
        //checking if the selected Category have the selected sub category or not.
        if(getProductSubCategory.category.toString() !== category){
            return res.status(404).json({
                success: false, 
                message: "The selected Category Does not have the selected sub category."
            })
        }

        //uploading Images to cloudinary and generating URLs
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        const images = [image1, image2].filter((item)=> item !== undefined);
        
        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );

        //Creating a new record.
        const newProductWithoutSubCategoryPopulated = await product.create({
            name, 
            slug: slugify(name, { lower: true }),
            description,
            price,
            category,
            subCategory: subCategory,
            quantity,
            images: imageUrl
        });

        // // Getting the same record with category populated.
        const populatedProduct = await product.findById(newProductWithoutSubCategoryPopulated.id).populate('subCategory'); 

        // This line of code populates category within subCategory.
        if (populatedProduct.subCategory) {
            await populatedProduct.subCategory.populate({ path: "category" });
        }
        
        //Generating a new response.
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            populatedProduct
        })
    } catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product."
        });
    }
}

async function handleUpdateProduct(req, res){
    try{
        const { name, description, price, category, subCategory, quantity } = req.body
        const { id } = req.params;
        switch(true){
            case !name:
                return res.status().json({success: false, message: "Name is required"})
            case !description:
                return res.status().json({success: false, message: "Description is required"})
            case !price:
                return res.status().json({success: false, message: "Price is required"})
            case !category:
                return res.status().json({success: false, message: "Category is required"})
            case !subCategory:
                return res.status().json({success: false, message: "Sub category is required"})
            case !quantity:
                return res.status().json({success: false, message: "Quantity is required"})
        }

         // Uncommenting this makes response time longer

        //Getting Product Category.
        const getProductCategory = await productCategory.findById(category);
        if(!getProductCategory){
            return res.status(404).json({
                success: false, 
                message: "The selected Category does not exist."
            })
        }

        // //Getting Product Sub Category.
        const getProductSubCategory = await productSubCategory.findById(subCategory);
        if(!getProductSubCategory){
            return res.status(404).json({
                success: false, 
                message: "The selected sub category does not exist."
            })
        }
        
        //checking if the selected Category have the selected sub category or not.
        if(getProductSubCategory.category.toString() !== category){
            return res.status(404).json({
                success: false, 
                message: "The selected Category Does not have the selected sub category."
            })
        }

        //uploading Images to cloudinary and generating URLs
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        const images = [image1, image2].filter((item)=> item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );
        //console.log(id);
        //Updating a new record.
        const updatedProduct = await product.findByIdAndUpdate(id ,{
            name, 
            slug: slugify(name),
            description,
            price,
            category,
            subCategory,
            quantity,
            images: imageUrl
        }, {new:true}).populate("subCategory");

        if (updatedProduct.subCategory) {
            await updatedProduct.subCategory.populate({ path: "category" });
        }
        
        //Generating a new response.
        return res.status(201).json({
            success: true,
            message: "Product Updated successfully",
            updatedProduct
        })
    } catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product."
        });
    }
}

// async function handleUpdateProduct(req, res){
//     try{
//         let updatedProduct
//         const { id } = req.params;
//         // console.log(req.files);

//         if(req.body.name){ 
//             //console.log(req.body.name);
//             req.body.slug = slugify(req.body.name);
//         };

//         if(req.body.category || req.body.subCategory){
//             //Getting Product Category
//             const getProductCategory = await productCategory.findOne({slug:slugify(req.body.category).toLowerCase()});
//             if (!getProductCategory) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Product category not found"
//                 });
//             }

//             const getProductSubCategory = await productSubCategory.findOne({slug:slugify(req.body.subCategory).toLowerCase()});
//             if (!getProductSubCategory) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Product sub category not found"
//                 });
//             }

//             if(getProductSubCategory.category.toString() !== getProductCategory.id){
//                 return res.status(404).json({
//                     success: false, 
//                     message: "The selected Category Does not have the selected sub category."
//                 })
//             }
        
//             // Replace the category field in req.body with the corresponding ObjectId
//             req.body.category = getProductCategory._id;
//             req.body.subCategory = getProductCategory._id;

//         }

//         if (req.files){
//             //uploading Images to cloudinary and generating URLs
//             const image1 = req.files.image1 && req.files.image1[0];
//             const image2 = req.files.image2 && req.files.image2[0];

//             const images = [image1, image2].filter((item)=> item !== undefined);

//             let imageUrl = await Promise.all(
//                 images.map(async (item)=>{
//                     let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
//                     return result.secure_url;
//                 })
//             );
//             req.body.images = imageUrl;
//         }
        

//         // if(req.files.image1){{ console.log(req.files.image1) };}
//         updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true }).populate("category");
//         return res.status(200).json({success: true, message: "Product updated Successfully", updatedProduct});

//     } catch(error){
//         // console.log(error);
//         res.status(500).send({
//             success: false,
//             error: error,
//             message: "Error while updating the products."
//         });
//     }
// }

async function handleGetAllProductsForASubCategory(req, res){
    try{
        const { categoryId, subCategoryId } = req.params;

        const category = await productCategory.findById(categoryId);

        if(!category){
            return res.status(404).json({
                success: false, 
                message: "The selected Category does not exist."
            })
        }
        const allProducts = await product.find({subCategory: subCategoryId}).populate('subCategory');
        return res.status(200).json({
            success: true,
            message: "All Products for a given sub category.",
            category,
            allProducts
        })
    } catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while gettting the products."
        });
    }
}

async function handleGetAllProductsForACategory(req, res){
    try{
        const { categoryId } = req.params;

        const category = await productCategory.findById(categoryId);
        if(!category){
            return res.status(404).json({
                success: false, 
                message: "The selected Category does not exist."
            })
        }

        const allProducts = await product.find({category: categoryId}).populate('subCategory');
        return res.status(200).json({
            success: true,
            message: "All Products for a given category.",
            category,
            allProducts
        })
    } catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while gettting the products."
        });
    }
}

async function handleGetAProduct(req, res){
    try{
        const { id } = req.params;

        const newProduct = await product.findById(id).populate('subCategory');
        if (!newProduct){ return res.status(404).json({success:false, message: "Could not find the product."})};

        //Getting Category to send as a response
        // const categoryId = newProduct.subCategory.category.toString();
        // const category = await productCategory.findById(categoryId);
        
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            //category,
            newProduct
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while gettting the product."
        });
    }
}

async function handleSearchAProduct(req, res){
    try{
        const { keyword } = req.params;
        const products = await product.find({
            $or: [
                {name:{$regex : keyword, $options:"i"}},
                {description:{$regex : keyword, $options:"i"}}
            ]
        });

        res.json({
            success: true,
            message: `result for ${keyword}`,
            //category,
            products
        });
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while searching for the product."
        });
    }
}

async function handleDeleteProduct(req, res){
    try{
        const { id } = req.params;
        const deletedProduct = await product.findByIdAndDelete(_id = id).populate('subCategory');
        if (!deletedProduct){ return res.status(404).json({success:false, message: "Could not find the product."})}

        //Getting Category to send as a response
        // const categoryId = newProduct.subCategory.category.toString();
        // const category = await productCategory.findById(categoryId);

        return res.status(200).json({
            success: true,
            message: "Successfully Deleted a product.",
            //category,
            deletedProduct
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting the product."
        });
    }
}

module.exports = { handleAddProduct, handleUpdateProduct, handleGetAllProductsForASubCategory, handleGetAllProductsForACategory, handleGetAProduct, handleSearchAProduct, handleDeleteProduct }