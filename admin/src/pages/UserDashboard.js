import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './UserDashboard.css';  // Import the CSS file

function UserDashboard() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-heading">User Dashboard</h1>
      <div className="dashboard-actions">
        {/* Button to navigate to the user's enrolled courses */}
        <button 
          className="dashboard-button" 
          onClick={() => navigate("/EnrolledCourses")}
        >
          My Courses
        </button>
        
        {/* Button to navigate to the payment status */}
        <button 
          className="dashboard-button" 
          onClick={() => navigate("/PaymentDetails")}
        >
          Payment Status
        </button>
      </div>
    </div>  
  );
}

export default UserDashboard;
