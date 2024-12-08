const express = require('express');
const router = express.Router();

const productController=require('../controllers/productController')

router.route('/getProducts').get(productController.getProducts);
router.route('/getProductsById/:id').get(productController.getProductById);
router.route('/addProduct').post(productController.createProduct);
router.route('/updateProduct').put(productController.updateProduct);
router.route('/deleteProduct/:id').put(productController.deleteProduct);

module.exports = router;