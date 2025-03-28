const express = require('express')
const { upload } = require('../cloudinary');
const { handleAddProduct, handleUpdateProduct, handleGetAllProductsForASubCategory,handleGetAllProductsForACategory, handleGetAProduct, handleSearchAProduct, handleDeleteProduct } = require('../controllers/productControllers')
const router = express.Router();

router.post('/add-product', upload.fields([{name: 'image1'}, {name:'image2'}]), handleAddProduct);
router.put('/update-product/:id', upload.fields([{name: 'image1'}, {name:'image2'}]), handleUpdateProduct);
router.get('/get-all-products-for-a-subcategory/:categoryId/:subCategoryId', handleGetAllProductsForASubCategory);
router.get('/get-all-products-for-a-category/:categoryId', handleGetAllProductsForACategory);
router.get('/get-product/:id', handleGetAProduct);
router.get('/search-product/:keyword', handleSearchAProduct);
router.delete('/delete-product/:id', handleDeleteProduct);


module.exports = router