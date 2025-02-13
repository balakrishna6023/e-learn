import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItCourseDetails.css';

function ItCourseDetails() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate(); 

  const itCourses = [
    {
      id: 1,
      title: 'Web Development',
      instructor: ' Vinay Bhaskar',
      rating: 4.7,
      students: 1150,
      price: '₹4500',
      description: 'Learn HTML, CSS, JavaScript, and React to build modern web applications.',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231205165904/web-development-image.webp',
    },
    {
      id: 2,
      title: 'Data Science',
      instructor: 'Anand Uppada',
      rating: 4.8,
      students: 980,
      price: '₹4500',
      description: 'Master data analysis, visualization, and machine learning with Python.',
      image: 'https://media.istockphoto.com/id/1480376540/photo/ai-technology-businessman-touch-brain-working-data-and-algorithm-of-artificial-intelligence.webp?a=1&b=1&s=612x612&w=0&k=20&c=TbaFKDmuDHvA8DgcCVrrnPv2J7p3E4Ls58skWSSzr4E=',
    },
    {
      id: 3,
      title: 'AI - Artificial Intelligence',
      instructor: 'Rakshita',
      rating: 4.9,
      students: 1500,
      price: '₹4500',
      description: 'Learn the foundations of Artificial Intelligence, machine learning, and neural networks.',
      image: 'https://img.freepik.com/free-photo/view-futuristic-robot-school-environment_23-2151110144.jpg?semt=ais_hybrid',
    },
    {
      id: 4,
      title: 'Big Data',
      instructor: ' Lalitha',
      rating: 4.7,
      students: 1100,
      price: '₹4500',
      description: 'Explore big data technologies, Hadoop, Spark, and how to process and analyze large datasets.',
      image: 'https://img.freepik.com/premium-photo/big-data-analysing-server-internet-technology_161452-11500.jpg?semt=ais_hybrid',
    },
    {
      id: 5,
      title: 'Cybersecurity Fundamentals',
      instructor: ' Pallavi',
      rating: 4.8,
      students: 1250,
      price: '₹4500',
      description: 'Learn how to secure networks, systems, and applications in the face of modern cybersecurity threats.',
      image: 'https://t4.ftcdn.net/jpg/02/45/63/69/360_F_245636933_kY23ohGptK5t6n8wGSXIgLgVXWeHJRct.jpg',
    },
    {
      id: 6,
      title: 'Machine Learning',
      instructor: 'Lalitha',
      rating: 4.9,
      students: 1350,
      price: '₹4500',
      description: 'Dive into machine learning and AI with hands-on projects and Python.',
      image: 'https://t3.ftcdn.net/jpg/02/58/87/10/360_F_258871009_f5net6t178mMF1nekdg2AS2vuOUhpDjL.jpg',
    },
  ];
  const handleEnroll = (course) => {
    setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);

    navigate(`/full-course/${course.id}`);
  };

  return (
    <div className="it-course-container">
      <h1>All IT Courses</h1>
      <div className="it-courses-grid">
        {itCourses.map((course) => (
          <div className="it-course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="it-course-image" />
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

export default ItCourseDetails;
