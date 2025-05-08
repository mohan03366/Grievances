import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RegisterComplaint from "./Pages/RegisterComplaint";
import ComplaintsList from "./Pages/ComplaintsList";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageComplaints from "./Admin/ManageComplaints";
import ManageUsers from "./Admin/ManageUsers";
import UpdateStatus from "./Pages/UpdateStatus";
import Footer from "./Components/Footer";
import AdminSignup from "./Admin/AdminSignup";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<RegisterComplaint />} />
        <Route path="/update-status/:id" element={<UpdateStatus />} />
        <Route path="/complaints" element={<ComplaintsList />} />

        {/* Admin Routes */}

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<ManageComplaints />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
