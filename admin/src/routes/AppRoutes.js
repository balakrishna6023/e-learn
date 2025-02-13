import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Courses from "../pages/Courses/Courses";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
