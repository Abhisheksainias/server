const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const secretkey = process.env.KEY;


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cnfpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    carts: Array
});
// Password hashning  
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cnfpassword = await bcrypt.hash(this.cnfpassword, 12);
    }
    next();
});


// token genrate with help of mongooes instance method
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, secretkey);
        //add data in schema tokens using array
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        // console.log("token is :", token)
        return token;
    } catch (error) {
        console.log("token error is:", error)
    }
}

// add to cart data with help of mongooes intance methods
userSchema.methods.addToCartData = async function (cart) {
    try {
        this.carts = this.carts.concat(cart); // add cart data in schema carts using array
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error, "cart adding time error");

    }
}

const USER = new mongoose.model("USERS", userSchema);

module.exports = USER; 