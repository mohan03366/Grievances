const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createAdminService = async (name, email, password) => {
  const existing = await User.findOne({ email });

  if (existing) {
    return { success: false, message: "User already exists" };
  }

  const adminUser = new User({
    name,
    email,
    password, // no manual hashing!
    role: "admin",
  });

  await adminUser.save(); // triggers pre('save')

  return { success: true, id: adminUser._id };
};
