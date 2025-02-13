import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  const enrolledCourses = ['HTML', 'CSS', 'JavaScript']; 

  const handleNavigate = () => {
    navigate('/FullCoursePage'); 
  };

  return (
    <div>
      <h1>Enrolled Courses</h1>
      <ul>
        {enrolledCourses.map((course, index) => (
          <li key={index}>{course}</li> 
        ))}
      </ul>
      <button onClick={handleNavigate}>Go to Next Page</button> 
    </div>
  );
};

export default MyComponent;
