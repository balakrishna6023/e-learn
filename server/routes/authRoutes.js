const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, mobile, email, password, adminCode } = req.body;

    // console.log("Entered Admin Code:", adminCode);
    // console.log("Expected Admin Code:", process.env.ADMIN_CODE);

    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or mobile already exists" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    // Ensure both values are treated as strings and trim any extra spaces
    const role =
      adminCode?.trim() === process.env.ADMIN_CODE?.trim() ? "admin" : "user";

    console.log("Assigned Role:", role);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", role });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please check your email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password. Please try again." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
});

module.exports = router;
