import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const initialFormData = { username: "", email: "", message: "" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-700">
          We would love to hear from you! Whether you have a question about our
          services, need assistance, or just want to say hello, feel free to
          reach out to us using the form below or through our contact
          information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Contact Information</h2>
          <p className="text-gray-700">
            <strong>Address:</strong> Lorem ipsum, dolor sit amet consectetur.
            <br />
            <strong>Email:</strong> project.tracker@support.com
            <br />
            <strong>Phone:</strong> +254 123 456789
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Send us a Message</h2>
          <form
            className="grid grid-cols-1 gap-4 bg-slate-200 p-5 rounded-md"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                className="w-full border border-gray-300 p-2"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your Username"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full border border-gray-300 p-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@emailaddress.com"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 p-2"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
