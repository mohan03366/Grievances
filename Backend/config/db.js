const mongoose = require("mongoose");
require("dotenv").config(); // .env file load karne ke liye

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1); // Process exit on failure
  }
};

module.exports = connectDB;
