const mongoose = require("mongoose");
const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log("Mongo URI:", process.env.MONGO_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com", // Change this to your desired admin email
      password: "Admin@123", // Change this to your desired admin password
      role: "admin",
    });

    console.log("Admin user created successfully:", {
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
