const express = require('express')
const { handleAddProductSubCategory, handleUpdateProductSubCategory,handleGetAllProductsSubCategoriesForACategory, handleGetAProductSubCategory, handleDeleteProductSubCategory } = require('../controllers/productSubCategoryControllers')

const router = express.Router();

router.post('/add-product-sub-category', handleAddProductSubCategory);
router.put('/update-product-sub-category/:id', handleUpdateProductSubCategory)
router.get('/get-all-products-sub-categories-for-a-category/:categoryId', handleGetAllProductsSubCategoriesForACategory)
router.get('/get-product-sub-category/:id', handleGetAProductSubCategory)
router.delete('/delete-product-category/:id', handleDeleteProductSubCategory)

module.exports = router