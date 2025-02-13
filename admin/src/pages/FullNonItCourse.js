import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FullCoursePage.css';

const FullNonItCourse = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const nonItCourses = [
    {
      id: 1,
      title: 'Digital Marketing',
      instructor: 'Manisha Agarwal',
      rating: 4.6,
      students: 1050,
      price: '₹4000',
      description: 'Learn SEO, content marketing, and social media marketing strategies.',
      content: 'Master digital marketing tools and strategies.',
      topics: [
        { title: 'SEO Basics', description: 'Understand the fundamentals of search engine optimization.' },
        { title: 'Social Media Marketing', description: 'Learn strategies to grow your audience and engagement.' },
        { title: 'Content Strategy', description: 'Develop effective content plans and campaigns.' },
      ],
      videos: [
        { title: 'Introduction to Digital Marketing', url: '/videos/digital-marketing-intro.mp4' },
        { title: 'SEO Techniques', url: '/videos/seo-techniques.mp4' },
      ],
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
          content: 'Learn to design intuitive and visually appealing user interfaces.',
          topics: [
            { title: 'User Research', description: 'Understand user needs and behaviors through research.' },
            { title: 'Wireframing and Prototyping', description: 'Create blueprints and prototypes for UI designs.' },
            { title: 'Design Tools', description: 'Master tools like Figma, Adobe XD, and Sketch.' },
          ],
          videos: [
            { title: 'Introduction to UX/UI Design', url: '/videos/uxui-intro.mp4' },
            { title: 'Prototyping Techniques', url: '/videos/prototyping-techniques.mp4' },
          ],
          image: 'https://img.freepik.com/free-photo/representations-user-experience-interface-design_23-2150038917.jpg?semt=ais_hybrid',
        },
        {
          id: 3,
          title: 'Content Writing',
          instructor: 'Anjali Verma',
          rating: 4.7,
          students: 850,
          price: '₹4000',
          description: 'Develop professional writing skills for blogs, articles, and digital content.',
          content: 'Master techniques to create engaging and SEO-friendly content.',
          topics: [
            { title: 'SEO Basics', description: 'Understand the fundamentals of search engine optimization.' },
            { title: 'Copywriting Strategies', description: 'Learn persuasive writing techniques to engage readers.' },
            { title: 'Editing and Proofreading', description: 'Enhance content quality through effective editing methods.' },
          ],
          videos: [
            { title: 'Introduction to Content Writing', url: '/videos/content-writing-intro.mp4' },
            { title: 'SEO Writing Techniques', url: '/videos/seo-writing-techniques.mp4' },
          ],
          image: 'https://img.freepik.com/free-photo/writer-s-workspace-with-laptop-notebook-wooden-desk_23-2147846590.jpg?semt=ais_hybrid',
        },
        {
          id: 4,
          title: 'Entrepreneurship Essentials',
          instructor: 'Rahul Mehta',
          rating: 4.9,
          students: 1200,
          price: '₹5000',
          description: 'Learn the fundamentals of starting and managing a successful business.',
          content: 'Gain insights into business planning, funding strategies, and growth techniques.',
          topics: [
            { title: 'Business Planning', description: 'Develop effective business plans and strategies.' },
            { title: 'Funding and Investment', description: 'Explore various funding options and investor relations.' },
            { title: 'Marketing Strategies', description: 'Build strong marketing campaigns to reach your audience.' },
          ],
          videos: [
            { title: 'Introduction to Entrepreneurship', url: '/videos/entrepreneurship-intro.mp4' },
            { title: 'Funding Your Startup', url: '/videos/funding-your-startup.mp4' },
          ],
          image: 'https://img.freepik.com/free-photo/business-strategy-success-target-goals_53876-124490.jpg?semt=ais_hybrid',
        },
        {
          id: 5,
          title: 'Video Editing',
          instructor: 'Amit Sharma',
          rating: 4.8,
          students: 1050,
          price: '₹4500',
          description: 'Master the art of video editing using industry-standard tools and techniques.',
          content: 'Learn to create professional videos, apply effects, and edit seamlessly.',
          topics: [
            { title: 'Editing Basics', description: 'Understand the fundamentals of video editing and workflows.' },
            { title: 'Transitions and Effects', description: 'Apply creative transitions and visual effects.' },
            { title: 'Audio Synchronization', description: 'Enhance video quality with perfectly synced audio.' },
          ],
          videos: [
            { title: 'Introduction to Video Editing', url: '/videos/video-editing-intro.mp4' },
            { title: 'Advanced Editing Techniques', url: '/videos/advanced-editing-techniques.mp4' },
          ],
          image: 'https://img.freepik.com/free-photo/video-editing-software-screen-modern-computer_23-2149379801.jpg?semt=ais_hybrid',
        },
    ]

  useEffect(() => {
    const foundCourse = nonItCourses.find(course => course.id === Number(id));
    if (!foundCourse) {
      console.error('Course not found!');
      navigate('/');
    } else {
      setCourse(foundCourse);
    }
  }, [id, navigate]);

  if (!course) {
    return <div>Course not found!</div>;
  }

  return (
    <div className="full-course-container">
      <h1>{course.title}</h1>
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

export default FullNonItCourse;
