import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false); // To check if the user is a regular user

  const updateAuthState = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token); // Update authentication state
    setIsAdmin(role === 'admin'); // Update admin state
    setIsUser(role === 'user'); // Update user state
  };

  useEffect(() => {
    updateAuthState(); // Initial state update

    const handleStorageChange = () => {
      updateAuthState(); // Update state on localStorage changes
    };

    window.addEventListener('storage', handleStorageChange); // Listen for localStorage changes
    return () => {
      window.removeEventListener('storage', handleStorageChange); // Cleanup
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsUser(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/categories" className="navbar-link">Categories</Link></li>
        <li><Link to="/courses" className="navbar-link">Courses</Link></li>
        <li><Link to="/about" className="navbar-link">About Us</Link></li>
        <li><Link to="/contact" className="navbar-link">Contact Us</Link></li>

        {/* Admin dashboard link */}
        {isAuthenticated && isAdmin && (
          <li><Link to="/admindashboard" className="navbar-link">Admin Dashboard</Link></li>
        )}

        {/* User dashboard link */}
        {isAuthenticated && isUser && (
          <li><Link to="/dashboard" className="navbar-link">User Dashboard</Link></li>
        )}

        {/* If not authenticated, show login and signup links */}
        {!isAuthenticated ? (
          <>
            <li><Link to="/signup" className="navbar-link">Signup</Link></li>
            <li><Link to="/login" className="navbar-link">Login</Link></li>
          </>
        ) : (
          // If authenticated, show logout button
          <li><button onClick={handleLogout} className="navbar-link">Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
