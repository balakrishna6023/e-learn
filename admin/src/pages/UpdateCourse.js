import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate instead of useHistory
import './UpdateCourse.css';

function UpdateCourse() {
  const { courseId } = useParams(); // Get the courseId from the URL params
  const navigate = useNavigate();  // Updated to useNavigate
  
  const [course, setCourse] = useState({
    title: '',
    description: '',
    categoryId: '',
    instructor: '',
    price: '',
    image: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/course/course/${courseId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get token from localStorage
    if (!token) {
      alert('You must be logged in to update a course');
      return;
    }

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('categoryId', course.categoryId);
    formData.append('instructor', course.instructor);
    formData.append('price', course.price);
    if (image) {
      formData.append('image', image);  // Append image file if provided
    }

    try {
      const response = await fetch(`http://localhost:5000/api/course/update-course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
        },
        body: formData,  // Use FormData for multipart form submission
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Course updated successfully', result);
      navigate('/courses');  // Redirect to the courses page after successful update
    } catch (err) {
      console.error('Error updating course:', err);
      setError('Failed to update the course');
    }
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="update-course-container">
      <h2>Update Course</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category ID</label>
          <input
            type="text"
            id="categoryId"
            name="categoryId"
            value={course.categoryId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={course.instructor}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={course.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          {course.image && !image && (
            <div>
              <img src={course.image} alt="Current Course" width="100" />
              <p>Current image</p>
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="update-button">Update Course</button>
      </form>
    </div>
  );
}

export default UpdateCourse;
