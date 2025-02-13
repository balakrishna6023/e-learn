import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/course/course/${courseId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);

        if (!isAdmin) {
          const token = localStorage.getItem("token");
          if (token) {
            const enrollmentResponse = await fetch(
              `http://localhost:5000/api/enrollment/check-enrollment/${courseId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (!enrollmentResponse.ok) {
              throw new Error("Error checking enrollment status.");
            }
            const enrollmentData = await enrollmentResponse.json();
            setIsEnrolled(enrollmentData.isEnrolled);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, isAdmin]);

  const handleBackClick = () => navigate("/courses");

  const handleDeleteContent = async (title) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/course/delete-content/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCourse((prevCourse) => ({
        ...prevCourse,
        content: prevCourse.content.filter((item) => item.title !== title),
      }));

      alert(data.message || "Content deleted successfully");
    } catch (err) {
      alert(`Error deleting content: ${err.message}`);
    }
  };

  const handleVideoClick = (index) => {
    console.log("Clicked video index:", index);
    console.log("Is Enrolled:", isEnrolled);

    // Construct the video URL by replacing backslashes with forward slashes
    const videoUrl = course.content[index]?.video
      ? `http://localhost:5000/${course.content[index].video.replace(
          /\\/g,
          "/"
        )}`
      : null;

    if (!videoUrl) {
      console.error(
        "Video URL is missing for content:",
        course.content[index].title
      );
      return;
    }

    console.log("Video URL:", videoUrl);
    setCurrentPlayingIndex(index);

    // Pause and reset any other playing video
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play the selected video
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      currentVideo.play().catch((err) => {
        console.error("Error playing video:", err);
      });
    }
  };
  
  if (loading) return <p>Loading course details...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>Error fetching course details: {error}</p>
    );
  if (!course) return <p>Course not found.</p>;

  const imageSrc = course.image
    ? `http://localhost:5000/${course.image}`
    : "default-image.jpg";

  return (
    <div className="course-details-container">
      <div className="section-container">
        <div className="image-container">
          <img src={imageSrc} alt={course.title} className="course-image" />
        </div>
        <div className="details-container">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Price:</strong> ₹{course.price}
          </p>
          {/* <button id="syllabus" onClick={handleSyllabusClick}>
        Syllabus
      </button> */}
        </div>
      </div>

      <div className="videos-section">
        <h3>Course Content</h3>
        {Array.isArray(course.content) && course.content.length > 0 ? (
          course.content.map((contentItem, index) => (
            <div key={index} className="video-content-container">
              <button
                className="video-title-button"
                onClick={() => handleVideoClick(index)}
              >
                {contentItem.title}
              </button>
              {currentPlayingIndex === index &&
                (isEnrolled || isAdmin ? (
                  <div className="video-container">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="video-player"
                      controls
                    >
                      <source
                        src={`http://localhost:5000/${contentItem.video.replace(
                          /\\/g,
                          "/"
                        )}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="locked-video">
                    <img src="locked-thumbnail.jpg" alt="Locked" />
                    <p>Enroll to Watch</p>
                  </div>
                ))}
              <p>{contentItem.description}</p>
              {isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => handleDeleteContent(contentItem.title)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No content available for this course.</p>
        )}
      </div>

      {!isAdmin && !isEnrolled && (
        <p>You need to enroll in this course to view the videos.</p>
      )}

      <button className="back-button" onClick={handleBackClick}>
        Back to Courses
      </button>
    </div>
  );
}

export default CourseDetails;
