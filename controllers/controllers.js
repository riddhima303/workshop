const productService = require('../services/services');

const {
    setCache,
    clearCache
} = require('../middleware/middleware');

async function getProducts(req, res) {
    try {

        const products =
            await productService.getAllProducts();
        setCache(
            req.originalUrl,
            products
        );
        res.json(products);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
async function getProductById(req, res) {
    try {
        const product =
            await productService.getProductById(
                req.params.id
            );
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        setCache(
            req.originalUrl,
            product
        );
        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
async function createProduct(req, res) {
    try {
        const product =
            await productService.createProduct(
                req.body
            );
        clearCache();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
async function updateProduct(req, res) {
    try {
        const product =
            await productService.updateProduct(
                req.params.id,
                req.body
            );
        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            });

        }
        clearCache();
        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
async function patchProduct(req, res) {
    try {
        const product =
            await productService.updateProduct(
                req.params.id,
                req.body
            );
        if (!product) {

            return res.status(404).json({
                message: 'Product not found'
            });

        }
        clearCache();


        res.json(product);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const product =
            await productService.deleteProduct(
                req.params.id
            );
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        clearCache();
        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};