const express = require("express")
const Products = require("../models/productsSchema")


const getproductsController = async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("productsdata is :" + productsdata);
        res.status(201).json(productsdata);

    } catch (error) {
        console.log("error", error.message);
    }
};


const getoneproductsController = async (req, res) => {
    // console.log("getproductsone api called");

    try {
        const { id } = req.params;
        // console.log(id);
        const individualData = await Products.findOne({ id: id })

        // console.log("individualData :" + individualData);

        res.status(201).json(individualData);


    } catch (error) {
        res.status(400).json(individualData);
        console.log("error", error.message);
    }

};




module.exports = { getproductsController, getoneproductsController }