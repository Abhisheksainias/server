// verify the value of cookie and secrate key..

const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretkey = process.env.KEY;

// define middleware function

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Amazonweb;

        const verifyToken = jwt.verify(token, secretkey);
        // return one ID
        console.log("verify token is :", verifyToken);
        //and with the help of this ID we find the user
        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log("rootUser is :", rootUser)
        if (!rootUser) { throw new Error("user not found") };

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("unautherized :No token provide")
        console.log(error, "authentication")

    }
}

module.exports = authenticate;