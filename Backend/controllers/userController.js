const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Complaint = require("../models/Complaint");

const {
  createUser,
  loginUser,
  logoutUser,
} = require("../services/userService");

const { sendWelcomeEmail } = require("../services/emailService");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await createUser(name, email, password);

  if (user) {
    await sendWelcomeEmail(user.email, user.name);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", req.body);

  const userData = await loginUser(email, password);
  console.log("User data from login:", userData);

  if (userData) {
    console.log("User data:", userData.token);
    // Set token in HTTP-only cookie
    res.cookie("jwt", userData.token, {
      httpOnly: true, // Prevents client-side access (XSS protection)
      secure: false, // Use secure cookies in production
      sameSite: "Lax", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

    res.status(200).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  const result = await logoutUser(req);
  res.clearCookie("jwt");
  res.json(result);
});

exports.getLoggedInUser = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.jwt; // Ensure correct cookie key
    console.log("Received Token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token found" });
    }

    // Verify token
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Find user by ID
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user details
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in getLoggedInUser:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

exports.getAllComplaintsForUser = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find().populate("user", "name email"); // Populate to show who filed it
  res.json(complaints);
});

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide password
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
