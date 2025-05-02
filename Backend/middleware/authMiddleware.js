const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { isBlacklisted } = require("../services/userService");
require("dotenv").config();

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log("ADWRTBGNHJD   ER", token);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Check if the token is blacklisted
    if (await isBlacklisted(token)) {
      console.log("Token is blacklisted");
      return res
        .status(401)
        .json({ message: "Token is blacklisted, login again" });
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("Token received:", token);

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
});

// Admin Middleware
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
