const Products = require("./models/productsSchema")
const ProductsData = require("./constant/productsData")



const DefaultData = async () => {

    await Products.deleteMany({});

    try {
        const storeData = await Products.insertMany(ProductsData)
        // console.log(storeData);


    } catch (error) {
        console.log("error is :", error.message);

    }

}

module.exports = DefaultData;