import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Learning Platform</h1>
          <p>Learn IT and Non-IT courses at your own pace.</p>
          <button className="btn-primary">Join Course</button>
        </div>
        <div className="hero-image"></div>
      </header>

      <section className="statistics">
        <h2>Our Impact So Far</h2>
        <div className="stat-item">
          <h2>15K+</h2>
          <p>
            Graduates in IT - Empowering the next generation of tech leaders.
          </p>
        </div>
        <div className="stat-item">
          <h2>500+</h2>
          <p>
            Business Instructors - Experienced professionals guiding your
            learning journey.
          </p>
        </div>
        <div className="stat-item">
          <h2>200K+</h2>
          <p>
            Global Students - Join a thriving community of learners worldwide.
          </p>
        </div>
        <div className="stat-item">
          <h2>150+</h2>
          <p>
            Courses Offered - From Business to Arts, we have something for
            everyone.
          </p>
        </div>
      </section>

      <section className="popular-courses">
        <h2>Explore Our Courses for Graduates</h2>
        <p>
          Our diverse range of courses is tailored to equip you with the
          essential skills needed in today's job market. Here are some of our
          most popular offerings:
        </p>
        <div className="course-list">
          <div className="course-item">
            <img src="/images/coding.jpg" alt="Coding" />
            <h3>Advanced Web Development</h3>
            <p>
              Learn the latest web technologies and frameworks to build dynamic
              web applications.
            </p>
            <p>
              <strong>Eligibility:</strong> Open to all students, no prior
              experience required.
            </p>
            <p>Price: 4500.00</p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="course-item">
            <img src="/images/business.jpg" alt="Business" />
            <h3>Business Strategy Masterclass</h3>
            <p>
              Master the art of strategic planning and execution in today’s
              business environment.
            </p>
            <p>
              <strong>Eligibility:</strong> Ideal for aspiring business leaders.
            </p>
            <p>Price: 4500.00</p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="course-item">
            <img src="/images/marketing.jpg" alt="Marketing" />
            <h3>Digital Marketing Essentials</h3>
            <p>
              Gain expertise in digital marketing strategies, SEO, and social
              media marketing.
            </p>
            <p>
              <strong>Eligibility:</strong> Suitable for beginners and
              professionals.
            </p>
            <p>Price: 4500.00</p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="course-item">
            <img src="/images/arts.jpg" alt="Arts" />
            <h3>Creative Arts for Beginners</h3>
            <p>
              Explore your creativity through various artistic mediums and
              techniques.
            </p>
            <p>
              <strong>Eligibility:</strong> Open to all, no prior art experience
              needed.
            </p>
            <p>Price: 4500.00</p>
            <button className="btn-primary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="internship-training highlight">
        <h2>Internship Programs with Certifications</h2>
        <p>
          Our platform offers valuable internship programs specifically designed
          for college students to gain hands-on experience during their semester
          internships. We provide certificates upon completion, enhancing your
          resume and career prospects.
        </p>
        <p>Internships are available in various fields, including:</p>
        <ul>
          <li>Web Development</li>
          <li>Digital Marketing</li>
          <li>Business Analytics</li>
          <li>Graphic Design</li>
        </ul>
        <p>
          Work on live projects, gain mentorship, and collaborate with industry
          professionals to enhance your practical skills.
        </p>

        <div className="internship-cards">
          <div className="internship-card">
            <h3>Web Development Internship</h3>
            <p>
              Work with experienced developers and build dynamic web
              applications. Enhance your coding skills through real-world
              projects.
            </p>
            <ul>
              <li>Mentorship from senior developers</li>
              <li>Hands-on experience in web development</li>
              <li>Networking opportunities with industry professionals</li>
            </ul>
            <button className="btn-primary">Apply Now</button>
          </div>
          <div className="internship-card">
            <h3>Digital Marketing Internship</h3>
            <p>
              Gain expertise in digital marketing strategies, SEO, social media
              marketing, and more. Work with our marketing team on live
              campaigns.
            </p>
            <ul>
              <li>Learn SEO & SEM strategies</li>
              <li>Real-time exposure to digital campaigns</li>
              <li>Work with analytics and reporting tools</li>
            </ul>
            <button className="btn-primary">Apply Now</button>
          </div>
          <div className="internship-card">
            <h3>Business Analytics Internship</h3>
            <p>
              Develop your analytical skills and work on real-time business
              projects. Use data to make informed decisions and drive business
              strategy.
            </p>
            <ul>
              <li>Data collection and analysis techniques</li>
              <li>Exposure to industry-standard tools</li>
              <li>Collaborative projects with business leaders</li>
            </ul>
            <button className="btn-primary">Apply Now</button>
          </div>
        </div>

        <button className="btn-primary">Explore All Internships</button>
      </section>

      <section className="career-assistance">
        <h2>Career Support & Certifications</h2>
        <p>
          We provide comprehensive career coaching, resume building, mock
          interviews, and certification assistance to help you land your dream
          job. Our support extends to all students, including those in high
          school and college.
        </p>

        <div className="support-list">
          <div className="support-item">
            <h3>Personalized Resume Reviews</h3>
            <p>
              Receive tailored feedback on your resume to highlight your
              strengths and achievements.
            </p>
          </div>
          <div className="support-item">
            <h3>Mock Interview Sessions</h3>
            <p>
              Participate in practice interviews with industry experts to boost
              your confidence.
            </p>
          </div>
          <div className="support-item">
            <h3>Job Placement Assistance</h3>
            <p>
              Get help with job searching and connect with potential employers
              through our network.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-section">
        <h2>Latest Insights & Blogs</h2>
        <p>
          Stay updated with the latest trends in education, technology, and
          career development. Check out our featured articles:
        </p>
        <div className="blog-grid">
          <div className="blog-item">
            <img src="/images/blog1.jpg" alt="Blog 1" />
            <h3>Trends in Digital Marketing</h3>
            <p>
              Discover the latest strategies in digital marketing to stay ahead
              of the curve.
            </p>
            <a href="#">Read More</a>
          </div>
          <div className="blog-item">
            <img src="/images/blog2.jpg" alt="Blog 2" />
            <h3>Web Development Tips</h3>
            <p>
              Learn the best practices in web development to build scalable
              applications.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Start Learning Today!</h2>
        <p>
          Join our community of learners and take your career to the next level
          with our expert-led courses. Whether you're a high school student or a
          graduate, we have something for you!
        </p>
        <button className="btn-primary">Join Now</button>
      </section>
    </div>
  );
}

export default Home;
