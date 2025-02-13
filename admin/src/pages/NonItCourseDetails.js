import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItCourseDetails.css';

function NonItCourseDetails() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate(); 

  const courses = [
    {
      id: 1,
      title: 'Digital Marketing',
      instructor: 'Manisha Agarwal',
      rating: 4.6,
      students: 1050,
      price: '₹4000',
      description: 'Learn SEO, content marketing, and social media marketing strategies.',
      image: 'https://media.gettyimages.com/id/1153397912/photo/digital-marketing-online-technology-concept.jpg?s=612x612&w=0&k=20&c=RRdeUzZbNyVIHBbHUFhNWZMgML-hwMWx_zgYoHq7h8M=',
    },
    {
      id: 2,
      title: 'UX/UI Design',
      instructor: 'Ritu Sharma',
      rating: 4.8,
      students: 980,
      price: '₹4500',
      description: 'Master user experience and interface design principles with hands-on.',
      image: 'https://img.freepik.com/free-photo/representations-user-experience-interface-design_23-2150038917.jpg?semt=ais_hybrid',
    },
    {
      id: 3,
      title: 'Content Writing',
      instructor: 'Neha Gupta',
      rating: 4.7,
      students: 850,
      price: '₹3500',
      description: 'Improve writing skills and create engaging content for blogs, websites.',
      image: 'https://knowadays.com/wp-content/uploads/2024/04/X-Content-Writer-Free-Online-Courses_24F_.jpg',
    },
    {
      id: 4,
      title: 'Entrepreneurship Essentials',
      instructor: 'Rahul Verma',
      rating: 4.6,
      students: 770,
      price: '₹5000',
      description: 'Learn how to launch, manage, and grow a successful business.',
      image: 'https://www.vibrantpublishers.com/cdn/shop/articles/Review_Blog_1.jpg?v=1687497599&width=1780',
    },
    {
      id: 5,
      title: 'Video Editing',
      instructor: 'Amit Kumar',
      rating: 4.7,
      students: 940,
      price: '₹4000',
      description: 'Master video editing techniques and tools like Adobe Premiere.',
      image: 'https://images.squarespace-cdn.com/content/v1/606d96d79399245c7831bd25/fb000c7b-523c-4543-b05d-5c984ea0a8ce/Best+Paid+Video+Editing+Courses+Online.png',
    }
  ];

  const handleEnroll = (course) => {
    setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
    navigate(`/full-non-it-course/${course.id}`);
  };

  return (
    <div className="it-course-container">
      <h1>Trending Non-IT Courses</h1>
      <div className="it-courses-grid">
        {courses.map((course) => (
          <div className="it-course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="it-course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Rating:</strong> {course.rating} ⭐ ({course.students} students)</p>
              <p><strong>Price:</strong> {course.price}</p>
              <button
                className="enroll-btn"
                onClick={() => handleEnroll(course)}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonItCourseDetails;
