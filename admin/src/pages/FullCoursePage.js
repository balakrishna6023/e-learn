import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './FullCoursePage.css';

function FullCourse() {
  const { id } = useParams();

  const courseDetails = {
    1: {
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and React to build modern web applications.',
      price: '₹4500',
      instructor: 'Vinay Bhaskar',
      content: 'This is the content of the full Web Development course...',
      topics: [
        {
          title: 'HTML',
          description: 'Learn the basics of HTML...',
          detailedContent: `
            <h4>Elements</h4
            >
            <p>HTML consists of "elements" that define parts of the content. These elements are enclosed in tags, usually in pairs: an opening tag and a closing tag. For example:</p>
            <pre>&lt;h1&gt;This is a Heading&lt;/h1&gt;</pre> (defines a heading)
            <pre>&lt;p&gt;This is a paragraph.&lt;/p&gt;</pre> (defines a paragraph)

            <h4>Attributes</h4>
            <p>HTML elements can have attributes that provide additional information. Attributes are written inside the opening tag. For instance:</p>
            <pre>&lt;a href="https://www.example.com"&gt;Click Here&lt;/a&gt;</pre> – the <code>href</code> attribute defines the URL that the link points to.

            <h4>Document Structure</h4>
            <p>A typical HTML document has a specific structure, which is crucial for both functionality and accessibility. It generally looks like this:</p>
            <pre>
            &lt;!DOCTYPE html&gt;
            &lt;html&gt;
              &lt;head&gt;
                &lt;title&gt;Page Title&lt;/title&gt;
              &lt;/head&gt;
              &lt;body&gt;
                &lt;h1&gt;My First Heading&lt;/h1&gt;
                &lt;p&gt;My first paragraph.&lt;/p&gt;
              &lt;/body&gt;
            &lt;/html&gt;
            </pre>

            <h4>Basic HTML Tags</h4>
            <p>Here are some essential HTML tags used to build web pages:</p>
            <ul>
              <li>&lt;h1&gt; to &lt;h6&gt;: Headings of different levels (largest to smallest).</li>
              <li>&lt;p&gt;: Paragraph element for text content.</li>
              <li>&lt;a&gt;: Anchor tag used to create hyperlinks.</li>
              <li>&lt;img&gt;: Embeds an image in a web page.</li>
              <li>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;: Lists (unordered, ordered, and list items).</li>
              <li>&lt;table&gt;: Defines a table, with rows (&lt;tr&gt;) and cells (&lt;td&gt;).</li>
              <li>&lt;form&gt;: Allows user input through form controls like text fields, buttons, and checkboxes.</li>
            </ul>

            <h4>HTML5 Features</h4>
            <p>The latest version of HTML, HTML5, introduced several new features and improvements, including:</p>
            <ul>
              <li>Semantic Elements: Tags like &lt;article&gt;, &lt;section&gt;, &lt;nav&gt;, and &lt;footer&gt; help define the structure of the document and improve readability and accessibility.</li>
              <li>Multimedia: Native support for embedding audio and video with &lt;audio&gt; and &lt;video&gt;.</li>
              <li>APIs: HTML5 provides various JavaScript APIs for functionality such as local storage, geolocation, and offline applications.</li>
            </ul>

            <h4>Forms and Input Elements</h4>
            <p>HTML provides a wide range of input elements within forms, allowing users to interact with web pages. Common input types include:</p>
            <ul>
              <li>&lt;input&gt;: Various types of inputs, such as text, password, email, etc.</li>
              <li>&lt;textarea&gt;: A multi-line text field for longer input.</li>
              <li>&lt;button&gt;: A button element used to trigger actions.</li>
              <li>&lt;select&gt;: A dropdown list for user selection.</li>
            </ul>

            <h4>How HTML Works with Other Web Technologies</h4>
            <p><strong>CSS (Cascading Style Sheets):</strong> While HTML handles the structure of the page, CSS controls the presentation and layout. CSS can change colors, fonts, spacing, and positioning to make a web page look visually appealing.</p>
            <p><strong>JavaScript:</strong> JavaScript is used alongside HTML to create dynamic and interactive content. It can respond to user actions, validate forms, modify the DOM (Document Object Model), and perform actions like animations or fetching data from servers.</p>

            <h4>Accessibility and SEO</h4>
            <p>HTML also plays a crucial role in making web content accessible to all users, including those with disabilities. Using semantic HTML elements, alt text for images (&lt;img alt="Description"&gt;), and ensuring good structure improves both accessibility and search engine optimization (SEO).</p>
          `,
          videos: [
            { title: 'Introduction to HTML', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
            { title: 'HTML Elements and Tags', url: '/videos/advanced-html.mp4' },
            { title: 'HTML Attributes', url: '/videos/css-flexbox.mp4' },
            { title: 'Working with Text in HTML', url: '/videos/js-functions.mp4' },
            { title: 'Links and Navigation', url: '/videos/react-basics.mp4' },
            { title: 'Images and Multimedia', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
            { title: 'Forms in HTML', url: '/videos/advanced-html.mp4' },
            { title: 'Tables in HTML', url: '/videos/css-flexbox.mp4' },
            { title: 'HTML5 New Features', url: '/videos/js-functions.mp4' },
            { title: 'Responsive Web Design (RWD) Basics', url: '/videos/react-basics.mp4' },
            { title: ' HTML & CSS Integration', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
            { title: 'HTML Accessibility (a11y)', url: '/videos/advanced-html.mp4' },
            { title: 'Advanced HTML Topics', url: '/videos/css-flexbox.mp4' },
            { title: 'Best Practices and Optimization', url: '/videos/js-functions.mp4' },
            { title: 'HTML Debugging and Troubleshooting', url: '/videos/react-basics.mp4' },
          ],
        },
        
        {
            title: 'CSS',
            description: 'Master CSS to design visually appealing and responsive web pages.',
            detailedContent: `
              <h2>1. Selectors</h2>
              <p>CSS selectors target HTML elements to apply styles. Types include:</p>
              <ul>
                <li><strong>Element Selector</strong>: Targets all elements of a specific type (e.g., <code>p</code>, <code>h1</code>).</li>
                <li><strong>Class Selector</strong>: Targets elements with a specific class (e.g., <code>.class-name</code>).</li>
                <li><strong>ID Selector</strong>: Targets an element with a specific ID (e.g., <code>#id-name</code>).</li>
                <li><strong>Universal Selector</strong>: Applies styles to all elements (<code>*</code>).</li>
                <li><strong>Attribute Selector</strong>: Targets elements with a certain attribute (e.g., <code>[type="text"]</code>).</li>
              </ul>
              
              <h2>2. Properties and Values</h2>
              <p>CSS properties define the styles to be applied, and values specify how the properties should behave. Examples include:</p>
              <ul>
                <li><strong>Color</strong>: <code>color: red;</code></li>
                <li><strong>Font</strong>: <code>font-family: Arial, sans-serif;</code></li>
                <li><strong>Size</strong>: <code>font-size: 16px;</code></li>
                <li><strong>Margin</strong>: <code>margin: 20px;</code></li>
              </ul>
              
              <h2>3. Box Model</h2>
              <p>The CSS box model represents how elements are structured and spaced:</p>
              <ul>
                <li><strong>Content</strong>: The actual content (e.g., text or images).</li>
                <li><strong>Padding</strong>: Space around the content.</li>
                <li><strong>Border</strong>: The line around the element.</li>
                <li><strong>Margin</strong>: Space outside the border, separating elements.</li>
              </ul>
              
              <h2>4. Positioning</h2>
              <p>CSS positioning controls the placement of elements:</p>
              <ul>
                <li><strong>Static</strong>: Default positioning.</li>
                <li><strong>Relative</strong>: Positioned relative to its normal position.</li>
                <li><strong>Absolute</strong>: Positioned relative to the nearest positioned ancestor.</li>
                <li><strong>Fixed</strong>: Stays fixed in place even when scrolling.</li>
                <li><strong>Sticky</strong>: Sticks to the viewport once it reaches a certain point during scrolling.</li>
              </ul>
              
              <h2>5. Flexbox</h2>
              <p>A layout model for creating flexible and responsive designs:</p>
              <ul>
                <li>Aligns and distributes space within containers.</li>
                <li>Common properties: <code>display: flex;</code>, <code>justify-content</code>, <code>align-items</code>, and <code>flex-direction</code>.</li>
              </ul>
              
              <h2>6. Grid</h2>
              <p>A two-dimensional layout system for designing complex web layouts:</p>
              <ul>
                <li>Defines rows and columns in a grid.</li>
                <li>Common properties: <code>display: grid;</code>, <code>grid-template-rows</code>, <code>grid-template-columns</code>.</li>
              </ul>
              
              <h2>7. Responsive Design</h2>
              <p>Ensures the web page adapts to different screen sizes using:</p>
              <ul>
                <li><strong>Media Queries</strong>: Apply styles based on the device's viewport size (e.g., <code>@media (max-width: 600px)</code>).</li>
                <li><strong>Viewport</strong>: Defines the visible area of a webpage.</li>
              </ul>
              
              <h2>8. Colors and Backgrounds</h2>
              <p>CSS allows styling of colors and backgrounds:</p>
              <ul>
                <li><strong>Color</strong>: <code>color: #ff5733;</code> (text color).</li>
                <li><strong>Background</strong>: <code>background-color: lightblue;</code> or <code>background-image: url('image.jpg');</code>.</li>
              </ul>
              
              <h2>9. Typography</h2>
              <p>CSS offers control over text styling:</p>
              <ul>
                <li><strong>Font Size</strong>: <code>font-size: 16px;</code>.</li>
                <li><strong>Font Family</strong>: <code>font-family: 'Arial', sans-serif;</code>.</li>
                <li><strong>Text Align</strong>: <code>text-align: center;</code>.</li>
                <li><strong>Text Transform</strong>: <code>text-transform: uppercase;</code>.</li>
              </ul>
              
              <h2>10. Borders and Outlines</h2>
              <p>Define the borders and outlines around elements:</p>
              <ul>
                <li><strong>Border</strong>: <code>border: 1px solid black;</code>.</li>
                <li><strong>Outline</strong>: Similar to borders but doesn’t affect layout.</li>
              </ul>
              
              <h2>11. Pseudo-classes</h2>
              <p>Apply styles to elements based on their state:</p>
              <ul>
                <li><code>:hover</code>: Styles when the user hovers over an element.</li>
                <li><code>:focus</code>: Styles when an element gains focus (e.g., an input field).</li>
                <li><code>:first-child</code>: Styles the first child element of a parent.</li>
              </ul>
              
              <h2>12. Pseudo-elements</h2>
              <p>Target specific parts of an element:</p>
              <ul>
                <li><code>::before</code>: Inserts content before an element.</li>
                <li><code>::after</code>: Inserts content after an element.</li>
              </ul>
              
              <h2>13. Transitions and Animations</h2>
              <p>Add movement or change effects to elements:</p>
              <ul>
                <li><strong>Transitions</strong>: Smoothly change property values over time (e.g., <code>transition: all 0.3s ease;</code>).</li>
                <li><strong>Animations</strong>: Keyframe-based animations for more complex effects (e.g., <code>@keyframes</code>).</li>
              </ul>
              
              <h2>14. Shadows</h2>
              <p>Add shadows to elements:</p>
              <ul>
                <li><strong>Text Shadow</strong>: <code>text-shadow: 2px 2px 5px grey;</code>.</li>
                <li><strong>Box Shadow</strong>: <code>box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);</code>.</li>
              </ul>
              
              <h2>15. Overflow</h2>
              <p>Manage how content that overflows an element’s box is displayed:</p>
              <ul>
                <li><code>overflow: hidden;</code>: Hides the overflow.</li>
                <li><code>overflow: scroll;</code>: Adds scrollbars.</li>
                <li><code>overflow: auto;</code>: Adds scrollbars only when necessary.</li>
              </ul>
              
              <h2>16. CSS Variables</h2>
              <p>Create reusable values in your stylesheet:</p>
              <ul>
                <li><code>--main-color: #ff5733;</code> and then use it like <code>color: var(--main-color);</code>.</li>
              </ul>
              
              <h2>17. Transforms</h2>
              <p>Change the shape or position of elements:</p>
              <ul>
                <li><code>rotate()</code>: Rotates an element.</li>
                <li><code>scale()</code>: Resizes an element.</li>
                <li><code>translate()</code>: Moves an element.</li>
              </ul>
              
              <h2>18. Z-Index</h2>
              <p>Control the stacking order of elements (higher values are in front):</p>
              <ul>
                <li><code>z-index: 10;</code>.</li>
              </ul>
              
              <h2>19. Custom Fonts</h2>
              <p>Use custom fonts on a webpage:</p>
              <ul>
                <li><strong>@font-face</strong>: Allows embedding fonts (e.g., <code>@font-face { font-family: 'MyFont'; src: url('myfont.woff'); }</code>).</li>
                <li><strong>Google Fonts</strong>: Use pre-hosted fonts (e.g., <code><link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"></code>).</li>
              </ul>
              
              <h2>20. CSS Preprocessors</h2>
              <p>Tools like Sass and LESS extend CSS with features like variables, mixins, and functions to make it more powerful and maintainable.</p>
              
            `,
          },
          
           {
            title: 'JavaScript',
            description: 'Master JavaScript to build dynamic and interactive web applications.',
            detailedContent: `
              <h2>1. Variables</h2>
              <p>JavaScript uses variables to store data values that can be referenced and manipulated throughout the code.</p>
              
              <h2>2. Data Types</h2>
              <p>JavaScript supports various data types, including:</p>
              <ul>
                <li><strong>Numbers</strong>: Integers or floating-point numbers.</li>
                <li><strong>Strings</strong>: Textual data enclosed in quotes.</li>
                <li><strong>Booleans</strong>: Logical values true or false.</li>
                <li><strong>Arrays</strong>: Ordered collections of values.</li>
                <li><strong>Objects</strong>: Collections of key-value pairs.</li>
              </ul>
              
              <h2>3. Operators</h2>
              <p>Operators allow for mathematical, logical, and comparison operations on variables and values:</p>
              <ul>
                <li><strong>Arithmetic Operators</strong>: <code>+ - * /</code> (e.g., addition, subtraction).</li>
                <li><strong>Logical Operators</strong>: <code>&& || !</code> (e.g., AND, OR, NOT).</li>
                <li><strong>Comparison Operators</strong>: <code>== != > < >= <=</code> (e.g., equality, greater than).</li>
              </ul>
              
              <h2>4. Functions</h2>
              <p>Functions are reusable blocks of code that perform specific tasks, and they allow for modular, organized code.</p>
              
              <h2>5. Control Flow</h2>
              <p>Control flow statements like <code>if-else</code>, <code>switch</code>, and <code>ternary</code> operators allow JavaScript to make decisions based on conditions.</p>
              
              <h2>6. Loops</h2>
              <p>Loops like <code>for</code>, <code>while</code>, and <code>do-while</code> enable the repetition of a block of code multiple times under specific conditions.</p>
              
              <h2>7. Objects</h2>
              <p>Objects are collections of key-value pairs that allow you to store and manage related data.</p>
              
              <h2>8. Arrays</h2>
              <p>Arrays are ordered collections of data that can hold multiple values, which can be accessed by their index position.</p>
              
              <h2>9. DOM Manipulation</h2>
              <p>JavaScript interacts with the DOM (Document Object Model) to modify HTML and CSS, allowing dynamic changes to the webpage.</p>
              
              <h2>10. Events</h2>
              <p>Events represent user actions like clicks, mouse movements, and keyboard presses. JavaScript responds to these actions to create interactivity on websites.</p>
              
              <h2>11. Asynchronous Programming</h2>
              <p>Asynchronous programming allows JavaScript to perform tasks (like fetching data from a server) without freezing the webpage.</p>
              
              <h2>12. JSON</h2>
              <p>JSON (JavaScript Object Notation) is a lightweight data format used to exchange data between a client and a server.</p>
              
              <h2>13. Error Handling</h2>
              <p>JavaScript provides mechanisms like <code>try-catch</code> to handle errors gracefully without crashing the program.</p>
              
              <h2>14. Modules</h2>
              <p>Modules allow code to be split into separate files, making it easier to manage and organize code in large applications.</p>
              
              <h2>15. Closures</h2>
              <p>Closures are functions that retain access to their lexical environment, even when the outer function has finished executing.</p>
              
              <h2>16. Arrow Functions</h2>
              <p>Arrow functions offer a more concise syntax for writing functions and preserve the <code>this</code> context from the outer scope.</p>
              
              <h2>17. Destructuring</h2>
              <p>Destructuring is a feature that allows you to extract values from arrays or objects and assign them to variables in a more readable manner.</p>
              
              <h2>18. Spread Operator</h2>
              <p>The spread operator (<code>...</code>) is used to expand elements of an array or object into individual elements or properties.</p>
              
              <h2>19. Rest Operator</h2>
              <p>The rest operator (<code>...</code>) collects multiple values into a single variable, often used in function arguments to handle a variable number of arguments.</p>
              
              <h2>20. Higher-Order Functions</h2>
              <p>Higher-order functions are functions that can take other functions as arguments or return them as results. They allow for more abstract and reusable code.</p>
              
              <h2>21. Set and Map</h2>
              <p><strong>Set</strong> is a collection of unique values, while <strong>Map</strong> is a collection of key-value pairs. Both offer more flexibility compared to regular arrays and objects.</p>
              
              <h2>22. ES6 Features</h2>
              <p>ES6 (ECMAScript 2015) introduced new features like classes, template literals, destructuring, promises, and modules, which modernize JavaScript development.</p>
              
              <h2>23. Promises</h2>
              <p>Promises allow handling asynchronous operations in a more readable manner, enabling code to run when the operation is completed (resolved or rejected).</p>
              
              <h2>24. Async/Await</h2>
              <p>Async functions and the <code>await</code> keyword provide a cleaner, more readable way to handle asynchronous code, making it appear synchronous.</p>
              
              <h2>25. Event Loop</h2>
              <p>The event loop is a core concept of JavaScript that handles asynchronous code execution, ensuring the application remains responsive even with multiple operations happening at once.</p>
              
              <h2>26. Callback Functions</h2>
              <p>Callbacks are functions passed into other functions, typically to handle tasks that will complete later, such as asynchronous operations.</p>
              
              <h2>27. Hoisting</h2>
              <p>Hoisting is the behavior where variable and function declarations are moved to the top of their containing scope during execution.</p>
              
              <h2>28. This Keyword</h2>
              <p>The <code>this</code> keyword refers to the context in which a function is called, and its value can vary based on how a function is invoked.</p>
              
              <h2>29. Scope and Closures</h2>
              <p>Scope determines the accessibility of variables, and closures allow functions to retain access to variables from their containing scope.</p>
              
              <h2>30. Type Coercion</h2>
              <p>JavaScript automatically converts between different data types, such as turning a string into a number when performing mathematical operations.</p>
              
              <h2>31. Inheritance and Prototypes</h2>
              <p>JavaScript supports inheritance through prototypes, allowing objects to share properties and methods, creating a chain of objects.</p>
              
              <h2>32. Class Syntax</h2>
              <p>ES6 introduced the class syntax, offering a more structured way to define objects and manage inheritance in JavaScript.</p>
              
              <h2>33. Web APIs</h2>
              <p>JavaScript interacts with browser APIs (e.g., Fetch API, Geolocation API) to access features like making network requests or getting the user's location.</p>
              
              <h2>34. Callback Hell</h2>
              <p>This term refers to a situation where callbacks are nested within each other, making code difficult to read and maintain. It’s often addressed by using Promises or Async/Await.</p>
              
              <h2>35. Local Storage and Session Storage</h2>
              <p>JavaScript allows you to store data in the browser using local storage (persistent data) or session storage (data stored for a session).</p>
            `,
          }
          
      ],
      videos: [
        { title: 'Introduction to HTML', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
        { title: 'HTML Elements and Tags', url: '/videos/advanced-html.mp4' },
        { title: 'HTML Attributes', url: '/videos/css-flexbox.mp4' },
        { title: 'Working with Text in HTML', url: '/videos/js-functions.mp4' },
        { title: 'Links and Navigation', url: '/videos/react-basics.mp4' },
        { title: 'Images and Multimedia', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
        { title: 'Forms in HTML', url: '/videos/advanced-html.mp4' },
        { title: 'Tables in HTML', url: '/videos/css-flexbox.mp4' },
        { title: 'HTML5 New Features', url: '/videos/js-functions.mp4' },
        { title: 'Responsive Web Design (RWD) Basics', url: '/videos/react-basics.mp4' },
        { title: ' HTML & CSS Integration', url: 'https://www.youtube.com/watch?v=vvabAAEfkvU' },
        { title: 'HTML Accessibility (a11y)', url: '/videos/advanced-html.mp4' },
        { title: 'Advanced HTML Topics', url: '/videos/css-flexbox.mp4' },
        { title: 'Best Practices and Optimization', url: '/videos/js-functions.mp4' },
        { title: 'HTML Debugging and Troubleshooting', url: '/videos/react-basics.mp4' },
      ],
    },
  
  
    2:{
        "title": "Data Science",
        "description": "Learn the core concepts of Data Science, including data manipulation, statistical analysis, machine learning, and data visualization, to work with real-world datasets and solve complex problems.",
        price: '₹4500',
        "instructor": " Anand Uppada",
        "content": "This course covers all the key areas of Data Science, from data cleaning and statistical analysis to advanced machine learning algorithms and data visualization techniques. You'll gain hands-on experience with Python and other essential tools.",
        "topics": [
          {
            "title": "Step 1: Introduction to Data Science",
            "detailedContent": "<p>Understand what Data Science is and why it’s essential. Learn about its applications in various industries, including finance, healthcare, and retail, and how it helps in decision-making and predictions.</p>"
          },
          {
            "title": "Step 2: Python for Data Science",
            "detailedContent": "<p>Get familiar with Python, the most popular language for data analysis. Learn about libraries like Pandas, NumPy, and Matplotlib to perform data manipulation, numerical computations, and basic visualizations.</p>"
          },
          {
            "title": "Step 3: Data Wrangling and Cleaning",
            "detailedContent": "<p>Learn how to clean and prepare your data for analysis by handling missing values, converting data types, and normalizing datasets using tools like Pandas and NumPy. This step is crucial before performing any analysis.</p>"
          },
          {
            "title": "Step 4: Exploratory Data Analysis (EDA)",
            "detailedContent": "<p>Understand how to explore your data using statistical and graphical methods. This includes summarizing key characteristics, identifying patterns, and finding outliers using visualizations like histograms, box plots, and scatter plots.</p>"
          },
          {
            "title": "Step 5: Statistical Analysis",
            "detailedContent": "<p>Learn basic statistics for data analysis. Topics include probability theory, hypothesis testing, confidence intervals, and regression analysis, which are foundational in interpreting the data and making predictions.</p>"
          },
          {
            "title": "Step 6: Machine Learning Basics",
            "detailedContent": "<p>Discover the fundamentals of machine learning. Learn about supervised and unsupervised learning, and get hands-on experience with algorithms like linear regression, decision trees, and clustering.</p>"
          },
          {
            "title": "Step 7: Data Visualization",
            "detailedContent": "<p>Learn how to create meaningful visualizations that communicate insights effectively. Explore tools like Matplotlib, Seaborn, and Plotly for creating graphs, charts, and interactive dashboards.</p>"
          },
          {
            "title": "Step 8: Model Evaluation and Optimization",
            "detailedContent": "<p>Understand how to evaluate your machine learning models using metrics like accuracy, precision, recall, and F1-score. Learn about cross-validation and how to fine-tune models for better performance.</p>"
          },
          {
            "title": "Step 9: Advanced Topics - Deep Learning",
            "detailedContent": "<p>Explore deep learning techniques, including neural networks, backpropagation, and frameworks like TensorFlow and Keras. Learn how these methods are used for tasks like image recognition and natural language processing (NLP).</p>"
          },
          {
            "title": "Step 10: Real-World Projects",
            "detailedContent": "<p>Apply your skills to real-world data science projects. Work with datasets from various domains, like healthcare or e-commerce, and demonstrate your ability to solve problems by building and deploying models.</p>"
          }
        ],
        "videos": [
          {
            "title": "Step 1: Introduction to Data Science",
            "url": "https://example.com/data-science-introduction-video"
          },
          {
            "title": "Step 2: Python for Data Science",
            "url": "https://example.com/python-for-data-science-video"
          },
          {
            "title": "Step 3: Data Wrangling and Cleaning",
            "url": "https://example.com/data-wrangling-video"
          },
          {
            "title": "Step 4: Exploratory Data Analysis (EDA)",
            "url": "https://example.com/eda-video"
          },
          {
            "title": "Step 5: Statistical Analysis",
            "url": "https://example.com/statistical-analysis-video"
          },
          {
            "title": "Step 6: Introduction to Machine Learning",
            "url": "https://example.com/machine-learning-video"
          },
          {
            "title": "Step 7: Data Visualization",
            "url": "https://example.com/data-visualization-video"
          },
          {
            "title": "Step 8: Model Evaluation and Optimization",
            "url": "https://example.com/model-evaluation-video"
          },
          {
            "title": "Step 9: Deep Learning",
            "url": "https://example.com/deep-learning-video"
          },
          {
            "title": "Step 10: Real-World Projects",
            "url": "https://example.com/real-world-projects-video"
          },
        ],
    
  },
3:{
  "title": "Artificial Intelligence",
  "description": "Explore the fundamentals of Artificial Intelligence, including problem-solving techniques, search algorithms, machine learning, neural networks, and natural language processing, to build intelligent systems.",
  "price": "₹5000",
  "instructor": "Rajesh Kumar",
  "content": "This course covers all the key areas of Artificial Intelligence, from the foundational algorithms to advanced topics like deep learning and NLP. You'll gain hands-on experience in building intelligent applications using Python and popular AI libraries.",
  "topics": [
      {
          "title": "Step 1: Introduction to Artificial Intelligence",
          "detailedContent": "<p>Understand the concept of AI, its history, and its applications in various fields such as healthcare, autonomous vehicles, and robotics. Learn how AI mimics human intelligence and decision-making processes.</p>"
      },
      {
          "title": "Step 2: Problem Solving and Search Algorithms",
          "detailedContent": "<p>Learn basic problem-solving techniques in AI, including search algorithms like depth-first search, breadth-first search, and A* algorithm. Understand their role in pathfinding, optimization, and decision-making.</p>"
      },
      {
          "title": "Step 3: Knowledge Representation and Reasoning",
          "detailedContent": "<p>Explore how AI systems represent knowledge and reason logically. Topics include propositional and first-order logic, semantic networks, and rule-based reasoning.</p>"
      },
      {
          "title": "Step 4: Machine Learning Fundamentals",
          "detailedContent": "<p>Discover the basics of machine learning and how it forms the foundation of modern AI systems. Learn about supervised learning, unsupervised learning, and reinforcement learning, and get hands-on with algorithms like decision trees, k-means clustering, and Q-learning.</p>"
      },
      {
          "title": "Step 5: Neural Networks and Deep Learning",
          "detailedContent": "<p>Learn about neural networks, the backbone of deep learning, and understand how they are used to model complex patterns. Topics include perceptrons, backpropagation, convolutional neural networks (CNNs), and recurrent neural networks (RNNs).</p>"
      },
      {
          "title": "Step 6: Natural Language Processing (NLP)",
          "detailedContent": "<p>Understand the intersection of AI and linguistics. Learn about NLP techniques like tokenization, stemming, sentiment analysis, and language models. Get hands-on with libraries such as NLTK and spaCy.</p>"
      },
      {
          "title": "Step 7: Computer Vision",
          "detailedContent": "<p>Explore how AI systems process and understand visual information. Learn about image classification, object detection, and the use of convolutional neural networks (CNNs) for tasks like facial recognition and scene understanding.</p>"
      },
      {
          "title": "Step 8: Reinforcement Learning",
          "detailedContent": "<p>Dive into reinforcement learning (RL), where agents learn by interacting with an environment. Understand concepts like reward signals, exploration vs. exploitation, Q-learning, and deep Q-networks (DQNs).</p>"
      },
      {
          "title": "Step 9: AI Ethics and Future of AI",
          "detailedContent": "<p>Understand the ethical challenges and societal impacts of AI. Discuss topics such as bias in algorithms, privacy concerns, AI regulation, and the future of AI in industries like healthcare and automation.</p>"
      },
      {
          "title": "Step 10: Real-World AI Projects",
          "detailedContent": "<p>Apply your AI skills to real-world projects, such as building a recommendation system, creating an AI chatbot, or developing a self-driving car simulation. Showcase your ability to solve complex problems using AI techniques.</p>"
      }
  ],
  "videos": [
      {
          "title": "Step 1: Introduction to Artificial Intelligence",
          "url": "https://example.com/ai-introduction-video"
      },
      {
          "title": "Step 2: Problem Solving and Search Algorithms",
          "url": "https://example.com/search-algorithms-video"
      },
      {
          "title": "Step 3: Knowledge Representation and Reasoning",
          "url": "https://example.com/knowledge-representation-video"
      },
      {
          "title": "Step 4: Machine Learning Fundamentals",
          "url": "https://example.com/machine-learning-video"
      },
      {
          "title": "Step 5: Neural Networks and Deep Learning",
          "url": "https://example.com/neural-networks-video"
      },
      {
          "title": "Step 6: Natural Language Processing (NLP)",
          "url": "https://example.com/nlp-video"
      },
      {
          "title": "Step 7: Computer Vision",
          "url": "https://example.com/computer-vision-video"
      },
      {
          "title": "Step 8: Reinforcement Learning",
          "url": "https://example.com/reinforcement-learning-video"
      },
      {
          "title": "Step 9: AI Ethics and Future of AI",
          "url": "https://example.com/ai-ethics-video"
      },
      {
          "title": "Step 10: Real-World AI Projects",
          "url": "https://example.com/real-world-ai-projects-video"
      },
  ],
},
  
4:{
  
  "title": "Big Data",
  "description": "Master the concepts and tools of Big Data, including data storage, processing frameworks, Hadoop, Spark, and NoSQL databases. Learn how to manage and analyze massive datasets to extract valuable insights.",
  "price": "₹5500",
  "instructor": "Simran Kaur",
  "content": "This course covers the key components of Big Data, from data storage and distributed processing to real-time data analytics. You'll gain hands-on experience with tools like Hadoop, Spark, and NoSQL databases to handle and analyze large-scale data.",
  "topics": [
      {
          "title": "Step 1: Introduction to Big Data",
          "detailedContent": "<p>Learn the basics of Big Data, its characteristics (volume, velocity, variety, veracity), and the importance of Big Data analytics. Understand how Big Data impacts various industries like healthcare, retail, and finance.</p>"
      },
      {
          "title": "Step 2: Big Data Ecosystem and Architecture",
          "detailedContent": "<p>Explore the Big Data ecosystem, including data storage, processing frameworks, and real-time analytics. Understand the architecture behind Big Data solutions, including Hadoop, Spark, and NoSQL databases.</p>"
      },
      {
          "title": "Step 3: Hadoop Framework",
          "detailedContent": "<p>Get an introduction to Hadoop, one of the most widely used frameworks for storing and processing large datasets. Learn about HDFS (Hadoop Distributed File System), MapReduce, and YARN for managing large-scale data processing.</p>"
      },
      {
          "title": "Step 4: Apache Spark and Distributed Computing",
          "detailedContent": "<p>Learn how Apache Spark offers a faster alternative to Hadoop for processing large datasets. Understand Spark's distributed computing model and its components, including Spark SQL, Spark Streaming, and MLlib for machine learning.</p>"
      },
      {
          "title": "Step 5: NoSQL Databases",
          "detailedContent": "<p>Discover NoSQL databases, which are designed to handle unstructured and semi-structured data. Learn about different types of NoSQL databases like MongoDB, Cassandra, and HBase, and their use cases in Big Data applications.</p>"
      },
      {
          "title": "Step 6: Data Processing and ETL Pipelines",
          "detailedContent": "<p>Learn the basics of data processing, including ETL (Extract, Transform, Load) pipelines, which are essential for integrating and transforming data from various sources. Explore how to use tools like Apache Nifi and Apache Kafka for real-time data ingestion.</p>"
      },
      {
          "title": "Step 7: Data Warehousing and Data Lakes",
          "detailedContent": "<p>Understand the concepts of data warehousing and data lakes in the context of Big Data. Learn how to store and process structured and unstructured data in a centralized repository to support analytics and business intelligence.</p>"
      },
      {
          "title": "Step 8: Real-Time Data Processing",
          "detailedContent": "<p>Explore real-time data processing with tools like Apache Kafka, Apache Flink, and Spark Streaming. Learn how to process live data streams and build real-time dashboards for decision-making and monitoring systems.</p>"
      },
      {
          "title": "Step 9: Big Data Analytics and Machine Learning",
          "detailedContent": "<p>Learn how to apply analytics techniques to Big Data, including batch processing, real-time analysis, and machine learning algorithms. Understand how to use frameworks like MLlib (Spark) and tools like TensorFlow for large-scale data analysis and predictive modeling.</p>"
      },
      {
          "title": "Step 10: Big Data Projects and Case Studies",
          "detailedContent": "<p>Apply your knowledge to real-world Big Data projects. Work with large datasets from domains such as e-commerce, social media, and IoT. Showcase your ability to build Big Data solutions for complex problems and deploy them in production environments.</p>"
      }
  ],
  "videos": [
      {
          "title": "Step 1: Introduction to Big Data",
          "url": "https://example.com/big-data-introduction-video"
      },
      {
          "title": "Step 2: Big Data Ecosystem and Architecture",
          "url": "https://example.com/big-data-ecosystem-video"
      },
      {
          "title": "Step 3: Hadoop Framework",
          "url": "https://example.com/hadoop-framework-video"
      },
      {
          "title": "Step 4: Apache Spark and Distributed Computing",
          "url": "https://example.com/spark-distributed-computing-video"
      },
      {
          "title": "Step 5: NoSQL Databases",
          "url": "https://example.com/nosql-databases-video"
      },
      {
          "title": "Step 6: Data Processing and ETL Pipelines",
          "url": "https://example.com/data-processing-etl-video"
      },
      {
          "title": "Step 7: Data Warehousing and Data Lakes",
          "url": "https://example.com/data-warehousing-video"
      },
      {
          "title": "Step 8: Real-Time Data Processing",
          "url": "https://example.com/real-time-data-processing-video"
      },
      {
          "title": "Step 9: Big Data Analytics and Machine Learning",
          "url": "https://example.com/big-data-analytics-video"
      },
      {
          "title": "Step 10: Big Data Projects and Case Studies",
          "url": "https://example.com/big-data-projects-video"
      },
  ],
},
5:{
  "title": "Cyber Security",
  "description": "Learn how to protect systems, networks, and data from cyber threats. Understand key concepts in ethical hacking, encryption, network security, and cyber defense strategies.",
  "price": "₹6000",
  "instructor": "Ravi Sharma",
  "content": "This course covers essential concepts in Cyber Security, including network security, cryptography, ethical hacking, incident response, and security protocols. Gain practical skills to secure networks, detect vulnerabilities, and defend against cyber attacks.",
  "topics": [
      {
          "title": "Step 1: Introduction to Cyber Security",
          "detailedContent": "<p>Understand the importance of Cyber Security in the digital age. Learn about different types of cyber threats, including malware, phishing, and DDoS attacks. Get an overview of security policies and frameworks.</p>"
      },
      {
          "title": "Step 2: Basic Networking and Security",
          "detailedContent": "<p>Learn the basics of networking, including IP addressing, TCP/IP, and network topologies. Understand how network protocols work and their role in network security. Explore firewalls, routers, and network defense mechanisms.</p>"
      },
      {
          "title": "Step 3: Cryptography and Encryption",
          "detailedContent": "<p>Understand the role of cryptography in Cyber Security. Learn about encryption algorithms, including symmetric and asymmetric encryption, hashing, and digital signatures. Explore secure communication protocols like SSL/TLS.</p>"
      },
      {
          "title": "Step 4: Ethical Hacking and Penetration Testing",
          "detailedContent": "<p>Discover the world of ethical hacking and penetration testing. Learn how to identify vulnerabilities in systems and applications, and use tools like Metasploit and Nmap to test security. Understand legal and ethical considerations in hacking.</p>"
      },
      {
          "title": "Step 5: Network Security",
          "detailedContent": "<p>Learn the techniques used to protect data and networks from cyber attacks. Explore topics like intrusion detection systems (IDS), intrusion prevention systems (IPS), VPNs, and network access control.</p>"
      },
      {
          "title": "Step 6: Web Application Security",
          "detailedContent": "<p>Understand the vulnerabilities in web applications and how to secure them. Learn about common threats such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). Explore OWASP Top 10 vulnerabilities and prevention strategies.</p>"
      },
      {
          "title": "Step 7: Malware Analysis and Defense",
          "detailedContent": "<p>Learn about various types of malware, including viruses, worms, ransomware, and trojans. Understand how malware works, how to analyze it, and how to protect systems from malware attacks.</p>"
      },
      {
          "title": "Step 8: Incident Response and Forensics",
          "detailedContent": "<p>Learn how to respond to cyber incidents effectively. Understand incident response processes, including detection, containment, eradication, and recovery. Explore digital forensics techniques to investigate cyber crimes.</p>"
      },
      {
          "title": "Step 9: Cloud Security",
          "detailedContent": "<p>Understand the security challenges in cloud computing. Learn about cloud service models (IaaS, PaaS, SaaS) and the associated risks. Explore cloud security best practices, including data protection, identity management, and access controls.</p>"
      },
      {
          "title": "Step 10: Cyber Security in the Real World",
          "detailedContent": "<p>Apply your knowledge to real-world Cyber Security scenarios. Learn how to build a secure infrastructure, respond to advanced persistent threats (APTs), and keep systems safe in an ever-evolving threat landscape. Work on case studies and simulations.</p>"
      }
  ],
  "videos": [
      {
          "title": "Step 1: Introduction to Cyber Security",
          "url": "https://example.com/cyber-security-introduction-video"
      },
      {
          "title": "Step 2: Basic Networking and Security",
          "url": "https://example.com/networking-security-video"
      },
      {
          "title": "Step 3: Cryptography and Encryption",
          "url": "https://example.com/cryptography-encryption-video"
      },
      {
          "title": "Step 4: Ethical Hacking and Penetration Testing",
          "url": "https://example.com/ethical-hacking-video"
      },
      {
          "title": "Step 5: Network Security",
          "url": "https://example.com/network-security-video"
      },
      {
          "title": "Step 6: Web Application Security",
          "url": "https://example.com/web-application-security-video"
      },
      {
          "title": "Step 7: Malware Analysis and Defense",
          "url": "https://example.com/malware-analysis-video"
      },
      {
          "title": "Step 8: Incident Response and Forensics",
          "url": "https://example.com/incident-response-video"
      },
      {
          "title": "Step 9: Cloud Security",
          "url": "https://example.com/cloud-security-video"
      },
      {
          "title": "Step 10: Cyber Security in the Real World",
          "url": "https://example.com/real-world-cyber-security-video"
      },
  ],
},
6:{
  "title": "Machine Learning",
  "description": "Learn the fundamentals of Machine Learning and how to implement various algorithms to solve real-world problems. Understand supervised and unsupervised learning techniques and gain hands-on experience with Python and popular ML libraries.",
  "price": "₹5000",
  "instructor": "Sanya Verma",
  "content": "This course will introduce you to the concepts of Machine Learning, including both supervised and unsupervised learning algorithms. You will learn to build, train, and evaluate models using Python and libraries like Scikit-learn, TensorFlow, and Keras.",
  "topics": [
      {
          "title": "Step 1: Introduction to Machine Learning",
          "detailedContent": "<p>Understand the basics of Machine Learning, its applications, and the different types of learning (supervised, unsupervised, reinforcement). Learn about the workflow of a typical ML project and the importance of data preprocessing.</p>"
      },
      {
          "title": "Step 2: Python for Machine Learning",
          "detailedContent": "<p>Get familiar with Python and key libraries used in Machine Learning, such as NumPy, Pandas, and Matplotlib. Learn how to work with datasets, perform data manipulation, and visualize data to gain insights.</p>"
      },
      {
          "title": "Step 3: Data Preprocessing",
          "detailedContent": "<p>Learn the essential steps of data preprocessing, including handling missing values, encoding categorical variables, scaling features, and splitting data into training and testing sets. Understand the importance of clean data for building accurate models.</p>"
      },
      {
          "title": "Step 4: Supervised Learning - Regression",
          "detailedContent": "<p>Learn about supervised learning techniques, focusing on regression algorithms like linear regression and polynomial regression. Understand how to build regression models, evaluate their performance, and make predictions.</p>"
      },
      {
          "title": "Step 5: Supervised Learning - Classification",
          "detailedContent": "<p>Explore classification algorithms such as logistic regression, decision trees, random forests, and support vector machines (SVM). Learn how to build classification models, assess their performance, and improve accuracy using techniques like cross-validation.</p>"
      },
      {
          "title": "Step 6: Unsupervised Learning - Clustering",
          "detailedContent": "<p>Understand unsupervised learning techniques, including clustering algorithms like k-means and hierarchical clustering. Learn how to group similar data points and find patterns in unlabeled data.</p>"
      },
      {
          "title": "Step 7: Unsupervised Learning - Dimensionality Reduction",
          "detailedContent": "<p>Learn techniques for reducing the dimensionality of large datasets, including Principal Component Analysis (PCA) and t-SNE. Understand how dimensionality reduction helps to visualize data and improve the efficiency of machine learning models.</p>"
      },
      {
          "title": "Step 8: Model Evaluation and Tuning",
          "detailedContent": "<p>Understand various model evaluation metrics like accuracy, precision, recall, F1-score, and ROC-AUC. Learn how to tune machine learning models using grid search and random search to optimize hyperparameters for better performance.</p>"
      },
      {
          "title": "Step 9: Neural Networks and Deep Learning",
          "detailedContent": "<p>Explore the fundamentals of neural networks, backpropagation, and deep learning. Learn how to build neural networks using Keras and TensorFlow for tasks like image recognition, text classification, and more.</p>"
      },
      {
          "title": "Step 10: Real-World Machine Learning Projects",
          "detailedContent": "<p>Apply the concepts you’ve learned to real-world projects. Work with datasets from different domains (finance, healthcare, e-commerce) to build, train, and deploy machine learning models that solve complex problems.</p>"
      }
  ],
  "videos": [
      {
          "title": "Step 1: Introduction to Machine Learning",
          "url": "https://example.com/ml-introduction-video"
      },
      {
          "title": "Step 2: Python for Machine Learning",
          "url": "https://example.com/python-for-ml-video"
      },
      {
          "title": "Step 3: Data Preprocessing",
          "url": "https://example.com/data-preprocessing-video"
      },
      {
          "title": "Step 4: Supervised Learning - Regression",
          "url": "https://example.com/supervised-regression-video"
      },
      {
          "title": "Step 5: Supervised Learning - Classification",
          "url": "https://example.com/supervised-classification-video"
      },
      {
          "title": "Step 6: Unsupervised Learning - Clustering",
          "url": "https://example.com/unsupervised-clustering-video"
      },
      {
          "title": "Step 7: Unsupervised Learning - Dimensionality Reduction",
          "url": "https://example.com/dimensionality-reduction-video"
      },
      {
          "title": "Step 8: Model Evaluation and Tuning",
          "url": "https://example.com/model-evaluation-video"
      },
      {
          "title": "Step 9: Neural Networks and Deep Learning",
          "url": "https://example.com/neural-networks-video"
      },
      {
          "title": "Step 10: Real-World Machine Learning Projects",
          "url": "https://example.com/ml-projects-video"
      },
  ],
}
  }

      

  const course = courseDetails[id];
  const [isTopicVisible, setTopicVisible] = useState({});
  const [isVideoVisible, setVideoVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  if (!course) {
    return <div>Course not found</div>;
  }

  const toggleTopic = (index) => {
    setTopicVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleVideos = () => {
    setVideoVisible(!isVideoVisible);
  };

  const handleVideoClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalOpen(true);  
  };

  const closeModal = () => {
    setModalOpen(false);  
    setCurrentVideo(null); 
  };

  return (
    <div className="full-course-container">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Price:</strong> {course.price}</p>

      <h2>Course Content</h2>
      <p>{course.content}</p>

      <h3>Topics</h3>
      {course.topics.map((topic, index) => (
        <div key={index} className="topic">
          <div className="topic-header" onClick={() => toggleTopic(index)}>
            <h4>{topic.title}</h4>
            <button className="toggle-button">
              {isTopicVisible[index] ? 'Hide Resources' : 'Click to View Resources'}
            </button>
          </div>
          {isTopicVisible[index] && (
            <div className="topic-content">
              <div dangerouslySetInnerHTML={{ __html: topic.detailedContent }} />
            </div>
          )}
        </div>
      ))}

      <h3>Videos</h3>
      <button className="toggle-button" onClick={toggleVideos}>
        {isVideoVisible ? 'Hide All Videos' : 'Click to See All Videos'}
      </button>
      {isVideoVisible && (
        <div className="video-links">
          <div className="video-grid">
            {course.videos.map((video, index) => (
              <div key={index} className="video-card">
                <button onClick={() => handleVideoClick(video.url)}>
                  <h4>{video.title}</h4>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>X</button>
            <video controls width="100%" height="auto">
              <source src={currentVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullCourse;
