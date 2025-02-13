const express = require("express");
const router = express.Router();
const Course = require("../models/Course"); // Assuming you have a Course model
const Payment = require("../models/Payment"); // Assuming you have a Payment model
const userOrAdminMiddleware = require("../middleware/adminMiddleware"); // Import the middleware

// Route to get courses enrolled by the user (with authentication)
router.get("/enrolled-courses", userOrAdminMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email; // Use the email from the authenticated user

    // Fetch payments made by the user using their email (userEmail is available via req.user)
    const payments = await Payment.find({ userEmail: userEmail });

    if (payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this user." });
    }

    // Extract courseIds from payments
    const courseIds = payments.map((payment) => payment.courseId);

    // Fetch course details based on courseIds
    const courses = await Course.find({ courseId: { $in: courseIds } });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No course details found." });
    }

    // Return the list of enrolled courses
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
