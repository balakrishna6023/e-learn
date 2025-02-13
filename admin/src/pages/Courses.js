import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // To store enrolled courses
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(32);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
        setUser(decoded);
      } catch (err) {
        console.error("Token decoding failed:", err);
      }
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/user/enrolled-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setEnrolledCourses(data.map((course) => course.courseId)); // Save course IDs
        } catch (err) {
          console.error("Error fetching enrolled courses:", err);
        }
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleEnrollClick = (courseId) => {
    navigate(`/paymentcomponent`, { state: { courseId } });
  };

  const handleDeleteCourse = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/course/delete-course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert(data.message || "Course deleted successfully.");
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Error deleting course.");
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error fetching courses: {error}</p>;
  }

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="course-cards">
          {currentCourses.map((course) => (
            <div className="course-card" key={course.courseId}>
              <img
                src={
                  course.image
                    ? `http://localhost:5000/${course.image}`
                    : "default-image.jpg"
                }
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

                {/* Show Enroll button only if user is not enrolled and not admin */}
                {!isAdmin && !enrolledCourses.includes(course.courseId) && (
                  <button
                    className="enroll-button"
                    onClick={() => handleEnrollClick(course.courseId)}
                  >
                    Enroll
                  </button>
                )}

                {isAdmin && (
                  <div className="admin-buttons">
                    <button
                      className="update-course-button"
                      onClick={() =>
                        navigate(`/update-course/${course.courseId}`)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="delete-course-button"
                      onClick={() => handleDeleteCourse(course.courseId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Courses;
