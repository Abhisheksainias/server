const mongoose = require("mongoose");



const DB = process.env.DATABASE;

const connectDb = () => {
    mongoose.connect(DB)
        .then(() => console.log('mongodb connected successfully. . .'))
        .catch((err) => console.log("error in database connection", err))
}

module.exports = connectDb;