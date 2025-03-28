const { productSubCategory } = require("../models/productSubCategoryModel");
const { productCategory } = require("../models/productCategoryModel");
const slugify = require("slugify");

async function handleAddProductSubCategory(req, res){
    try{
        const { name, category } = req.body;
        //Checking of name and category are present in the input.
        switch(true){
            case !name:
                return res.status(404).json({success: false, message: "Name is required"})
            case !category:
                return res.status(404).json({success: false, message: "Category is required"})
        }

        
        const getProductCategory = await productCategory.findOne({slug:slugify(category).toLowerCase()});
        //Checking If the category esists or not
        if (!getProductCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        //Checking if the sub-category for the given Category already exists or not.
        const existingSubCategory = await productSubCategory.findOne({category: getProductCategory.id, slug: slugify(name).toLowerCase()});
        console.log(existingSubCategory);
        if (existingSubCategory){
            return res.status(200).json({
                success: true,
                message: `Product Sub-category already exists for ${getProductCategory.name}.`,
                existingSubCategory
            });
        }

        //console.log(getProductCategory)
        //Providing the response.
        const subCategory = await productSubCategory.create({
            name,
            slug: slugify(name, { lower: true }),
            category: getProductCategory.id
        })
        return res.status(201).json({
            success: true, 
            message: "New Category added", 
            subCategory
        });
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            error,
            message: "Error while adding a sub category."
        });
    }
}

async function handleUpdateProductSubCategory(req, res){
    try{
        const { name, category } = req.body
        const { id } = req.params;

        //Getting the category of the category.
        const getProductCategory = await productCategory.findOne({slug:slugify(category).toLowerCase()});
        //Checking If the category esists or not
        if (!getProductCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        //Checking if the sub-category for the given Category already exists or not.
        const existingSubCategory = await productSubCategory.findOne({category: getProductCategory.id, slug: slugify(name).toLowerCase()});
        //console.log(existingSubCategory.id);
        if (existingSubCategory.id !== id ){
            return res.status(200).json({
                success: true,
                message: `Product Sub-category already exists for ${getProductCategory.name}.`,
                existingSubCategory
            });
        }

        const subCategory = await productSubCategory.findByIdAndUpdate(_id = id, {name, slug:slugify(name, { lower: true }), category:getProductCategory.id}, { new: true });
        return res.status(200).json({
            success: true, 
            message: "Category updated successfully", 
            subCategory
        });

    } catch(error){
        return res.status(500).send({
            success: false,
            error,
            message: "Error while updating sub category."
        });
    }
}

async function handleGetAllProductsSubCategoriesForACategory(req, res){
    try{
        const { categoryId } = req.params;
    
        //Getting the category of the category.
        const getProductCategory = await productCategory.findById(categoryId);
        
        //Checking If the category esists or not
        if (!getProductCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        };

        //Getting all the sub-categories of the category.
        const allProductSubCategories = await productSubCategory.find({category : getProductCategory.id});

        if(allProductSubCategories.length==0){
            return res.status(200).json({
                success: true, 
                message: "No sub Categories", 
                allProductSubCategories
            });
        };

        return res.status(200).json({
            success: true, 
            message: "All sub Categories", 
            allProductSubCategories
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting all sub categories."
        });
    }
}

async function handleGetAProductSubCategory(req, res){
    try{
        const { id } = req.params;
        //Finding sub-category by id.
        console.log(id);
        const subCategory = await productSubCategory.findById(_id=id);
        console.log(subCategory);
        //Checking if the sub-category exists or not.
        if (!subCategory){ return res.status(404).json({success:false, message: "Could not find the sub-category."})}
        //Returning the sub-category.
        return res.status(200).json({success: true, message: "Item fetched succesfully", subCategory});
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting the product category."
        });
    }
}

async function handleDeleteProductSubCategory(req, res){
    try{
        const { id } = req.params;
        const subCategory = await productSubCategory.findByIdAndDelete(id);
        return res.status(200).json({
            success: true, 
            message: "Deleted a sub Category", 
            subCategory
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while deleting the product category."
        });
    }
}

module.exports = { handleAddProductSubCategory, handleUpdateProductSubCategory, handleGetAllProductsSubCategoriesForACategory, handleGetAProductSubCategory, handleDeleteProductSubCategory }