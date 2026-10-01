const fs = require('fs/promises');
async function getProductsFromDB() {
    try {
        await new Promise(
            resolve => setTimeout(resolve, 1500)
        );
        const data =
            await fs.readFile(
                './c.json',
                'utf-8'
            );
        return JSON.parse(data);
    } catch (err) {
        throw new Error(
            'Error reading products'
        );
    }
}
async function saveProductsToDB(products) {
    try {

        await fs.writeFile(
            './c.json',
            JSON.stringify(
                products,
                null,
                2
            )
        );

    } catch (err) {

        throw new Error(
            'Error saving products'
        );

    }
}

module.exports = {
    getProductsFromDB,
    saveProductsToDB
};