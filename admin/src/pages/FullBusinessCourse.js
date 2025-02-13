import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FullCoursePage.css';

const FullBusinessCourse = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const businessCourses = [
      {
        id: 1,
        title: 'Digital Marketing Mastery',
        instructor: 'Sneha Verma',
        rating: 4.7,
        students: 1200,
        price: '₹6000',
        description: 'Master digital marketing strategies including SEO, social media, and email marketing.',
        content: 'Comprehensive training in digital marketing tools and strategies.',
        topics: [
          { title: 'SEO Basics', description: 'Learn search engine optimization techniques.' },
          { title: 'Social Media Marketing', description: 'Utilize social media platforms for brand growth.' },
          { title: 'Email Campaigns', description: 'Create effective email marketing campaigns.' },
        ],
        videos: [
          { title: 'SEO Fundamentals', url: '/videos/seo-basics.mp4' },
          { title: 'Social Media Strategies', url: '/videos/social-media-marketing.mp4' },
        ],
      },
      {
        id: 2,
        title: 'Financial Management',
        instructor: 'Vikram',
        rating: 4.9,
        students: 980,
        price: '₹5500',
        description: 'Understand financial statements, budgeting, and how to manage business finances effectively.',
        content: 'Learn the fundamentals of financial management, including financial reporting, budgeting, and cash flow management.',
        topics: [
          { title: 'Financial Statements', description: 'Understand balance sheets, income statements, and cash flow statements.' },
          { title: 'Budgeting', description: 'Learn how to create and manage business budgets.' },
          { title: 'Cash Flow Management', description: 'Understand how to manage business cash flow effectively.' },
        ],
        videos: [
          { title: 'Financial Statements 101', url: '/videos/financial-statements.mp4' },
          { title: 'Budgeting Basics', url: '/videos/budgeting.mp4' },
        ],
      },
    
      {
        id: 3,
        title: 'Leadership Development',
        instructor: 'Sushila',
        rating: 4.6,
        students: 1150,
        price: '₹6000',
        description: 'Learn the skills needed to lead teams, build trust, and develop leadership strategies.',
        content: 'Comprehensive training in leadership skills, team management, and organizational strategies.',
        topics: [
          { title: 'Leadership Styles', description: 'Understand different leadership styles and when to apply them.' },
          { title: 'Building Trust', description: 'Learn techniques to build trust and credibility within a team.' },
          { title: 'Conflict Resolution', description: 'Master techniques for resolving conflicts and ensuring team harmony.' },
        ],
        videos: [
          { title: 'Effective Leadership Styles', url: '/videos/leadership-styles.mp4' },
          { title: 'Conflict Resolution Techniques', url: '/videos/conflict-resolution.mp4' },
        ],
      },
      {
        id: 4,
        title: 'Operations Management',
        instructor: 'Anjali',
        rating: 4.5,
        students: 900,
        price: '₹4800',
        description: 'Master the principles of operations management, process optimization, and supply chain strategies.',
        content: 'Comprehensive training in managing operations, improving efficiency, and understanding supply chains.',
        topics: [
          { title: 'Process Optimization', description: 'Learn how to optimize business processes for better performance.' },
          { title: 'Supply Chain Management', description: 'Understand the logistics, management, and strategies behind supply chains.' },
          { title: 'Inventory Management', description: 'Master the techniques for managing inventory efficiently.' },
        ],
        videos: [
          { title: 'Process Improvement Techniques', url: '/videos/process-optimization.mp4' },
          { title: 'Supply Chain Strategies', url: '/videos/supply-chain-management.mp4' },
        ],
      },
      
      {
        id: 5,
        title: 'Business Analytics',
        instructor: 'Rajeev',
        rating: 4.8,
        students: 800,
        price: '₹5300',
        description: 'Learn how to analyze data to make strategic business decisions and enhance operational efficiency.',
        content: 'Comprehensive training in business analytics tools, techniques, and strategies for data-driven decision-making.',
        topics: [
          { title: 'Data Visualization', description: 'Learn how to present data visually for better decision-making.' },
          { title: 'Predictive Analytics', description: 'Utilize statistical techniques to predict future trends and behaviors.' },
          { title: 'Business Intelligence Tools', description: 'Master tools like Excel, Power BI, and Tableau to analyze business data.' },
        ],
        videos: [
          { title: 'Data Visualization Techniques', url: '/videos/data-visualization.mp4' },
          { title: 'Predictive Analytics for Business', url: '/videos/predictive-analytics.mp4' },
        ],
      },
      
      {
        id: 6,
        title: 'Digital Transformation',
        instructor: 'Ravi Kumar',
        rating: 4.7,
        students: 1100,
        price: '₹6200',
        description: 'Understand how digital transformation is shaping business models and explore digital tools and strategies.',
        content: 'Comprehensive training on digital transformation, including the use of technology to innovate business operations and models.',
        topics: [
          { title: 'Introduction to Digital Transformation', description: 'Learn the fundamentals of digital transformation and its impact on businesses.' },
          { title: 'Emerging Digital Tools', description: 'Explore cutting-edge technologies such as AI, IoT, and blockchain that drive digital transformation.' },
          { title: 'Business Process Automation', description: 'Learn how automation tools can optimize business workflows and operations.' },
        ],
        videos: [
          { title: 'Digital Transformation Overview', url: '/videos/digital-transformation.mp4' },
          { title: 'Emerging Tools and Technologies', url: '/videos/emerging-tools.mp4' },
        ],
      },
      
      {
        id: 7,
        title: 'Negotiation Skills',
        instructor: 'Meera',
        rating: 4.6,
        students: 950,
        price: '₹4600',
        description: 'Master the art of negotiation, including tactics, strategies, and conflict resolution.',
        content: 'Learn essential negotiation techniques, strategies for conflict resolution, and how to influence and persuade in business settings.',
        topics: [
          { title: 'Negotiation Basics', description: 'Understand the fundamentals of negotiation and the key principles.' },
          { title: 'Negotiation Tactics', description: 'Explore different negotiation tactics to reach mutually beneficial agreements.' },
          { title: 'Conflict Resolution', description: 'Learn how to resolve conflicts effectively through negotiation.' },
        ],
        videos: [
          { title: 'Introduction to Negotiation', url: '/videos/negotiation-basics.mp4' },
          { title: 'Advanced Negotiation Techniques', url: '/videos/negotiation-tactics.mp4' },
        ],
      },
      
      {
        id: 8,
        title: 'Strategic Management',
        instructor: 'Amit',
        rating: 4.9,
        students: 1250,
        price: '₹5800',
        description: 'Learn to develop and execute business strategies that drive long-term growth.',
        content: 'Gain insights into strategy formulation, competitive analysis, and strategic leadership to propel business success.',
        topics: [
          { title: 'Strategy Formulation', description: 'Learn how to create effective business strategies and long-term plans.' },
          { title: 'Competitive Analysis', description: 'Understand how to analyze competitors and gain a competitive edge in the market.' },
          { title: 'Strategic Leadership', description: 'Develop leadership skills to execute and manage strategies effectively.' },
        ],
        videos: [
          { title: 'Introduction to Strategic Management', url: '/videos/strategy-formulation.mp4' },
          { title: 'Competitive Analysis in Strategy', url: '/videos/competitive-analysis.mp4' },
        ],
      },
      
      {
        id: 9,
        title: 'Project Management',
        instructor: 'Nisha',
        rating: 4.7,
        students: 1050,
        price: '₹5100',
        description: 'Master the art of managing complex projects and delivering results on time and within budget.',
        content: 'Gain skills in project planning, resource management, and risk mitigation to ensure successful project delivery.',
        topics: [
          { title: 'Project Planning', description: 'Learn how to develop detailed project plans that ensure success.' },
          { title: 'Resource Management', description: 'Understand how to allocate and manage resources effectively throughout the project lifecycle.' },
          { title: 'Risk Management', description: 'Learn strategies for identifying and managing risks to keep projects on track.' },
        ],
        videos: [
          { title: 'Project Planning Techniques', url: '/videos/project-planning.mp4' },
          { title: 'Risk Management in Projects', url: '/videos/risk-management.mp4' },
        ],
      },
      {
        id: 10,
        title: 'Human Resource Management',
        instructor: 'Kiran',
        rating: 4.6,
        students: 950,
        price: '₹4600',
        description: 'Learn how to manage human resources, recruit top talent, and improve employee retention.',
        content: 'Understand the key aspects of HR management, including recruitment, employee development, and retention strategies.',
        topics: [
          { title: 'Recruitment Strategies', description: 'Learn how to attract and select the right talent for your organization.' },
          { title: 'Employee Retention', description: 'Discover techniques to improve employee satisfaction and reduce turnover.' },
          { title: 'Performance Management', description: 'Master strategies for assessing and enhancing employee performance.' },
        ],
        videos: [
          { title: 'Recruitment Best Practices', url: '/videos/recruitment-strategies.mp4' },
          { title: 'Improving Employee Retention', url: '/videos/employee-retention.mp4' },
        ],
      },
      
      {
        id: 11,
        title: 'Corporate Finance',
        instructor: 'Vikram',
        rating: 4.8,
        students: 880,
        price: '₹5400',
        description: 'Understand advanced finance concepts, including capital budgeting, investments, and financial analysis.',
        content: 'Explore key areas of corporate finance, such as financial analysis, risk management, and investment strategies.',
        topics: [
          { title: 'Capital Budgeting', description: 'Learn the process of planning and managing investments in long-term assets.' },
          { title: 'Investment Strategies', description: 'Understand various investment options and strategies for maximizing returns.' },
          { title: 'Financial Risk Management', description: 'Learn how to assess and manage financial risks in business operations.' },
        ],
        videos: [
          { title: 'Capital Budgeting Process', url: '/videos/capital-budgeting.mp4' },
          { title: 'Investment Analysis', url: '/videos/investment-strategies.mp4' },
        ],
      },
      {
        id: 12,
        title: 'E-commerce Strategies',
        instructor: 'Priya Sharma',
        rating: 4.6,
        students: 1050,
        price: '₹5500',
        description: 'Learn essential strategies for running successful e-commerce businesses, including customer acquisition and retention.',
        content: 'Gain insights into building, managing, and scaling e-commerce platforms, including payment systems and digital marketing.',
        topics: [
          { title: 'Building an E-commerce Platform', description: 'Learn how to create and manage an effective e-commerce website.' },
          { title: 'Customer Acquisition', description: 'Understand strategies to acquire customers through digital marketing and ads.' },
          { title: 'Payment Systems & Security', description: 'Learn how to set up secure and efficient payment systems for online transactions.' },
        ],
        videos: [
          { title: 'Creating an E-commerce Store', url: '/videos/ecommerce-building.mp4' },
          { title: 'Effective Customer Acquisition', url: '/videos/customer-acquisition.mp4' },
        ],
      },
      {
        id: 13,
        title: 'Customer Relationship Management (CRM)',
        instructor: 'Ravi Kumar',
        rating: 4.8,
        students: 1500,
        price: '₹7000',
        description: 'Master CRM strategies to build and maintain long-term customer relationships, optimize sales processes, and improve customer satisfaction.',
        content: 'Comprehensive training in CRM tools, techniques, and strategies to enhance customer loyalty and business growth.',
        topics: [
          { title: 'Introduction to CRM', description: 'Learn the fundamentals of CRM and its importance in business.' },
          { title: 'CRM Tools & Software', description: 'Explore popular CRM platforms and their functionalities.' },
          { title: 'Customer Segmentation', description: 'Understand how to segment customers and tailor marketing efforts.' },
          { title: 'Managing Customer Feedback', description: 'Learn how to collect and analyze customer feedback to improve relationships.' },
        ],
        videos: [
          { title: 'Understanding CRM Basics', url: '/videos/crm-basics.mp4' },
          { title: 'Using CRM Tools Effectively', url: '/videos/crm-tools.mp4' },
        ],
      },
      
      {
        id: 14,
        title: 'Business Law and Ethics',
        instructor: 'Ravi Kumar',
        rating: 4.7,
        students: 1200,
        price: '₹6000',
        description: 'Learn the fundamentals of business law and ethical practices in the corporate world, including contracts, intellectual property, and corporate governance.',
        content: 'Comprehensive training in business laws, legal frameworks, and ethical decision-making for business professionals.',
        topics: [
          { title: 'Introduction to Business Law', description: 'Understand the basics of legal systems, contracts, and corporate laws.' },
          { title: 'Intellectual Property Rights', description: 'Learn about patents, copyrights, trademarks, and intellectual property protection.' },
          { title: 'Corporate Governance', description: 'Explore ethical business practices and corporate governance frameworks.' },
          { title: 'Legal Aspects of Marketing', description: 'Understand the legalities surrounding advertising, promotions, and marketing campaigns.' },
        ],
        videos: [
          { title: 'Overview of Business Law', url: '/videos/business-law.mp4' },
          { title: 'Ethical Decision Making in Business', url: '/videos/business-ethics.mp4' },
        ],
      },
      
    ];
    

  useEffect(() => {
    const foundCourse = businessCourses.find(course => course.id === Number(id));
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

export default FullBusinessCourse;
