const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    categoryId: { 
      type: String, 
      required: true, 
      unique: true,  // Ensure categoryId is unique
    },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String }, // URL to the category image
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Check if the model is already defined, if not, define it
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;
