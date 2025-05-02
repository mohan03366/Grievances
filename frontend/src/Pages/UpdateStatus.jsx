import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStatus = () => {
  const { id } = useParams(); // Complaint ID from URL
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        "http://localhost:5000/api/complaints/update-status",
        {
          complaintId: id,
          status: status,
        },
        {
          withCredentials: true, // 🔐 for cookie-based auth
        }
      );
      alert("Complaint status updated successfully!");
      navigate("/complaints");
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Update Complaint Status</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select New Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStatus;
