const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/user-routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello");
})

app.use("/url", userRoutes);

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(7000, () => {
      console.log("Server is started");
    });
  })
  .catch((error) => {
    console.error("Mongoose Connection error: " + error);
  });
