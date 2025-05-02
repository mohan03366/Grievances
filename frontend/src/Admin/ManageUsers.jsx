import React from "react";

const users = [
  { id: 1, name: "Amit Sharma", role: "User", active: true },
  { id: 2, name: "Priya Mehta", role: "Admin", active: true },
  { id: 3, name: "Rahul Verma", role: "User", active: false },
];

const ManageUsers = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Users
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      user.active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className={`px-3 py-1 rounded ${
                      user.active
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {user.active ? "Deactivate" : "Activate"}
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

export default ManageUsers;
