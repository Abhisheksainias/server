const express = require("express")
const USER = require("../models/userSchema");
const bcryptjs = require("bcryptjs")

const userRegController = async (req, res) => {
    // console.log("register api hitted ", req.body);
    console.log("register api hitted")

    const { fname, email, mobile, password, cnfpassword } = req.body;
    console.log("email is", email);

    if (!fname || !email || !mobile || !password || !cnfpassword) {
        res.status(422).json({ error: "fill the required field" });
        console.log("data not available");
    };

    try {
        const preUSer = await USER.findOne({ email: email });
        // console.log("pre user is", preUSer);


        if (preUSer) {
            res.status(422).json({ error: "User is already exist" })
        } else if (password !== cnfpassword) {
            res.status(422).json({ error: "password and confirm password not match" })
        } else {
            const finalUser = await new USER({ fname, email, mobile, password, cnfpassword });

            // console.log("final user is", finalUser);

            // password hasing process

            const storeData = await finalUser.save();
            // const storeData = await finalUser.create();
            // console.log("storeData is :", finalUser);
            res.status(201).json(storeData);

        }
    } catch (error) {

    }
}


// <------------Login Controller--------------->

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log("we collect email password form req.body", );

    if (!email || !password) {
        res.status(400).json({ error: "fill the all required field" })
    };

    try {
        const userLogin = await USER.findOne({ email: email });
        console.log("find eamil is :", userLogin);

        if (userLogin) {
            const isMatch = await bcryptjs.compare(password, userLogin.password)
            // console.log("is match :", isMatch);

            //token genrate

            const token = await userLogin.generateAuthtoken();
            // console.log("login token is", token)

            // Cookie genrate
            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });




            if (!isMatch) {
                res.status(400).json({ error: "Enter correct password" })
            } else {

                res.status(201).json(userLogin)
            }
        } else {
            res.status(400).json({ error: "User not found" })
        }

    }
    catch (error) {
        res.status(400).json({ error: "invalid details" })
    }

}

module.exports = { userRegController, loginUser };