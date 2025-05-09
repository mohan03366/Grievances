const { sendComplaintRegisteredEmail } = require("../services/emailService");
const { sendStatusUpdateEmail } = require("../services/emailService");
const User = require("../models/User");

const {
  createComplaint,
  updateComplaintStatus,
  getComplaints,
  getComplaintById,
  deleteComplaint,
  filterComplaintsService,
} = require("../services/complaintService");

exports.createComplaintController = async (req, res) => {
  console.log("Received Data:", req.body);
  console.log("Received File:", req.file);

  const { category, title, description, location, urgency } = req.body;
  const userId = req.user._id;
  const imageUrl = req.file ? req.file.path : null;

  try {
    // 1. Create the complaint
    const newComplaint = await createComplaint(
      userId,
      category.trim(),
      title.trim(),
      description.trim(),
      imageUrl,
      location.trim(),
      urgency.trim()
    );

    // 2. Fetch user details to get email & name
    const user = await User.findById(userId);
    if (user) {
      await sendComplaintRegisteredEmail(
        user.email,
        user.name,
        newComplaint._id
      );
    }

    // 3. Respond to client
    res.status(201).json(newComplaint);
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Error creating complaint" });
  }
};

exports.updateComplaintStatusController = async (req, res) => {
  const { complaintId, status } = req.body;

  try {
    // 1. Update the complaint status
    const updatedComplaint = await updateComplaintStatus(complaintId, status);
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // 2. Fetch user details from complaint.user
    const user = await User.findById(updatedComplaint.user);
    if (user) {
      await sendStatusUpdateEmail(
        user.email,
        user.name,
        updatedComplaint._id,
        status
      );
    }

    // 3. Respond with updated complaint
    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Error updating complaint status" });
  }
};

exports.getAllComplaintsController = async (req, res) => {
  try {
    const complaints = await getComplaints();

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

exports.getComplaintByIdController = async (req, res) => {
  const { complaintId } = req.params;

  try {
    const complaint = await getComplaintById(complaintId);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.status(200).json(complaint);
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({ message: "Error fetching complaint" });
  }
};

exports.deleteComplaintController = async (req, res) => {
  try {
    const deleted = await deleteComplaint(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Error deleting complaint" });
  }
};

exports.filterComplaintsController = async (req, res) => {
  try {
    const { category, urgency, location } = req.query;

    const complaints = await filterComplaintsService({
      category,
      urgency,
      location,
    });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    console.error("Filter Complaints Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while filtering complaints",
    });
  }
};
