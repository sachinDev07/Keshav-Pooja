const mongoose = require("mongoose");
const { DB_NAME } = require("./constant");


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://sachinkrj369:xKQ9xuj2muHaNBqV@cluster0.e8d1zph.mongodb.net/${DB_NAME}`)
    } catch (error) {
        console.error("Mongodb connnection error: " + error);
    }
}

module.exports = connectDB;