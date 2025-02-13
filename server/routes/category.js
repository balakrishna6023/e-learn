const express = require("express");
const multer = require("multer");
const path = require("path");
const Category = require("../models/Category");
const adminMiddleware = require("../middleware/adminMiddleware");
const Course = require("../models/Course");
const router = express.Router();

// Setup multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid name collisions
  },
});

const upload = multer({ storage: storage });

// Route to upload image
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Route to create a category (admin-only)
router.post(
  "/create-category",
  adminMiddleware,
  upload.single("image"), // Use multer to handle image uploads
  async (req, res) => {
    const { categoryId, name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
      // Ensure categoryId is provided
      if (!categoryId) {
        return res.status(400).json({ error: "Category ID is required" });
      }

      // Check if categoryId already exists
      const existingCategory = await Category.findOne({ categoryId });
      if (existingCategory) {
        return res.status(400).json({ error: "Category ID must be unique" });
      }

      // Prepare category data
      const categoryData = {
        categoryId,
        name,
        description,
        image,
      };

      // Save the category to the database
      const newCategory = new Category(categoryData);
      await newCategory.save();

      res.status(201).json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      console.error("Error creating category:", error.message);
      res.status(500).json({ error: "Error creating category" });
    }
  }
);

// Route to fetch all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error.stack);
    res.status(500).json({ error: "Error fetching categories" });
  }
});


// Route to fetch category by categoryId
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from URL parameters

  try {
    // Find the category by categoryId
    const category = await Category.findOne({ categoryId });

    // If category not found, return error
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Return the found category
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ error: "Error fetching category" });
  }
});


// Route to update a category by categoryId (admin-only)
router.put(
  "/update-category/:categoryId",
  adminMiddleware,
  upload.single("image"), // Use multer to handle image uploads
  async (req, res) => {
    const { categoryId } = req.params; // Get the categoryId from the URL
    const { name, description } = req.body; // Extract text fields
    const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Get image path if uploaded

    try {
      // Find the category by categoryId
      const category = await Category.findOne({ categoryId });
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Update the category fields
      if (name) category.name = name;
      if (description) category.description = description;
      if (image) category.image = image; // Only update image if new one is provided

      // Save the updated category
      await category.save();

      res.status(200).json({
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      console.error("Error updating category:", error.message);
      res.status(500).json({ error: "Error updating category" });
    }
  }
);

// Route to delete a category by categoryId (admin-only)
router.delete("/delete-category/:categoryId", adminMiddleware, async (req, res) => {
  const { categoryId } = req.params; // Get the categoryId from the URL

  try {
    // Find the category by categoryId and delete it
    const category = await Category.findOneAndDelete({ categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ error: "Error deleting category" });
  }
});


router.get("/courses/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params; // Get the categoryId from the URL parameters

  try {
    // Find all courses that belong to the specified categoryId
    const courses = await Course.find({ categoryId });

    // If no courses are found for the given categoryId, return a 404 error
    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "No courses found for this category" });
    }

    // Return the found courses
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: "Error fetching courses" });
  }
});

module.exports = router;
