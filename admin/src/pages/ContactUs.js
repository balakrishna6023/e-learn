import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://formspree.io/f/mwkwpbow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Message sent successfully!');
        } else {
          alert('Failed to send message. Please try again.');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="contactus-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>

      <section className="contact-info">
        <h2>Our Contact Details</h2>
        <ul>
          <li><strong>Email:</strong> jilanin17@gmail.com.com</li>
          <li><strong>Phone:</strong> +91 6305786375</li>
          <li><strong>Address:</strong> Hitech city, Hyderabad</li>
        </ul>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default ContactUs;
