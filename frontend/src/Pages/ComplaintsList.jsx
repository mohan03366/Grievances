import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/complaints",
          {
            withCredentials: true,
          }
        );
        setComplaints(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this complaint?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`, {
        withCredentials: true,
      });
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      alert("Complaint deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete complaint.");
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Complaints List</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={complaint.image || "https://via.placeholder.com/150"}
                alt="Complaint"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{complaint.title}</h3>
              <p className="text-gray-600">{complaint.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {complaint.location}
              </p>
              <p className="text-sm font-bold text-blue-600">
                Status: {complaint.status}
              </p>

              {/* 🔐 Admin-only Buttons */}
              {user?.role === "admin" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleDelete(complaint._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    🗑️ Delete
                  </button>

                  <button
                    onClick={() => navigate(`/update-status/${complaint._id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    ✏️ Update Status
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
