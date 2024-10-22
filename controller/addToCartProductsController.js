const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");

const addToCartProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log("cart value is :", cart);

        const UserContact = await USER.findOne({ _id: req.userID })
        console.log("UserContact is :", UserContact)

        if (UserContact) {
            const cartData = await UserContact.addToCartData(cart);
            await UserContact.save();
            console.log("controller cartData is :", cartData);
            res.status(201).json(UserContact);
        } else {
            res.status(401).json({ error: "User not found" });
        }

    } catch (error) {
        res.status(401).json({ error: "User not found" });
    }
}

module.exports = addToCartProductController;