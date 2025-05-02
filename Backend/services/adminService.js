const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createAdminService = async (name, email, password) => {
  const existing = await User.findOne({ email });

  if (existing) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin", // Force role to admin
  });

  return { success: true, id: adminUser._id };
};
