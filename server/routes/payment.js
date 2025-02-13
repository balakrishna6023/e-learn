const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Course = require('../models/Course');
const Payment = require('../models/Payment');
const User = require('../models/User');
require('dotenv').config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Payment Order for Course
router.post('/payment/course', async (req, res) => {
  const { userEmail, courseId } = req.body;

  try {
    // Fetch user details
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch course details
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create a Razorpay order
    const orderOptions = {
      amount: course.price * 100, // Amount in paise (1 INR = 100 paise)
      currency: 'INR', // Currency
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`, // Unique receipt number
      notes: {
        courseId: course.courseId,
        userEmail: userEmail,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save payment record
    const payment = new Payment({
      userId: user._id,
      userEmail,
      courseId: course.courseId,
      courseTitle: course.title,
      amount: course.price,
      razorpayOrderId: order.id,
      status: 'pending',
    });
    await payment.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      keyId: process.env.RAZORPAY_KEY_ID, // Send the Razorpay Key ID to the client
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay Payment Signature
const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  const secret = process.env.RAZORPAY_KEY_SECRET; // Ensure this is correct

  const generatedSignature = crypto.createHmac('sha256', secret)
                                   .update(body)
                                   .digest('hex');

  return generatedSignature === signature;
};

router.post('/payment/confirm', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  console.log("Received Request Body:", req.body);

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  console.log("Generated Body:", body);

  const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
  const expectedSignature = crypto
    .createHmac('sha256', razorpaySecret)
    .update(body)
    .digest('hex');

  console.log("Razorpay Secret:", razorpaySecret);
  console.log("Expected Signature:", expectedSignature);

  if (expectedSignature === razorpaySignature) {
    try {
      // Verify the order exists in the database
      const payment = await Payment.findOne({ razorpayOrderId });
      console.log("Payment Record Found:", payment);

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      payment.status = 'successful';
      await payment.save();

      return res.status(200).json({ success: true, message: "Payment confirmed" });
    } catch (err) {
      console.error("Database Query Error:", err.message);
      return res.status(500).json({ success: false, message: "Database error" });
    }
  } else {
    console.error("Signature Mismatch Error");
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});


// Get all payments made by the user
router.get('/payment/details', async (req, res) => {
  const { userEmail } = req.query;

  try {
    // Fetch the user details
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all payments made by the user
    const payments = await Payment.find({ userEmail: userEmail });

    if (payments.length === 0) {
      return res.status(404).json({ error: 'No payments found for this user' });
    }

    // Send the payments data
    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error('Error fetching payment details:', error.message);
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
