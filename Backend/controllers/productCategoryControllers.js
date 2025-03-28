const { productCategory } = require("../models/productCategoryModel");
const slugify = require("slugify");

async function handleAddProductCategory(req, res){
    try{
        const { name } = req.body;
        if (!name){
            return res.status(401).json({message: "Name is required"})
        }
        const existingCategory = await productCategory.findOne({slug: slugify(name)});
        if (existingCategory){
            return res.status(200).json({
                success: true,
                message: "Product Category already exists"
            });
        }
        const category = await productCategory.create({
            name,
            slug: slugify(name, { lower: true })
        })
        return res.status(201).json({success: true, message: "New Category added", category});
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            error,
            message: "Error while adding category."
        });
    }
}

async function handleUpdateProductCategory(req, res){
    try{
        const { name } = req.body
        const { id } = req.params;
        const category = await productCategory.findByIdAndUpdate(_id = id, {name, slug:slugify(name)}, { new: true });
        return res.status(200).json({
            success: true, 
            message: "Category updated successfully", 
            category
        })
    } catch(error){
        return res.status(500).send({
            success: false,
            error,
            message: "Error while updating category."
        });
    }
}

async function handleGetAllProductsCategories(req, res){
    try{
        const allProductCategories = await productCategory.find({});
        return res.status(200).json({
            success: true, 
            message: "All Categories", 
            allProductCategories
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting all categories."
        });
    }
}

async function handleGetAProductCategory(req, res){
    try{
        const { id } = req.params;
        const category = await productCategory.findById(_id=id);
        if (!category){ return res.status(404).json({success:false, message: "Could not find the product vategory."})}
        return res.status(200).json({success: true, message: "Item fetched succesfully", category});
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting the product category."
        });
    }
}

async function handleDeleteProductCategory(req, res){
    try{
        const { id } = req.params;
        const category = await productCategory.findByIdAndDelete(id);
        return res.status(200).json({
            success: true, 
            message: "Deleted a Category", 
            category
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while deleting the product category."
        });
    }
}

module.exports = { handleAddProductCategory, handleUpdateProductCategory, handleGetAllProductsCategories, handleGetAProductCategory, handleDeleteProductCategory }