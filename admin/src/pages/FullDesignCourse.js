import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FullCoursePage.css';

const FullDesignCourse = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const designCourses = [
    
    {
      id: 1,
      title: 'Graphic Design Mastery',
      instructor: 'Ali',
      rating: 4.9,
      students: 950,
      price: '₹6500',
      description: 'Master graphic design principles and tools to create stunning visuals for web and print.',
      image: 'graphic-design.jpg',
      content: 'Learn the essentials of graphic design, including color theory, typography, and image editing.',
      topics: [
        { title: 'Color Theory', description: 'Explore color psychology and how to use color in design effectively.' },
        { title: 'Typography Mastery', description: 'Understand how to choose and pair fonts for maximum impact.' },
        { title: 'Logo and Branding', description: 'Learn how to create memorable logos and build strong brand identities.' },
      ],
      videos: [
        { title: 'Designing with Color', url: '/videos/designing-with-color.mp4' },
        { title: 'Typography in Design', url: '/videos/typography-design.mp4' },
      ],
    },
    {
        id: 2,
        title: 'UI/UX Design Fundamentals',
        instructor: 'Jagadeesh',
        rating: 4.8,
        students: 1200,
        price: '₹6000',
        description: 'Learn the fundamentals of UI/UX design, from wireframing to high-fidelity designs.',
        content: 'Dive into user-centered design principles and enhance your skills in creating intuitive interfaces.',
        topics: [
          { title: 'UI Design Basics', description: 'Understand the fundamentals of user interface design, including layout and typography.' },
          { title: 'User Experience Research', description: 'Learn how to conduct research to create designs that solve real user problems.' },
          { title: 'Wireframing and Prototyping', description: 'Master tools and techniques for wireframing and creating interactive prototypes.' },
        ],
        videos: [
          { title: 'UI Design Essentials', url: '/videos/ui-design-essentials.mp4' },
          { title: 'Wireframing Techniques', url: '/videos/wireframing-techniques.mp4' },
        ],
      },
  ];

  useEffect(() => {
    const foundCourse = designCourses.find(course => course.id === Number(id));
    if (!foundCourse) {
      console.error('Course not found!');
    } else {
      setCourse(foundCourse);
    }
  }, [id]);

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
    <div className="full-course-container">
      <h1>{course.title}</h1>
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-details">
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Price:</strong> {course.price}</p>
        <p><strong>Rating:</strong> {course.rating} ⭐</p>
        <p><strong>Students:</strong> {course.students}</p>

        <h2>Description</h2>
        <p>{course.description}</p>

        <h3>Course Content</h3>
        <p>{course.content}</p>

        <button onClick={() => setShowTopics(prevState => !prevState)}>
          {showTopics ? 'Hide Topics' : 'Show Topics'}
        </button>
        <div className={showTopics ? 'visible' : 'hidden'}>
          <h3>Topics Covered</h3>
          <ul>
            {course.topics.map((topic, index) => (
              <li key={index}>
                <strong>{topic.title}</strong>: {topic.description}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => setShowVideos(prevState => !prevState)}>
          {showVideos ? 'Hide Videos' : 'Show Videos'}
        </button>
        <div className={showVideos ? 'visible' : 'hidden'}>
          <h3>Videos</h3>
          <div className="videos">
            {course.videos.map((video, index) => (
              <div key={index} className="video-item">
                <h4>{video.title}</h4>
                <video controls width="300" height="auto">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullDesignCourse;
