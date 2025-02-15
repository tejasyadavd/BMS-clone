const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const url = process.env.MONGODB_URI;
  try {
    await mongoose.connect(url);
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
