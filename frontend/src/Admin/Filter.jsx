import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const ComplaintFilter = () => {
  const [filters, setFilters] = useState({
    category: "",
    urgency: "",
    location: "",
  });

  const [complaints, setComplaints] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchFilteredComplaints = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(
        `http://localhost:5000/api/complaints/filter?${query}`
      );
      setComplaints(res.data.data || []);
    } catch (err) {
      console.error("Filter fetch error:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 mt-20 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        🔍 Filter Complaints
      </h2>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">All Categories</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
        </select>

        <select
          name="urgency"
          value={filters.urgency}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">All Urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          value={filters.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Apply Filter Button */}
      <div className="text-right">
        <button
          onClick={fetchFilteredComplaints}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-flex items-center"
        >
          <span>Apply Filter</span>
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Filtered Complaints */}
      {complaints.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((c) => (
            <div key={c._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={c.image || "https://via.placeholder.com/300x200"}
                alt="Complaint"
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {c.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{c.description}</p>
              <div className="text-sm mb-1">
                <strong>📍 Location:</strong> {c.location}
              </div>
              <div className="text-sm mb-1">
                <strong>📂 Category:</strong> {c.category}
              </div>
              <div className="text-sm mb-1">
                <strong>⚠️ Urgency:</strong> {c.urgency}
              </div>
              <div className="text-sm font-semibold text-blue-600">
                Status: {c.status}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Case */}
      {complaints.length === 0 && (
        <p className="mt-6 text-gray-500 text-center">No complaints found.</p>
      )}
    </div>
  );
};

export default ComplaintFilter;
