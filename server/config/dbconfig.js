const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const url = process.env.MONGODB_URI;
  await mongoose
    .connect(url)
    .then((data) => {
      console.log(`Database connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log("Error connecting to database: ", err.message);
    });
};

module.exports = connectDB;
