import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-semibold">Public Complaint Management</h3>
        <p className="text-sm text-gray-400">
          Making Cities Better, One Complaint at a Time
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
          <a href="/complaints" className="hover:text-blue-400">
            View Complaints
          </a>
          <a href="/register" className="hover:text-blue-400">
            Register
          </a>
          <a href="/contact" className="hover:text-blue-400">
            Contact
          </a>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-400">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          © 2025 Public Complaint Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
