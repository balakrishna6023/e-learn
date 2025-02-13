const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct path to User model

// Middleware to verify user or admin access
const userOrAdminMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1]?.trim();

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user data to request object
    req.user = user;

    // Allow regular users to access /get-enrolled-courses or any other route they are authorized for
    if (req.originalUrl.includes("/get-enrolled-courses")) {
      return next(); // Proceed to the next route handler for authenticated users
    }

    // If the route requires admin access (e.g., /admin-only), check for the admin role
    if (req.originalUrl.includes("/admin-only")) {
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    }

    // If the route requires user access and doesn't match admin route
    if (req.originalUrl.includes("/user")) {
      // Here, you can allow users to access other routes related to their permissions
      return next();
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in user/admin middleware:", error.message);

    // Handle JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please provide a valid token." });
    }

    res.status(403).json({ message: "Invalid token or access denied." });
  }
};

module.exports = userOrAdminMiddleware;
