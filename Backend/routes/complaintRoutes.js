const express = require("express");
const router = express.Router();
const {
  createComplaintController,
  updateComplaintStatusController,
  getAllComplaintsController,
  getComplaintByIdController,
  deleteComplaintController, // ✅ FIXED
} = require("../controllers/complaintController");

const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload, protect, createComplaintController);
router.put("/update-status", protect, admin, updateComplaintStatusController);
router.get("/all", getAllComplaintsController);
router.get("/:complaintId", protect, getComplaintByIdController);
router.delete("/:id", protect, admin, deleteComplaintController);

module.exports = router;
