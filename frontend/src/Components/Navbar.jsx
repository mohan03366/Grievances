import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to register a complaint.");
      navigate("/login");
    }
  };

  // 🔐 Logout Function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Grievance Portal
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="relative group text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/register"
              onClick={handleRegisterClick}
              className="relative group text-gray-300 hover:text-white transition-colors duration-200"
            >
              Register Complaint
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/complaints"
              className="relative group text-gray-300 hover:text-white transition-colors duration-200"
            >
              View Complaints
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
