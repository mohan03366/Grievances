import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
  });

  const fetchComplaintStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          withCredentials: true,
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  useEffect(() => {
    fetchComplaintStats();
  }, []);

  return (
    <div className="mt-15 min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-semibold shadow-md">
        Admin Dashboard
      </header>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Complaints
          </h2>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Pending Complaints
          </h2>
          <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Resolved Complaints
          </h2>
          <p className="text-3xl font-bold text-green-500">{stats.resolved}</p>
        </div>
      </div>

      {/* Optional: In Progress */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            In-Progress Complaints
          </h2>
          <p className="text-3xl font-bold text-orange-500">
            {stats.inProgress}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <Link
          to="/admin/complaints"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-lg shadow-md"
        >
          Manage Complaints
        </Link>

        <Link
          to="/admin/users"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg shadow-md"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/signup"
          className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-6 rounded-lg text-lg shadow-md"
        >
          Register New Admin
        </Link>
      </div>

      {/* Recent Complaints (Static for now) */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Complaints
        </h2>
        <ul className="space-y-4">
          <li className="border-b pb-2">
            <p className="font-semibold">Street Light Not Working</p>
            <span className="text-sm text-gray-500">Status: Pending</span>
          </li>
          <li className="border-b pb-2">
            <p className="font-semibold">Garbage Collection Delay</p>
            <span className="text-sm text-gray-500">Status: Resolved</span>
          </li>
          <li>
            <p className="font-semibold">Potholes on Main Road</p>
            <span className="text-sm text-gray-500">Status: Pending</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
