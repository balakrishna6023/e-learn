import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItCourseDetails.css';

function BusinessCourseDetails() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const businessCourses = [
     
      {
        id: 1,
        title: 'Digital Marketing Mastery',
        instructor: 'Priya ',
        rating: 4.7,
        students: 1050,
        price: '₹4500',
        description: 'Master modern marketing techniques, including digital marketing and social media advertising.',
        image: 'https://t3.ftcdn.net/jpg/01/06/62/40/360_F_106624043_V4g6sbNbHmXFdALPgncTA66thYbNJPOf.jpg',
      },
      {
        id: 2,
        title: 'Financial Management',
        instructor: 'Vikram ',
        rating: 4.9,
        students: 980,
        price: '₹5500',
        description: 'Understand financial statements, budgeting, and how to manage business finances effectively.',
        image: 'https://lsbfweb.azurewebsites.net/media/5546666/the-importance-of-financial-management.jpg?anchor=center&mode=crop&quality=80&width=1920&height=500&rnd=133432015980000000',
      },
      {
        id: 3,
        title: 'Leadership Development',
        instructor: 'Sushila ',
        rating: 4.6,
        students: 1150,
        price: '₹6000',
        description: 'Learn the skills needed to lead teams, build trust, and develop leadership strategies.',
        image: 'https://emeritus.org/in/wp-content/uploads/sites/3/2022/08/role-of-leader-768x512.jpg.webp',
      },
      {
        id: 4,
        title: 'Operations Management',
        instructor: 'Anjali ',
        rating: 4.5,
        students: 900,
        price: '₹4800',
        description: 'Master the principles of operations management, process optimization, and supply chain strategies.',
        image: 'https://cdn.corporatefinanceinstitute.com/assets/operations-management-1024x683.jpeg',
      },
      {
        id: 5,
        title: 'Business Analytics',
        instructor: 'Rajeev ',
        rating: 4.8,
        students: 800,
        price: '₹5300',
        description: 'Learn how to analyze data to make strategic business decisions and enhance operational efficiency.',
        image: 'https://emeritus.org/wp-content/uploads/2024/04/what-is-predictive-analytics-768x435.png',
      },
      {
        id: 6,
        title: 'Digital Transformation',
        instructor: 'Ravi Kumar',
        rating: 4.7,
        students: 1100,
        price: '₹6200',
        description: 'Understand how digital transformation is shaping business models and explore digital tools and strategies.',
        image: 'https://t3.ftcdn.net/jpg/02/40/21/72/360_F_240217279_JihGEZYJKHbBXzWoVPW18XhgcWu8qew0.jpg',
      },
      {
        id: 7,
        title: 'Negotiation Skills',
        instructor: 'Meera ',
        rating: 4.6,
        students: 950,
        price: '₹4600',
        description: 'Master the art of negotiation, including tactics, strategies, and conflict resolution.',
        image: 'https://i0.wp.com/businesstrainingworks.com/wp-content/uploads/014-Negotiation-Training.jpg',
      },
      {
        id: 8,
        title: 'Strategic Management',
        instructor: 'Amit ',
        rating: 4.9,
        students: 1250,
        price: '₹5800',
        description: 'Learn to develop and execute business strategies that drive long-term growth.',
        image: 'https://bootcamp.umass.edu/wp-content/uploads/sites/2/2023/09/what-is-strategic-management.jpg',
      },
      {
        id: 9,
        title: 'Project Management',
        instructor: 'Nisha ',
        rating: 4.7,
        students: 1050,
        price: '₹5100',
        description: 'Master the art of managing complex projects and delivering results on time and within budget.',
        image: 'https://img.freepik.com/premium-photo/project-management-concept-paper-sheet-with-ideas-plan-cup-coffee-eyeglasses-desk_1009751-3541.jpg?semt=ais_hybrid',
      },
      {
        id: 10,
        title: 'Human Resource Management',
        instructor: 'Kiran ',
        rating: 4.6,
        students: 950,
        price: '₹4600',
        description: 'Learn how to manage human resources, recruit top talent, and improve employee retention.',
        image: 'https://t4.ftcdn.net/jpg/03/14/94/85/360_F_314948533_E1eMrtJ18hTzSdMwMxDuysuIEr7A1Lw6.jpg',
      },
      {
        id: 11,
        title: 'Corporate Finance',
        instructor: 'Vikram ',
        rating: 4.8,
        students: 880,
        price: '₹5400',
        description: 'Understand advanced finance concepts, including capital budgeting, investments, and financial analysis.',
        image: 'https://www.czarnikow.com/wp-content/uploads/2020/07/facilities-3-394x200.png',
      },
      {
        id: 12,
        title: 'E-commerce Strategies',
        instructor: 'Sandeep ',
        rating: 4.5,
        students: 1100,
        price: '₹5200',
        description: 'Learn how to build and grow an online business using effective e-commerce strategies.',
        image: 'https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20marketing_2610bd2b-5f7c-46bd-a0a5-b30807309b3b.png?v=1729111729&originalWidth=1848&originalHeight=782',
      },
      {
        id: 13,
        title: 'Customer Relationship Management (CRM)',
        instructor: 'Deepika ',
        rating: 4.7,
        students: 1150,
        price: '₹4900',
        description: 'Learn how to develop customer loyalty and retention strategies through CRM tools and techniques.',
        image: 'https://www.itarian.com/images/customer-relationship-management.webp',
      },
      {
        id: 14,
        title: 'Business Law and Ethics',
        instructor: 'Rajesh ',
        rating: 4.4,
        students: 920,
        price: '₹4700',
        description: 'Understand the legal aspects of business, including contracts, intellectual property, and ethical practices.',
        image: 'https://portal.msbm.org.uk/uploads/course_image/202206/10115419__Company-Law.jpg',
      },
    ];
    
    
  const handleEnroll = (course) => {
    setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, course]);
    navigate(`/full-business-course/${course.id}`);
  };

  return (
    <div className="it-course-container">
      <h1>All Business Courses</h1>
      <div className="it-courses-grid">
        {businessCourses.map((course) => (
          <div className="it-course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="it-course-image" />
            <div className="it-course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Rating:</strong> {course.rating} ⭐ ({course.students} students)</p>
              <p><strong>Price:</strong> {course.price}</p>
              <button className="enroll-btn" onClick={() => handleEnroll(course)}>
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessCourseDetails;
