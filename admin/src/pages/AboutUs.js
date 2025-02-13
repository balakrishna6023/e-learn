import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="aboutus-page-container">
      <h1>About Us</h1>

      <section className="intro-section">
        <p>We are an innovative e-learning platform offering cutting-edge courses in various domains. Our goal is to make quality education accessible, flexible, and engaging for all learners.</p>
      </section>

      <section className="aboutus-section mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide top-tier education that empowers individuals to enhance their careers. We aim to bridge the gap between traditional education and modern workforce demands, offering courses that make a tangible difference in the professional world.
        </p>
      </section>

      <section className="aboutus-section vision">
        <h2>Our Vision</h2>
        <p>
          Our vision is to become the leading global online learning platform, offering a diverse range of courses and learning tools to help individuals across the world realize their potential and achieve their career goals.
        </p>
      </section>

      <section className="aboutus-section team">
        <h2>Our Team</h2>
        <p>
          Our team consists of passionate educators, tech professionals, and creatives working together to bring you engaging and interactive learning experiences. We believe in the power of collaboration to create something greater than the sum of its parts.
        </p>
      </section>

      <section className="aboutus-section why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Expert Instructors:</strong> Learn from leaders in the field who bring real-world experience.</li>
          <li><strong>Flexible Learning:</strong> Access your courses on your own time, from anywhere, on any device.</li>
          <li><strong>Diverse Course Catalog:</strong> Courses across IT, Business, Creative Arts, and more.</li>
          <li><strong>Affordable Pricing:</strong> High-quality education at competitive prices with flexible payment plans.</li>
        </ul>
      </section>

      <section className="aboutus-section contact">
        <h2>Contact Us</h2>
        <p>Have questions or need support? Reach out to us!</p>
        <ul>
          <li><strong>Email:</strong> jilanin17@gmail.com.com</li>
          <li><strong>Phone:</strong> +91 6305786375</li>
          <li><strong>Address:</strong> Hitech city Hyderabad</li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about" className="footer-link">About Us</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
