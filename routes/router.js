const express = require("express")
const router = new express.Router();
const Products = require("../models/productsSchema");
const { getproductsController, getoneproductsController } = require("../controller/producterController");
const { userRegController, loginUser } = require("../controller/userController");
const addToCartProductController = require("../controller/addToCartProductsController");
const authenticate = require("../middleware/authenticate");

router.get("/getproducts", getproductsController)

//individual data
router.get("/getproductsone/:id", getoneproductsController)


router.post("/register", userRegController)

router.post("/login", loginUser)

// adding the data into cart
router.post("/addcart/:id", authenticate, addToCartProductController)

module.exports = router;