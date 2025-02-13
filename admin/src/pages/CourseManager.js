import React from 'react';
import { Link } from 'react-router-dom';
import './coursemanager.css'

const CourseManager = () => {
  

  return (
    <div className="course-manager">
      <h1 className="course-manager-heading">Course Manager</h1>
      <div className="course-manager-action">
        <Link to="/create-course" className="create-course-button">
          Create New Course
        </Link>
        <br />
        <Link to="/add-content" className="create-course-button">
          Add Content
        </Link>
        <br></br>
        <Link to="/courses" className="create-course-button">
          Courses available
        </Link>
      </div>
    </div>
  );
};

export default CourseManager;
