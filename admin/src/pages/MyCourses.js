import React, { useState, useEffect } from 'react';

function MyCourses() {
  const allCourses = [
    { id: 1, title: 'Web Development', description: 'Learn HTML, CSS, JavaScript, and React' },
    { id: 2, title: 'Data Science', description: 'Master data analysis and machine learning' },
    { id: 3, title: 'Digital Marketing', description: 'Learn SEO, SEM, and social media strategies' },
    { id: 4, title: 'Graphic Design', description: 'Explore design principles and Adobe tools' },
    { id: 5, title: 'Cybersecurity', description: 'Protect systems, networks, and programs from cyber threats' },
    { id: 6, title: 'Photography', description: 'Master the art of photography with professional techniques' },
    { id: 7, title: 'Machine Learning', description: 'Build machine learning models' },
    { id: 8, title: 'Creative Writing', description: 'Express your creativity through storytelling' },
  ];

  const [myCourses, setMyCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [progress, setProgress] = useState({}); 

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
    const storedProgress = JSON.parse(localStorage.getItem('progress')) || {};
    setMyCourses(storedCourses);
    setProgress(storedProgress);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredCourses([]);
    } else {
      const results = allCourses.filter((course) =>
        course.title.toLowerCase().includes(query)
      );
      setFilteredCourses(results);
    }
  };

  const addCourseToMyCourses = (courseId) => {
    if (!myCourses.includes(courseId)) {
      const updatedCourses = [...myCourses, courseId];
      setMyCourses(updatedCourses);
      localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    }
  };

  const removeCourseFromMyCourses = (courseId) => {
    const updatedCourses = myCourses.filter((id) => id !== courseId);
    setMyCourses(updatedCourses);
    localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
  };

  const updateProgress = (courseId, percentage) => {
    const updatedProgress = { ...progress, [courseId]: percentage };
    setProgress(updatedProgress);
    localStorage.setItem('progress', JSON.stringify(updatedProgress));
  };

  return (
    <div className="page-container">
      <h1>My Courses</h1>
      <p>Manage and track your enrolled courses here. Continue from where you left off!</p>

      <div>
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {searchQuery && filteredCourses.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {filteredCourses.map((course) => (
              <li key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => addCourseToMyCourses(course.id)}>Add to My Courses</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchQuery === '' && (
        <div>
          <h2>My Courses</h2>
          <ul>
            {myCourses.map((courseId) => {
              const course = allCourses.find(course => course.id === courseId);
              const courseProgress = progress[courseId] || 0;
              return (
                <li key={courseId}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p>Progress: {courseProgress}%</p>
                  <button onClick={() => updateProgress(courseId, Math.min(courseProgress + 10, 100))}>
                    Mark 10% Complete
                  </button>
                  <button onClick={() => alert(`You will continue from the last lesson in ${course.title}.`)}>Continue</button>
                  <button onClick={() => removeCourseFromMyCourses(courseId)}>Remove</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About Us</a> | <a href="#">Contact</a> | <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default MyCourses;
