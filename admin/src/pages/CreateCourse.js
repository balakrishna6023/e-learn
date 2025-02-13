import React, { useState, useEffect } from "react";
import axios from "axios";
import './createcourse.css';

const CreateCourse = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
    categoryId: "",
    instructor: "",
    price: "",
    image: null,
    syllabus: null, // Track the uploaded syllabus file
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { courseId, title, description, categoryId, instructor, price, image, syllabus } = formData;
    if (!courseId || !title || !description || !categoryId || !instructor || !price || !image || !syllabus) {
      setError("All fields are required, including an image and syllabus file.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("courseId", courseId);
      data.append("title", title);
      data.append("description", description);
      data.append("categoryId", categoryId);
      data.append("instructor", instructor);
      data.append("price", price);
      data.append("image", image);
      data.append("syllabus", syllabus);

      const response = await axios.post(
        "http://localhost:5000/api/course/create-course",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Course created successfully!");
      setError(null);
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Failed to create course. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="create-course-container">
      <h1 className="create-course-title">Create Course</h1>
      {error && <p className="create-course-message create-course-error">{error}</p>}
      {success && <p className="create-course-message create-course-success">{success}</p>}

      <form className="create-course-form" onSubmit={handleSubmit}>
        <label className="create-course-label">Course ID:</label>
        <input className="create-course-input" type="text" name="courseId" value={formData.courseId} onChange={handleChange} required />

        <label className="create-course-label">Title:</label>
        <input className="create-course-input" type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label className="create-course-label">Description:</label>
        <textarea className="create-course-textarea" name="description" value={formData.description} onChange={handleChange} required></textarea>

        <label className="create-course-label">Category:</label>
        <select className="create-course-select" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryId}>{category.name}</option>
          ))}
        </select>

        <label className="create-course-label">Instructor:</label>
        <input className="create-course-input" type="text" name="instructor" value={formData.instructor} onChange={handleChange} required />

        <label className="create-course-label">Price:</label>
        <input className="create-course-input" type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label className="create-course-label">Image:</label>
        <input className="create-course-input" type="file" name="image" onChange={handleFileChange} required />

        <label className="create-course-label">Syllabus (PDF):</label>
        <input className="create-course-input" type="file" name="syllabus" onChange={handleFileChange} required />

        <button className="create-course-button" type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;