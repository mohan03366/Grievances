import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User data before sending:", user);

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      console.log("Response from server:", res.data);
      alert("Signup successful!");
      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data || "Signup failed");
      alert("Signup failed! Try again.");
    }
  };

  return (
    <div className=" mt-20 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Role Selection */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
