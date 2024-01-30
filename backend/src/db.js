const mongoose = require("mongoose");
const { DB_NAME } = require("./constant");


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error("Mongodb connnection error: " + error);
    }
}

module.exports = connectDB;