const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../models/Course");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


const UPLOADS_DIR = "uploads";
const PDF_DIR = path.join(UPLOADS_DIR, "pdfs");
const VIDEO_DIR = path.join(UPLOADS_DIR, "videos");
const IMAGE_DIR = path.join(UPLOADS_DIR, "images");


// Ensure all directories exist before storing files
const ensureDirectories = () => {
  [UPLOADS_DIR, VIDEO_DIR, IMAGE_DIR, PDF_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};
ensureDirectories();

// Function to configure storage for different file types
const storage = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDirectories(); // Ensure directories exist before storing files
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

// File filter function to validate file types
const fileFilter = (allowedTypes) => (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  return mimetype && extname ? cb(null, true) : cb(new Error("Invalid file type"));
};

// Multer configurations for different file categories
const uploadVideo = multer({
  storage: storage(VIDEO_DIR),
  fileFilter: fileFilter(/mp4|mkv|avi|mov/),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit for videos
});

const uploadImage = multer({
  storage: storage(IMAGE_DIR),
  fileFilter: fileFilter(/jpeg|jpg|png|gif/),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for images
});

const uploadSyllabus = multer({
  storage: storage(PDF_DIR),
  fileFilter: fileFilter(/pdf/),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for PDFs
});

const handleCourseSave = async (res, course, message) => {
  try {
    await course.save();
    res.status(200).json({ message, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



router.post(
  "/create-course",
  adminMiddleware,
  multer({ storage: storage(UPLOADS_DIR) }).fields([
    { name: "image", maxCount: 1 },
    { name: "syllabus", maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required" });
    }
    if (!req.files.syllabus) {
      return res.status(400).json({ error: "Syllabus file is required" });
    }

    const newCourse = new Course({
      ...req.body,
      image: req.files.image[0].path,
      syllabus: req.files.syllabus[0].path,
      content: [],
    });

    handleCourseSave(res, newCourse, "Course created successfully");
  }
);


router.put(
  "/update-course/:courseId",
  adminMiddleware,
  multer({ storage: storage(UPLOADS_DIR) }).fields([
    { name: "image", maxCount: 1 },
    { name: "syllabus", maxCount: 1 },
  ]),
  async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });

    if (!course) return res.status(404).json({ error: "Course not found" });

    // Update course details
    Object.assign(course, req.body);

    // Update image if a new one is uploaded
    if (req.files.image) {
      course.image = req.files.image[0].path;
    }

    // Update syllabus if a new one is uploaded
    if (req.files.syllabus) {
      course.syllabus = req.files.syllabus[0].path;
    }

    handleCourseSave(res, course, "Course updated successfully");
  }
);


router.delete("/delete-course/:courseId", adminMiddleware, async (req, res) => {
  const course = await Course.findOneAndDelete({ courseId: req.params.courseId });
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json({ message: "Course deleted successfully" });
});

router.delete("/delete-content/:courseId", adminMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;
  const course = await Course.findOne({ courseId });
  if (!course) return res.status(404).json({ error: "Course not found" });
  const index = course.content.findIndex((c) => c.title.toLowerCase() === title.toLowerCase());
  if (index === -1) return res.status(404).json({ error: "Content not found" });
  const deletedContent = course.content.splice(index, 1);
  handleCourseSave(res, course, "Content deleted successfully", deletedContent[0]);
});

router.post("/add-content/:courseId", adminMiddleware, uploadVideo.array("videos", 10), async (req, res) => {
  const { courseId } = req.params;
  let contents;
  try {
    contents = JSON.parse(req.body.contents);
    if (!Array.isArray(contents)) throw new Error();
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON format for contents" });
  }
  const course = await Course.findOne({ courseId });
  if (!course) return res.status(404).json({ error: "Course not found" });
  if (!req.files.length) return res.status(400).json({ error: "At least one video file is required" });

  const videoContents = contents.map((content, i) => ({
    title: content.title,
    duration: content.duration,
    description: content.description,
    video: req.files[i]?.path || "",
  }));

  course.content.push(...videoContents);
  handleCourseSave(res, course, "Content added successfully");
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});

router.get("/course/:courseId", async (req, res) => {
  const course = await Course.findOne({ courseId: req.params.courseId });
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.status(200).json(course);
});

module.exports = router;
