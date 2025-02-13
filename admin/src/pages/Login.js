import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      }
    };

    // Check token expiration every 1 minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Listen for storage changes (handles logout across multiple tabs)
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        const decodedToken = jwtDecode(response.data.token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
          return;
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("email", response.data.user.email);

        window.dispatchEvent(new Event("storage")); // Sync logout across tabs

        navigate(response.data.user.role === "admin" ? "/admindashboard" : "/dashboard");
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Axios Interceptor for handling unauthorized access
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        handleLogout();
        return Promise.reject("Session expired. Please log in again.");
      }
      return Promise.reject(error);
    }
  );

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
