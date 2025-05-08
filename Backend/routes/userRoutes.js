const express = require("express");
const {
  registerUser,
  login,
  logout,
  getAllComplaintsForUser,
  getLoggedInUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/get", protect, getLoggedInUser);
router.get("/complaints", getAllComplaintsForUser);
router.get("/all", getAllUsers);
module.exports = router;
