import { useState } from "react";
import axios from "axios";

function RegisterComplaint() {
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    category: "Public Safety",
    urgency: "Low",
    location: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setComplaint({ ...complaint, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", complaint.title);
      formData.append("description", complaint.description);
      formData.append("category", complaint.category);
      formData.append("urgency", complaint.urgency);
      formData.append("location", complaint.location);

      if (complaint.image) {
        formData.append("image", complaint.image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/complaints/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // ✅ Send cookies (for JWT token)
        }
      );

      setMessage("Complaint registered successfully! ✅");
      setComplaint({
        title: "",
        description: "",
        category: "Public Safety",
        urgency: "Low",
        location: "",
        image: null,
      });
    } catch (error) {
      setMessage(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }

    setLoading(false);
  };

  return (
    <div className="mt-20 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-4 text-center text-red-600">
          Register Complaint
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={complaint.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              placeholder="Complaint Title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={complaint.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              placeholder="Describe your complaint"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={complaint.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              placeholder="Enter location"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={complaint.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            >
              <option>Water</option>
              <option>Electricity</option>
              <option>Road</option>
              <option>Sanitationy</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Urgency</label>
            <select
              name="urgency"
              value={complaint.urgency}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">
              Upload Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
            />
            {complaint.image && (
              <img
                src={URL.createObjectURL(complaint.image)}
                alt="Complaint Preview"
                className="mt-2 w-full h-40 object-cover rounded-lg border"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComplaint;
