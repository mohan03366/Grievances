import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints/all");
      setComplaints(res.data); // Make sure to access .complaints if your backend wraps it
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Complaints
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Urgency</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Complain Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints?.map?.((complaint) => (
              <tr key={complaint._id} className="border-b">
                <td className="p-3">{complaint.title}</td>
                <td className="p-3">{complaint.location}</td>
                <td className="p-3">{complaint.category}</td>
                <td className="p-3">{complaint.urgency}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      complaint.status === "pending"
                        ? "bg-yellow-500"
                        : complaint.status === "resolved"
                        ? "bg-green-500"
                        : complaint.status === "inprogress"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-3">
                  <button className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageComplaints;
