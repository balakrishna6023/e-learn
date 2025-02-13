const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Import your User model

// Import routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const enrollmentCheckRoutes = require("./routes/enrollmentcheck"); // Import enrollment check routes
const userroute = require("./routes/userroute");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure
  });

// Middleware to authenticate and check user role
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Add user info to request object
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Route to check user role
app.get("/api/auth/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user by ID from token
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ role: user.role }); // Return user role (e.g., "admin" or "user")
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/enrollment", enrollmentCheckRoutes); // Add the enrollment check 
app.use("/api/user", userroute); 

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Ensure the server is running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
