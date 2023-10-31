import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., sending data to a server.
    console.log(formData);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>
          If you have any inquiries or feedback, please don't hesitate to reach
          out to us.
        </p>
        <p>You can contact us through the following methods:</p>
        <ul>
          <li>Email: contact@arnold.aswani@student.moringaschool.com</li>
          <li>Phone: +254 708 581781</li>
        </ul>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Username"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
            />
          </div>
          <div className="form-field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
