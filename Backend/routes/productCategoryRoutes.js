const express = require('express')
const { handleAddProductCategory, handleUpdateProductCategory, handleGetAllProductsCategories, handleGetAProductCategory, handleDeleteProductCategory } = require('../controllers/productCategoryControllers')

const router = express.Router();

router.post('/add-product-category', handleAddProductCategory)
router.put('/update-product-category/:id', handleUpdateProductCategory)
router.get('/get-all-products-categories', handleGetAllProductsCategories)
router.get('/get-product-category/:id', handleGetAProductCategory)
router.delete('/delete-product-category/:id', handleDeleteProductCategory)

module.exports = router