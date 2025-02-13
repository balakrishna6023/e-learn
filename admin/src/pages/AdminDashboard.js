import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Button to navigate to the "create-course" route */}
      <button onClick={() => navigate("/create-category")}>Category Manager</button>
      <button onClick={() => navigate("/course-manager")}>Course manager</button>
    </div>  
  );
}

export default AdminDashboard;
