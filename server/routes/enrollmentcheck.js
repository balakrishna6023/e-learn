const express = require("express");
const router = express.Router();
const Payment = require('../models/Payment');
const adminMiddleware = require('../middleware/adminMiddleware'); // Admin middleware

// Route to check enrollment for users
router.get('/check-enrollment/:courseId', adminMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authMiddleware
    const { courseId } = req.params;

    // Check for a successful payment record for the user and course
    const paymentRecord = await Payment.findOne({ 
      userId, 
      courseId, 
      status: 'successful' 
    });

    if (paymentRecord) {
      return res.status(200).json({ isEnrolled: true });
    } else {
      return res.status(200).json({ isEnrolled: false });
    }
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// If you need to protect some other route for admins only
router.get('/admin-only', adminMiddleware, (req, res) => {
  res.status(200).json({ message: "Admin route accessed." });
});

module.exports = router;
