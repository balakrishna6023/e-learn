// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import MyCourses from "./pages/MyCourses";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ItCourseDetails from "./pages/ItCourseDetails";
import FullCourse from "./pages/FullCoursePage";
import NonItCourseDetails from "./pages/NonItCourseDetails";
import NonItFullCourse from "./pages/FullNonItCourse";
import BusinessCourseDetails from "./pages/BusinessCourseDetails";
import FullBusinessCourse from "./pages/FullBusinessCourse";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryManager from "./pages/CategoryManager";
import CourseManager from "./pages/CourseManager";
import UpdateCourse from "./pages/UpdateCourse";
import CreateCourse from "./pages/CreateCourse";
import AddContentForm from "./pages/AddContentForm";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CategoryRelatedCourses from "./pages/CategoryRelatedCourses";
import PaymentComponent from "./pages/PaymentComponent";
import EnrolledCourses from "./pages/EnrolledCourses";
import PaymentDetails from "./pages/PaymentDetails";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses/IT" element={<ItCourseDetails />} />
        <Route path="/courses/Non-IT" element={<NonItCourseDetails />} />
        <Route path="/courses/Business" element={<BusinessCourseDetails />} />
        <Route path="/full-course/:id" element={<FullCourse />} />
        <Route path="/" element={<BusinessCourseDetails />} />
        <Route
          path="/full-business-course/:id"
          element={<FullBusinessCourse />}
        />
        <Route path="/" element={<NonItCourseDetails />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/full-non-it-course/:id" element={<NonItFullCourse />} />
        <Route path="/create-category" element={<CategoryManager />} />
        <Route path="/course-manager" element={<CourseManager />} />
        <Route path="/update-course/:courseId" element={<UpdateCourse />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/add-content" element={<AddContentForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/CategoryRelatedCourses/:categoryId" element={<CategoryRelatedCourses />} />
        <Route path="/paymentcomponent" element={<PaymentComponent />} />
        <Route path="/EnrolledCourses" element={<EnrolledCourses />} />
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
