import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className=" mt-15 min-h-screen bg-gray-100 p-6">
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
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Pending Complaints
          </h2>
          <p className="text-3xl font-bold text-yellow-500">45</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Resolved Complaints
          </h2>
          <p className="text-3xl font-bold text-green-500">75</p>
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
      </div>

      {/* Recent Complaints */}
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
