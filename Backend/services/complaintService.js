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

exports.filterComplaintsService = async ({ category, urgency, location }) => {
  const query = {};

  if (category) query.category = category;
  if (urgency) query.urgency = urgency;
  if (location) query.location = { $regex: location, $options: "i" };

  return await Complaint.find(query).sort({ createdAt: -1 });
};
