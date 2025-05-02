const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Image URL
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Water", "Electricity", "Road", "Sanitation", "Other"],
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User Model
      required: true,
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
