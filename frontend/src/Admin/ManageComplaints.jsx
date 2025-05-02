import React from "react";

const complaints = [
  { id: 1, title: "Street Light Not Working", status: "Pending" },
  { id: 2, title: "Garbage Collection Delay", status: "Resolved" },
  { id: 3, title: "Potholes on Main Road", status: "Pending" },
];

const ManageComplaints = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Manage Complaints
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Complaint</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="border-b">
                <td className="p-3">{complaint.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      complaint.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {complaint.status}
                  </span>
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
