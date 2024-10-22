require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 2200;

const connectDb = require('./db/dbConfig');
connectDb();

const cookieParser = require("cookie-parser")

// Schema

const Products = require("./models/productsSchema");
const DefaultData = require("./defaultData")
const cors = require("cors");
const router = require("./routes/router")

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`server is running on port number ${port}`);

});

DefaultData();