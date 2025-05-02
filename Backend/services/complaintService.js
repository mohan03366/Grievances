const Complaint = require("../models/Complaint");

exports.createComplaint = async (
  userId,
  category,
  title,
  description,
  imageUrl,
  location,
  urgency
) => {
  const complaint = new Complaint({
    user: userId,
    category,
    title,
    description,
    image: imageUrl,
    location,
    urgency,
  });

  return await complaint.save();
};

exports.updateComplaintStatus = async (complaintId, status) => {
  return await Complaint.findByIdAndUpdate(
    complaintId,
    { status },
    { new: true }
  );
};

exports.getComplaints = async () => {
  return await Complaint.find();
};

exports.getComplaintById = async (complaintId) => {
  return await Complaint.findById(complaintId);
};

exports.deleteComplaint = async (complaintId) => {
  return await Complaint.findByIdAndDelete(complaintId);
};
