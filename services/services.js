const {
    getProductsFromDB,
    saveProductsToDB
} = require('../database/database');


// GET all products
async function getAllProducts() {

    const products =
        await getProductsFromDB();

    return products;
}


// GET product by ID
async function getProductById(id) {

    const products =
        await getProductsFromDB();

    const product = products.find(
        p => p.id == id
    );

    return product;
}


// POST
async function createProduct(product) {

    const products =
        await getProductsFromDB();


    products.push(product);


    await saveProductsToDB(products);


    return product;
}


// PUT / PATCH
async function updateProduct(id, updatedData) {

    const products =
        await getProductsFromDB();


    const index = products.findIndex(
        p => p.id == id
    );


    if (index === -1) {
        return null;
    }


    products[index] = {
        ...products[index],
        ...updatedData
    };


    await saveProductsToDB(products);


    return products[index];
}


// DELETE
async function deleteProduct(id) {

    const products =
        await getProductsFromDB();


    const index = products.findIndex(
        p => p.id == id
    );


    if (index === -1) {
        return null;
    }


    const deletedProduct =
        products[index];


    products.splice(index, 1);


    await saveProductsToDB(products);


    return deletedProduct;
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};