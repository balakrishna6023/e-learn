const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Password stored in plain text (no hashing)
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validates if the mobile number is exactly 10 digits
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only allows 'user' or 'admin' as role values
      default: 'user', // Default to 'user' role if none provided
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model('User', userSchema);
module.exports = User;
