const User = require("../models/User");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

let blacklistedTokens = [];

const createUser = async (name, email, password) => {
  // Force role to be 'user' for new registrations
  const user = await User.create({
    name,
    email,
    password,
    role: "user", // Always set role to 'user' for new registrations
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }

  return null;
};

const logoutUser = async (req) => {
  const token = req.cookies.jwt; // ✅ cookie-parser se token mila

  if (token) {
    blacklistedTokens.push(token); // ✅ Blacklist me daal do
  }

  return { message: "Logout successful" };
};

const isBlacklisted = (token) => blacklistedTokens.includes(token);

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  isBlacklisted,
};
