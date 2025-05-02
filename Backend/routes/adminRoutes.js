const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");
const { getComplaintStats } = require("../controllers/adminController");

const router = express.Router();

const { createAdmin } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/create", protect, admin, createAdmin);

// Get complaint statistics
router.get("/stats", getComplaintStats);

module.exports = router;
