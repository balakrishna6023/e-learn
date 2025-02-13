import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./Courses.css";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    } else {
      setError("Token not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/user/enrolled-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data || []);
      } catch (err) {
        setError("Error fetching courses or user not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <p>Loading enrolled courses...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="courses-container">
      <h1>Your Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        <div className="course-cards">
          {currentCourses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={course.image ? `http://localhost:5000/${course.image}` : "default-image.jpg"}
                alt={course.title}
                className="course-image"
              />
              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <p className="course-price">Price: ₹{course.price}</p>
                <p className="course-instructor">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <button
                  className="view-course-button"
                  onClick={() => handleViewCourseClick(course.courseId)}
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(courses.length / coursesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
