const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, required: true },
    instructor: { type: String, required: true },
    content: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        video: { type: String, required: true }, // Path to the video file
      },
    ],
    // Path to the PDF syllabus
    price: { type: Number, default: 0 },
    image: { type: String, required: true },
    syllabus: { type: String, required: true } // New image field for storing the image path
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
