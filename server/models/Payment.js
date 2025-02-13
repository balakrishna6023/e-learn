const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    razorpayOrderId: { type: String, required: true }, // Ensure this is included
    razorpayPaymentId: { type: String },
    status: { type: String, enum: ['pending', 'successful', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
