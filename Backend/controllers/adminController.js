const asyncHandler = require("express-async-handler");
const Complaint = require("../models/Complaint");

const { createAdminService } = require("../services/adminService");

exports.createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await createAdminService(name, email, password);

  if (result.success) {
    res.status(201).json({ message: "Admin created", id: result.id });
  } else {
    res.status(400).json({ message: result.message });
  }
});

// Get complaint statistics
exports.getComplaintStats = asyncHandler(async (req, res) => {
  const totalComplaints = await Complaint.countDocuments();
  const pendingComplaints = await Complaint.countDocuments({
    status: "pending",
  });
  const resolvedComplaints = await Complaint.countDocuments({
    status: "resolved",
  });
  const inProgressComplaints = await Complaint.countDocuments({
    status: "inprogress",
  });

  res.status(200).json({
    total: totalComplaints,
    pending: pendingComplaints,
    resolved: resolvedComplaints,
    inProgress: inProgressComplaints,
  });
});
