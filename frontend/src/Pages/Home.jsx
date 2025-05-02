import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to register a complaint.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <h1 className="relative text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Public Complaint Management
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Streamline your complaint registration and tracking process with our
            modern, efficient platform.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
              <p className="text-gray-400">
                Quick and simple complaint registration process
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-400">
                Monitor your complaint status in real-time
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Resolution</h3>
              <p className="text-gray-400">
                Efficient handling and quick resolution of complaints
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              onClick={handleRegisterClick}
              className="relative group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">Register Complaint</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/complaints"
              className="relative group bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-700"
            >
              <span className="relative z-10">View Complaints</span>
              <div className="absolute inset-0 bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
