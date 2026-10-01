const express = require('express');

const router = express.Router();

const productController = require('../controllers/controllers');

const {
    cacheMiddleware
} = require('../middleware/middleware');


// GET all products
router.get(
    '/products',
    cacheMiddleware,
    productController.getProducts
);


// GET product by ID
router.get(
    '/products/:id',
    cacheMiddleware,
    productController.getProductById
);


// POST
router.post(
    '/products',
    productController.createProduct
);


// PUT
router.put(
    '/products/:id',
    productController.updateProduct
);


// PATCH
router.patch(
    '/products/:id',
    productController.patchProduct
);


// DELETE
router.delete(
    '/products/:id',
    productController.deleteProduct
);


module.exports = router;